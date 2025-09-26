/*
 * Copyright Bitergia 2021-2022
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
import { BehaviorSubject } from 'rxjs';
import { i18n } from '@osd/i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Menu } from './components/menu';
import { ProjectName } from './components/projectName';
import { LoginButton } from './components/loginButton';
import { PLUGIN_NAME, API_PREFIX } from '../common';
import { AppPluginStartDependencies, AccountInfo } from './types';
import {
  AppMountParameters,
  AppNavLinkStatus,
  AppUpdater,
  CoreSetup,
  CoreStart,
  PluginInitializerContext,
} from '../../../src/core/public';
import { HttpSetup } from '../../../src/core/public';

const APP_LIST_FOR_LIMITED_ROLE = ['discover', 'dashboards', 'visualize'];
const ANONYMOUS_USER = 'opendistro_security_anonymous';

export class BitergiaAnalyticsPlugin {
  accountInfo!: AccountInfo;
  // @ts-ignore : initializerContext not used
  constructor(private readonly initializerContext: PluginInitializerContext) {}
  public async setup(core: CoreSetup) {
    // Register an application into the side navigation menu
    core.application.register({
      id: PLUGIN_NAME,
      title: 'Bitergia Analytics',
      category: {
        id: 'management',
        label: i18n.translate('core.ui.managementNavList.label', {
          defaultMessage: 'Management',
        }),
        order: 5000,
        euiIconType: 'managementApp',
      },
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in opensearch_dashboards.json
        const [coreStart, depsStart, methods] = await core.getStartServices();

        // Render the application
        return renderApp(
          coreStart,
          depsStart as AppPluginStartDependencies,
          methods,
          params
        );
      },
    });

    // Hide links to apps for non-privileged users
    try {
      const accountInfo = await core.http.get('/api/v1/configuration/account');
      const isLimited = accountInfo?.data?.roles.includes(
        'bap_plugins_visibility'
      );
      this.accountInfo = accountInfo.data;

      core.application.registerAppUpdater(
        new BehaviorSubject<AppUpdater>((app) => {
          if (isLimited && !APP_LIST_FOR_LIMITED_ROLE.includes(app.id)) {
            return {
              navLinkStatus: AppNavLinkStatus.hidden,
            };
          }
        })
      );
    } catch (error) {
      this.accountInfo = {};
      console.log(error);
    }

    // Return methods that should be available to other plugins
    return {};
  }

  public async start(core: CoreStart): BitergiaAnalyticsPluginStart {
    // Get branding from opensearch_dashboards.yml
    const {
      branding,
      hideTenantSelector,
    } = this.initializerContext.config.get();
    const baseURL = core.application.getUrlForApp('dashboards');
    const tenant = this.accountInfo.user_requested_tenant;
    const isAnonymous = this.accountInfo.user_name === ANONYMOUS_USER;

    // Add project name to header
    core.chrome.navControls.registerExpandedCenter({
      mount: (target) =>
        this.mountProjectName(branding, tenant, baseURL, target),
      order: 1,
    });

    // Fetch and add menu to header
    try {
      /* eslint no-var: */
      var response = await core.http.fetch(`${API_PREFIX}/menu`);
      const menuItems = JSON.parse(JSON.stringify(response.data.menu));

      if (Array.isArray(menuItems)) {
        core.chrome.navControls.registerExpandedRight({
          order: 2,
          mount: (target) =>
            this.mountMenu(
              menuItems,
              baseURL,
              target,
              core.application.navigateToUrl
            ),
        });
      } else {
        console.error('Error loading menu: invalid menu data');
      }
    } catch (error) {
      console.log(error);
    }

    this.changeBranding(branding);

    // Hide tenant selector in user menu
    if (hideTenantSelector) {
      document.body.classList.add('hide-tenant-selector');
    }

    // Replace anonymous user dropdown with custom button
    if (isAnonymous) {
      document.body.classList.add('hide-anonymous-user');
      core.chrome.navControls.registerRight({
        mount: (target) => this.mountLogin(core.http, target),
      });
    }

    // Hide popup tenant selector for all users
    sessionStorage.setItem('opendistro::security::tenant::show_popup', 'false');

    // Methods available at core.getStartServices()
    return {
      getMenu: () => {
        return response?.data;
      },
    };
  }

  public stop() {}

  private mountMenu(menu, baseURL, targetDomElement, navigateToUrl) {
    // Initialize router history to know which route is active
    const history = createBrowserHistory();

    ReactDOM.render(
      <Menu
        menu={menu}
        baseURL={baseURL}
        history={history}
        navigateToUrl={navigateToUrl}
      />,
      targetDomElement
    );
    return () => ReactDOM.unmountComponentAtNode(targetDomElement);
  }

  private mountProjectName(branding, tenant, baseURL, targetDomElement) {
    ReactDOM.render(
      <ProjectName
        name={branding.projectName}
        tenant={tenant}
        badgeColor={branding.selectedItemColor}
        baseURL={baseURL}
      />,
      targetDomElement
    );
    return () => ReactDOM.unmountComponentAtNode(targetDomElement);
  }

  private changeBranding(branding) {
    if (Object.keys(branding).length !== 0) {
      document.body.style.setProperty(
        '--background-color',
        branding.backgroundColor
      );
      document.body.style.setProperty('--text-color', branding.textColor);
      document.body.style.setProperty(
        '--menu-item-color',
        branding.menuItemColor
      );
      document.body.style.setProperty(
        '--menu-item-color--hover',
        branding.menuItemHoverColor
      );
      document.body.style.setProperty('--link-color', branding.linkColor);
      document.body.style.setProperty(
        '--selected-item-color',
        branding.selectedItemColor
      );
      document.body.style.setProperty(
        '--dropdown-color',
        branding.dropdownColor
      );
    }
  }

  private mountLogin(httpClient: HttpSetup, targetDomElement: HTMLElement) {
    const basePath = httpClient.basePath.serverBasePath
      ? httpClient.basePath.serverBasePath
      : '/';
    const nextUrl = encodeURIComponent(basePath);
    const loginURL = `${httpClient.basePath.serverBasePath}/app/login?nextUrl=${nextUrl}`;

    ReactDOM.render(<LoginButton url={loginURL} />, targetDomElement);
    return () => ReactDOM.unmountComponentAtNode(targetDomElement);
  }
}
