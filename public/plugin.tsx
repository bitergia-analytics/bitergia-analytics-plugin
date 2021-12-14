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
import { PLUGIN_NAME } from '../common';
import { i18n } from '@osd/i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import Menu from './components/menu.tsx';
import { EuiHeaderLink } from '@elastic/eui';

export class BitergiaAnalyticsPlugin
  implements Plugin<BitergiaAnalyticsPluginSetup, BitergiaAnalyticsPluginStart> {
  // @ts-ignore : initializerContext not used
  constructor(private readonly initializerContext: PluginInitializerContext) {}
  public setup(core: CoreSetup): BitergiaAnalyticsPluginSetup {
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
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    // Return methods that should be available to other plugins
    return {};
  }

  public async start(core: CoreStart): BitergiaAnalyticsPluginStart {
    // Get branding from opensearch_dashboards.yml
    const { branding } = this.initializerContext.config.get();

    // Add project name to header
    core.chrome.navControls.registerCenter({
      mount: (target) => this.mountProjectName(branding.projectName, target)
    })

    // Fetch and add metadashboard to header
    try {
      const response = await core.http.fetch('/api/dashboards/get_metadashboard');
      const metadashboard = response.data.metadashboard;
      core.chrome.navControls.registerRight({
        order: 0,
        mount: (target) => this.mountMenu(metadashboard, target),
      });
    } catch (error) {
      console.log(error);
    }

    this.changeBranding(branding);

    return {};
  }

  public stop() {}

  private mountMenu(metadashboard, targetDomElement) {
    // Initialize router history to know which route is active
    const history = createBrowserHistory();

    ReactDOM.render(
      <Menu metadashboard={metadashboard} history={history} />,
      targetDomElement
    );
    return () => ReactDOM.unmountComponentAtNode(targetDomElement);
  }

  private mountProjectName(name, targetDomElement) {
    ReactDOM.render(
      <EuiHeaderLink
        href="dashboards#/view/Overview"
        color="ghost"
        className="project-link"
      >
        { name }
      </EuiHeaderLink>,
      targetDomElement
    );
    return () => ReactDOM.unmountComponentAtNode(targetDomElement);
  }

  private changeBranding(branding) {
    if (Object.keys(branding).length !== 0) {
      document.body.style.setProperty("--background-color", branding.backgroundColor);
      document.body.style.setProperty("--text-color", branding.textColor);
      document.body.style.setProperty("--menu-item-color", branding.menuItemColor);
      document.body.style.setProperty("--link-color", branding.linkColor);
      document.body.style.setProperty("--selected-item-color", branding.selectedItemColor);
      document.body.style.setProperty("--dropdown-color", branding.dropdownColor);
    }
  }
}
