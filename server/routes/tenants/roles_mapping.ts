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

import { RoleMapping } from 'server/types';

export const getRolesMapping = (tenant: string): RoleMapping => {
  return {
    [`bap_${tenant}_anonymous_access_role`]: {
      cluster_permissions: ['cluster_composite_ops_ro'],
      index_permissions: [
        {
          index_patterns: [
            `grimoirelab_${tenant}_*`,
            `bap_${tenant}_*`,
            `custom_${tenant}_*`,
            `c_${tenant}_*`,
          ],
          allowed_actions: ['read'],
        },
        {
          index_patterns: [
            '.kibana',
            `.kibana_*_${tenant}_*`,
            '.opensearch_dashboards',
            `.opensearch_dashboards_*_${tenant}_*`,
          ],
          allowed_actions: ['read'],
        },
      ],
      tenant_permissions: [
        {
          tenant_patterns: [`${tenant}`],
          allowed_actions: ['kibana_all_read'],
        },
      ],
    },
    [`bap_${tenant}_privileged_user_role`]: {
      cluster_permissions: ['cluster_composite_ops'],
      index_permissions: [
        {
          index_patterns: [
            `grimoirelab_${tenant}_*`,
            `bap_${tenant}_*`,
            `custom_${tenant}_*`,
            `c_${tenant}_*`,
          ],
          allowed_actions: ['read'],
        },
        {
          index_patterns: [
            '.kibana',
            `.kibana_*_${tenant}_*`,
            '.opensearch_dashboards',
            `.opensearch_dashboards_*_${tenant}_*`,
          ],
          allowed_actions: ['read', 'delete', 'manage', 'index'],
        },
        {
          index_patterns: [
            '.tasks',
            '.management-beats',
            '*:.tasks',
            '*:.management-beats',
          ],
          allowed_actions: ['indices_all'],
        },
      ],
      tenant_permissions: [
        {
          tenant_patterns: [`${tenant}`],
          allowed_actions: ['kibana_all_write'],
        },
      ],
    },
    [`bap_${tenant}_pseudonymize_role`]: {
      cluster_permissions: ['cluster_composite_ops_ro'],
      index_permissions: [
        {
          index_patterns: [
            `grimoirelab_${tenant}_*`,
            `bap_${tenant}_*`,
            `custom_${tenant}_*`,
            `c_${tenant}_*`,
          ],
          allowed_actions: ['read'],
          dls: '',
          fls: [],
          masked_fields: [
            'committer',
            'owner',
            '*data_name',
            '*multi_names',
            '*ommitter_name',
            '*ommit_name',
            '*ssignee_name',
            '*user_name',
            '*uthor_name',
            '*username',
            '*_login',
          ],
        },
        {
          index_patterns: [
            '.kibana',
            `.kibana_*_${tenant}_*`,
            '.opensearch_dashboards',
            `.opensearch_dashboards_*_${tenant}_*`,
          ],
          allowed_actions: ['read'],
        },
      ],
      tenant_permissions: [
        {
          tenant_patterns: [`${tenant}`],
          allowed_actions: ['kibana_all_read'],
        },
      ],
    },
    [`bap_${tenant}_user_role`]: {
      cluster_permissions: ['cluster_composite_ops_ro'],
      index_permissions: [
        {
          index_patterns: [
            `grimoirelab_${tenant}_*`,
            `bap_${tenant}_*`,
            `custom_${tenant}_*`,
            `c_${tenant}_*`,
          ],
          allowed_actions: ['read'],
        },
        {
          index_patterns: [
            '.kibana',
            `.kibana_*_${tenant}_*`,
            '.opensearch_dashboards',
            `.opensearch_dashboards_*_${tenant}_*`,
          ],
          allowed_actions: ['read'],
        },
      ],
      tenant_permissions: [
        {
          tenant_patterns: [`${tenant}`],
          allowed_actions: ['kibana_all_read'],
        },
      ],
    },
    [`bap_${tenant}_mordred_role`]: {
      cluster_permissions: [
        'cluster_composite_ops_ro',
        'cluster_monitor',
        'indices:data/read/scroll/clear',
        'indices:data/write/bulk',
      ],
      index_permissions: [
        {
          index_patterns: [
            `grimoirelab_${tenant}_*`,
            `bap_${tenant}_*`,
            `custom_${tenant}_*`,
            `c_${tenant}_*`,
          ],
          allowed_actions: ['indices_all'],
        },
        {
          index_patterns: ['*'],
          allowed_actions: ['manage_aliases'],
        },
      ],
    },
  };
};
