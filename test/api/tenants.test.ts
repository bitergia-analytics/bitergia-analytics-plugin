import * as osdTestServer from '../../../../src/core/test_helpers/osd_server';
import { Root } from '../../../../src/core/server/root';
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';

jest.setTimeout(110000);

describe('Tenant API', () => {
  const credentials = `Basic ${Buffer.from(
    `admin:${process.env.OPENSEARCH_INITIAL_ADMIN_PASSWORD}`
  ).toString('base64')}`;
  let root: Root;

  beforeAll(async () => {
    root = osdTestServer.createRootWithSettings(
      {
        opensearch: {
          hosts: ['https://localhost:9200'],
          ignoreVersionMismatch: true,
          ssl: { verificationMode: 'none' },
          username: 'kibanaserver',
          password: 'kibanaserver',
        },
        opensearch_security: {
          multitenancy: {
            enabled: true,
            tenants: {
              preferred: ['Private', 'Global'],
            },
          },
        },
      },
      { dev: true }
    );

    console.log('Starting OpenSearchDashboards server');
    await root.setup();
    await root.start();
    console.log('Started OpenSearchDashboards server');
  });

  afterEach(async () => {
    const roles = [
      'bap_new_tenant_name_privileged_user_role',
      'bap_new_tenant_name_pseudonymize_role',
      'bap_new_tenant_name_user_role',
      'bap_new_tenant_name_mordred_role',
      'bap_new_tenant_name_anonymous_access_role',
    ];

    for (const role of roles) {
      await osdTestServer.request
        .delete(root, `/api/v1/configuration/roles/${role}`)
        .set('Authorization', credentials);

      await osdTestServer.request
        .delete(root, `/api/v1/configuration/rolesmapping/${role}`)
        .set('Authorization', credentials);
    }

    await osdTestServer.request
      .delete(root, `/api/v1/configuration/tenants/new_tenant_name`)
      .set('Authorization', credentials);
  });

  afterAll(async () => {
    await root.shutdown();
  });

  it('Fails if no tenant is given', async () => {
    const response = await osdTestServer.request
      .post(root, '/api/_bap/tenant/')
      .set('Authorization', credentials);

    expect(response.status).toEqual(404);
  });

  it('Fails if the user is unauthorized', async () => {
    const response = await osdTestServer.request
      .post(root, '/api/_bap/tenant/new_tenant_name')
      .send({});

    expect(response.status).toEqual(401);
  });

  it('Creates tenant, roles and dashboards', async () => {
    const response = await osdTestServer.request
      .post(root, '/api/_bap/tenant/new_tenant_name')
      .set('Authorization', credentials)
      .send({});

    expect(response.status).toEqual(200);

    expect(response.body.data).toMatchObject({
      tenant: "'new_tenant_name' created.",
      roles: {
        response: [
          "'bap_new_tenant_name_privileged_user_role' created.",
          "'bap_new_tenant_name_pseudonymize_role' created.",
          "'bap_new_tenant_name_user_role' created.",
          "'bap_new_tenant_name_mordred_role' created.",
        ],
      },
      backendRoles: {
        response: [
          "'bap_new_tenant_name_user_role' created.",
          "'bap_new_tenant_name_pseudonymize_role' created.",
          "'bap_new_tenant_name_privileged_user_role' created.",
        ],
      },
      dashboards: expect.anything(),
    });

    const roles = response.body.data.roles.response;
    expect(roles).not.toContain(
      "'bap_new_tenant_name_anonymous_access_role' created"
    );
  });

  it('Creates anonymous role', async () => {
    const response = await osdTestServer.request
      .post(root, '/api/_bap/tenant/new_tenant_name')
      .set('Authorization', credentials)
      .send({ anonymous: true });

    expect(response.status).toEqual(200);

    expect(response.body.data).toMatchObject({
      tenant: "'new_tenant_name' created.",
      roles: {
        response: [
          "'bap_new_tenant_name_anonymous_access_role' created.",
          "'bap_new_tenant_name_privileged_user_role' created.",
          "'bap_new_tenant_name_pseudonymize_role' created.",
          "'bap_new_tenant_name_user_role' created.",
          "'bap_new_tenant_name_mordred_role' created.",
        ],
      },
      backendRoles: {
        response: [
          "'bap_new_tenant_name_user_role' created.",
          "'bap_new_tenant_name_pseudonymize_role' created.",
          "'bap_new_tenant_name_anonymous_access_role' created.",
          "'bap_new_tenant_name_privileged_user_role' created.",
        ],
      },
      dashboards: expect.anything(),
    });
  });

  it('Fails if tenant already exists', async () => {
    const seed = await osdTestServer.request
      .post(root, '/api/v1/configuration/tenants/new_tenant_name')
      .set('Authorization', credentials)
      .send({'description': ''})

    expect(seed.status).toEqual(200);

    const response = await osdTestServer.request
      .post(root, '/api/_bap/tenant/new_tenant_name')
      .set('Authorization', credentials)
      .send({ force: false });

    expect(response.status).toEqual(400);
  });

  it('Fails if role already exists', async () => {
    const seed = await osdTestServer.request
      .post(root, '/api/v1/configuration/roles/bap_new_tenant_name_user_role')
      .set('Authorization', credentials)
      .send({
        cluster_permissions: [],
        index_permissions: [],
        tenant_permissions: [],
      });

    expect(seed.status).toEqual(200);

    const response = await osdTestServer.request
      .post(root, '/api/_bap/tenant/new_tenant_name')
      .set('Authorization', credentials)
      .send({ force: false });

    expect(response.status).toEqual(400);

    const tenantResponse = await osdTestServer.request
      .get(root, '/api/v1/configuration/tenants/new_tenant_name')
      .set('Authorization', credentials);

    expect(tenantResponse.status).toEqual(404);

    const rolesResponse = await osdTestServer.request
      .get(root, '/api/v1/configuration/roles')
      .set('Authorization', credentials);

    const roles = Object.keys(rolesResponse.body.data);

    expect(roles).not.toContain('bap_new_tenant_name_anonymous_access_role');
    expect(roles).not.toContain('bap_new_tenant_name_privileged_user_role');
  });

  it('Overwrites roles and tenant', async () => {
    const seed = await osdTestServer.request
      .post(root, '/api/_bap/tenant/new_tenant_name')
      .set('Authorization', credentials)
      .send({});

    expect(seed.status).toEqual(200);

    const response = await osdTestServer.request
      .post(root, '/api/_bap/tenant/new_tenant_name')
      .set('Authorization', credentials)
      .send({ force: true });

    expect(response.status).toEqual(200);

    expect(response.body.data).toMatchObject({
      tenant: "'new_tenant_name' updated.",
      roles: {
        response: [
          "'bap_new_tenant_name_privileged_user_role' updated.",
          "'bap_new_tenant_name_pseudonymize_role' updated.",
          "'bap_new_tenant_name_user_role' updated.",
          "'bap_new_tenant_name_mordred_role' updated.",
        ],
      },
      dashboards: expect.anything(),
    });
  });
});
