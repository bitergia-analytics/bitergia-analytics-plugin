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
  OpenSearchDashboardsResponse,
  ResponseError,
} from '../../../../src/core/server';
import { API_PREFIX } from '../../common';

export const registerSearchRoutes = function (router: IRouter) {
  router.put(
    {
      path: `${API_PREFIX}/search/dashboards`,
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
        const requestClient = context.core.opensearch.client.asCurrentUser;
        const result = await requestClient.search({
          index: '.kibana',
          size: 100,
          body: {
            _source: ['dashboard.title'],
            query: {
              bool: {
                must: [
                  {
                    term: {
                      type: 'dashboard',
                    },
                  },
                ],
              },
            },
          },
        });

        return response.ok({
          body: result.body?.hits,
        });
      } catch (error) {
        return response.customError({
          body: error,
          statusCode: error.statusCode,
        });
      }
    }
  );
};
