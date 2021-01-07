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
} from '../../../src/core/public';
import {
  AppPluginStartDependencies,
} from './types';
import './components/kibiter_menu/kibiter_menu';
import { PLUGIN_NAME } from '../common';
import { i18n } from '@kbn/i18n';

export class BitergiaAnalyticsPlugin
{
  public setup(core: CoreSetup) {
    // Register an application into the side navigation menu
    core.application.register({
      id: PLUGIN_NAME,
      title: 'Bitergia Analytics',
      category: {
        id: 'kibana',
        label: i18n.translate('core.ui.kibanaNavList.label', {
          defaultMessage: 'Kibana',
        }),
        euiIconType: 'logoKibana',
        order: 1000,
      },
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(
          coreStart,
          depsStart as AppPluginStartDependencies,
          params
        );
      },
    });

    // Return methods that should be available to other plugins
    return {};
  }

  public start(core: CoreStart) {
    return {};
  }

  public stop() {}
}
