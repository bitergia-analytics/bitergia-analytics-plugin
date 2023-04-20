/*
 * Copyright 2021-2022 Bitergia
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { schema } from '@osd/config-schema';
import {
  IRouter,
  IOpenSearchDashboardsResponse,
  ResponseError,
} from '../../../../src/core/server';
import { API_PREFIX } from '../../common';

const menuSchema = schema.object({
  menu: schema.arrayOf(
    schema.object({
      name: schema.string(),
      type: schema.oneOf([schema.literal('menu'), schema.literal('entry')]),
      dashboard_id: schema.conditional(
        schema.siblingRef('type'),
        'entry',
        schema.string(),
        schema.never()
      ),
      description: schema.maybe(schema.string()),
      title: schema.maybe(schema.string()),
      dashboards: schema.maybe(
        schema.arrayOf(
          schema.object({
            name: schema.string(),
            type: schema.string(),
            dashboard_id: schema.string(),
            description: schema.maybe(schema.string()),
            title: schema.maybe(schema.string()),
          })
        )
      ),
    })
  ),
});

const customErrorMessage = (error: any) => {
  const errors = [
    {
      error: /\[(.*?)\.(\w*)]: expected at least one defined value but got \[undefined\]/,
      message: `[$1] missing field "$2"`,
    },
    {
      error: /\[(.*?)\.(\w*)]: expected value of type \[\w*\] but got \[undefined\]/,
      message: `[$1] missing field "$2"`,
    },
    {
      error: /\[(.*?)\.(\w*)]: definition for this key is missing/,
      message: `wrong key "$2" at [$1]`,
    },
  ];

  let newError = error.message;

  errors.forEach((e) => {
    newError = newError.replace(e.error, e.message);
  });

  return newError;
};

export const registerMenuRoutes = function (router: IRouter) {
  router.get(
    {
      path: `${API_PREFIX}/menu`,
      validate: {},
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      try {
        const requestClient = context.core.opensearch.client.asCurrentUser;
        const responseOS = await requestClient.get({
          id: 'menu',
          index: '.kibana',
        });
        const menu = responseOS.body._source;

        return response.ok({
          body: {
            data: menu,
          },
        });
      } catch (error: any) {
        let responseError;
        if (error.response) {
          try {
            const esErrorResponse = JSON.parse(error.response);
            responseError = esErrorResponse.reason || error.response;
          } catch (parsingError) {
            responseError = error.response;
          }
        }
        return response.customError({
          statusCode: error.statusCode,
          body: responseError,
        });
      }
    }
  );

  router.put(
    {
      authRequired: true,
      path: `${API_PREFIX}/menu`,
      validate: {
        body: schema.any(),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      try {
        menuSchema.validate(request.body);
      } catch (error) {
        return response.badRequest({
          body: customErrorMessage(error),
        });
      }
      const requestClient = context.core.opensearch.client.asCurrentUser;
      try {
        await requestClient.indices.putMapping({
          index: '.kibana',
          body: {
            dynamic: true,
          },
        });

        const result = await requestClient.index({
          index: '.kibana',
          id: 'menu',
          body: request.body,
        });

        return response.ok({ body: result });
      } catch (error: any) {
        return response.customError({
          body: error,
          statusCode: error.statusCode,
        });
      }
    }
  );
};
