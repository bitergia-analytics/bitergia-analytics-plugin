/*
 * Copyright 2021-2024 Bitergia
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import path from 'path';
import FormData from 'form-data';
import StreamZip from 'node-stream-zip';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { schema } from '@osd/config-schema';
import { ImportResponse } from 'server/types';
import { IBasePath, IRouter, ILegacyScopedClusterClient } from '../../../../../src/core/server';
import { getRolesMapping } from './roles_mapping';

export function registerTenantRoutes(
  router: IRouter,
  basePath: IBasePath
) {
  router.post(
    {
      path: '/api/_bap/tenant/{tenant}',
      validate: {
        params: schema.object({
          tenant: schema.string()
        }),
        body: schema.object({
          anonymous: schema.maybe(schema.boolean()),
          force: schema.maybe(schema.boolean()),
        }),
      },
    },
    async (context, request, response) => {
      const { tenant } = request.params;
      const { anonymous, force } = request.body;
      const config = {
        headers: {
          authorization: request.headers.authorization,
          'osd-xsrf': 'osd-fetch',
        },
        adapter: require('axios/lib/adapters/http'),
      };
      const baseURL = request.url.origin + basePath.get(request);

      try {
        const tenantResponse = await createTenant(
          baseURL,
          config,
          tenant,
          force
        );
        const rolesResponse = await createRoles(
          baseURL,
          config,
          tenant,
          anonymous,
          force
        );
        const dashboardsResponse = await createDashboards(
          baseURL,
          config,
          tenant
        );
        const roles = await getRoles(baseURL, config, tenant);
        const backendRolesResponse = await mapRoles(
          baseURL,
          config,
          roles,
          tenant
        );

        return response.ok({
          body: {
            data: {
              tenant: tenantResponse,
              roles: {
                response: rolesResponse?.responses,
              },
              backendRoles: {
                count: backendRolesResponse?.length || 0,
                response: backendRolesResponse,
              },
              dashboards: dashboardsResponse,
            },
          },
        });
      } catch (error: any) {
        return response.customError({
          body: { message: error },
          statusCode: 400
        });
      }
    }
  );
}

async function createRoles(
  baseURL: string,
  config: AxiosRequestConfig,
  tenant: string,
  anonymous?: boolean,
  force?: boolean
) {
  const ROLES_MAPPING = getRolesMapping(tenant);
  const createdRoles = [];
  const responses = [];

  for (const role in ROLES_MAPPING) {
    if (!anonymous && role === `bap_${tenant}_anonymous_access_role`) {
      continue;
    }

    const API_URL = `${baseURL}/api/v1/configuration/roles/${role}`;
    const roleExists = await exists(API_URL, config);

    if (!force && roleExists) {
      for (const createdRole of createdRoles) {
        await deleteRole(baseURL, config, createdRole);
      }
      await deleteTenant(baseURL, config, tenant);
      throw new Error(`The role '${role}' already exists.`);
    }

    const data = ROLES_MAPPING[role];
    const response = await axios.post(API_URL, data, config);

    responses.push(response.data?.message);
    createdRoles.push(role);
  }
  return { responses };
}

async function createTenant(
  baseURL: string,
  config: AxiosRequestConfig,
  tenant: string,
  force?: boolean
) {
  const API_URL = `${baseURL}/api/v1/configuration/tenants/${tenant}`;
  const tenantExists = await exists(API_URL, config);

  if (!force && tenantExists) {
    throw new Error(`The tenant '${tenant}' already exists.`);
  }

  try {
    const response = await axios.post(API_URL, { description: '' }, config);
    return response.data?.message;
  } catch (error) {
    return error;
  }
}

async function createDashboards(
  baseURL: string,
  config: AxiosRequestConfig,
  tenant: string
) {
  const API_URL = `${baseURL}/api/saved_objects/_import?overwrite=true`;
  const responses: ImportResponse = {};
  const zip = new StreamZip.async({
    file: path.join(__dirname, 'default_dashboards.zip'),
  });
  const files = await zip.entries();

  for (const file of Object.values(files)) {
    const data = (await zip.entryData(file)).toString();
    const updatedFile = data.replaceAll('bitergia', tenant);
    const form = new FormData();

    form.append('file', updatedFile, 'saved_objects.ndjson');
    config = {
      headers: {
        securitytenant: tenant,
        authorization: config.headers?.authorization,
        'osd-xsrf': 'osd-fetch',
      },
      adapter: require('axios/lib/adapters/http'),
      ...form.getHeaders(),
    };

    const response = await axios.post(API_URL, form, config);

    responses[file.name] = {
      success: response.data.success,
      count: response.data.successCount,
    };
  }

  await zip.close();

  return responses;
}

async function getRoles(
  baseURL: string,
  config: AxiosRequestConfig,
  tenant: string
): Promise<string[] | any> {
  const roles = [];
  const API_URL = `${baseURL}/api/v1/configuration/roles?dataSourceId=`;

  try {
    const response = await axios.get(API_URL, config);
    for (const role in response.data.data) {
      if (role.includes('plugins_visibility') || role.includes(tenant)) {
        roles.push(role);
      }
    }
  } catch (error) {
    return error;
  }

  return roles;
}

async function mapRoles(
  baseURL: string,
  config: AxiosRequestConfig,
  roles: string[],
  tenant: string
) {
  const responses = [];

  for (const role of roles) {
    let user;
    if (role.includes('privileged')) {
      user = `${tenant}_privileged`;
    } else if (role.includes('user')) {
      user = `${tenant}_user`;
    } else if (role.includes('anonymous')) {
      user = 'opendistro_security_anonymous_backendrole';
    } else if (role.includes('pseudonymize')) {
      user = `${tenant}_pseudonymize`;
    } else {
      continue;
    }

    const response = await mapUser(baseURL, config, role, user);

    if (response?.data?.message) {
      responses.push(response?.data?.message);
    }
  }
  return responses;
}

async function mapUser(
  baseURL: string,
  config: AxiosRequestConfig,
  role: string,
  user: string
): Promise<AxiosResponse | any> {
  const API_URL = `${baseURL}/api/v1/configuration/rolesmapping/${role}`;
  const data = {
    backend_roles: [user],
  };

  const mappingExists = await exists(API_URL, config);
  if (!mappingExists) {
    try {
      const response = await axios.post(API_URL, data, config);
      return response;
    } catch (error) {
      return error;
    }
  }
}

async function exists(
  url: string,
  config: AxiosRequestConfig
): Promise<boolean> {
  try {
    const response = await axios.get(url, config);

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function deleteTenant(
  baseURL: string,
  config: AxiosRequestConfig,
  tenant: string
) {
  const API_URL = `${baseURL}/api/v1/configuration/tenants/${tenant}`;

  try {
    const response = await axios.delete(API_URL, config);
    return response.data?.message;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function deleteRole(
  baseURL: string,
  config: AxiosRequestConfig,
  role: string
) {
  const API_URL = `${baseURL}/api/v1/configuration/roles/${role}`;

  try {
    const response = await axios.delete(API_URL, config);
    return response.data?.message;
  } catch (error) {
    return error;
  }
}
