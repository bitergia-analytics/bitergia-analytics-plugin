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
  AppMountParameters,
  CoreSetup,
  CoreStart,
  PluginInitializerContext,
} from '../../../src/core/public';
import {
  AppPluginStartDependencies,
} from './types';
import './components/kibiter_menu/kibiter_menu';
import { init } from './components/kibiter_menu/kibiter_menu';
import { PLUGIN_NAME } from '../common';
import { i18n } from '@osd/i18n';

export class BitergiaAnalyticsPlugin
  implements Plugin<BitergiaAnalyticsPluginSetup, BitergiaAnalyticsPluginStart> {
  // @ts-ignore : initializerContext not used
  constructor(private readonly initializerContext: PluginInitializerContext) {}
  public setup(core: CoreSetup): BitergiaAnalyticsPluginSetup {
    // Get branding from opensearch_dashboards.yml and initialize plugin
    const config = this.initializerContext.config.get();
    init(config);

    // Register an application into the side navigation menu
    core.application.register({
      id: PLUGIN_NAME,
      title: 'Bitergia Analytics',
      updater$: this.appUpdater,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in opensearch_dashboards.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params, config);
      },
    });

    // Return methods that should be available to other plugins
    return {};
  }

  public async start(core: CoreStart): BitergiaAnalyticsPluginStart {
    return {};
  }

  public stop() {}
}
