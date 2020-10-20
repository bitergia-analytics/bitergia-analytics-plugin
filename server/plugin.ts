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
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Logger,
  ILegacyClusterClient,
} from '../../../src/core/server';
import registerRoutes from './routes';

export interface KibiterMenuPluginRequestContext {
  logger: Logger;
  esClient: ILegacyClusterClient;
}
//@ts-ignore
declare module 'kibana/server' {
  interface RequestHandlerContext {
    kibiter_menu_plugin: KibiterMenuPluginRequestContext;
  }
}

export class KibiterMenuPlugin
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    const router = core.http.createRouter();

    // Register server side APIs
    registerRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('kibiter menu plugin starting');

    return {};
  }

  public stop() {}
}
