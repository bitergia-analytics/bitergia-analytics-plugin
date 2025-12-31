import { opensearchDashboardsServerTestUser } from '@osd/test';
import { services } from '../../../test/api_integration/services';

export default async function ({ readConfigFile }) {
  const functionalConfig = await readConfigFile(require.resolve('../../../test/functional/config'));

  return {
    testFiles: [require.resolve('./api/menu.js')],
    services,
    servers: functionalConfig.get('servers'),
    junit: {
      enabled: false
    },
    opensearchTestCluster: functionalConfig.get('opensearchTestCluster'),
    osdTestServer: {
      ...functionalConfig.get('osdTestServer'),
      serverArgs: [
        ...functionalConfig.get('osdTestServer.serverArgs'),
        '--opensearch.healthCheck.delay=3600000',
        '--server.xsrf.disableProtection=true',
        '--server.compression.referrerWhitelist=["some-host.com"]',
      ],
    },
  };
};
