/*
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

import {
  IRouter,
  OpenSearchDashboardsResponse,
  ResponseError
} from '../../../../src/core/server';
import { API_PREFIX } from '../../common';

export default function (router: IRouter) {
  //get metadashboard
  router.get(
    {
      path: `${API_PREFIX}/getmetadashboard`,
      validate: {}
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      try {
        const esResp = await context.core.opensearch.legacy.client.callAsCurrentUser(
          'get',
          {
            index: ".kibana",
            id: "metadashboard",
          }
        );
        const responseES = esResp._source;
        return response.ok({
          body: {
            data: responseES
          }
        })

      } catch (error) {
        let responseError
        if (error.response) {
          try {
            const esErrorResponse = JSON.parse(error.response);
            responseError = esErrorResponse.reason || error.response;
          } catch (parsingError) {
            responseError = error.response;
          }
        }
        return response.custom({
          statusCode: error.statusCode,
          body: responseError,
        })
      }
    }
  );
}
