/*
 * Copyright 2021-2022 Bitergia
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

import '@testing-library/jest-dom';
import { BitergiaAnalyticsPlugin } from '../plugin';
import { renderApp } from '../application';
import {
  metadashboardMock,
  initializerContextMock,
  coreServicesMock,
  mountParamsMock,
} from '../../test/mocks';

describe('Plugin setup', () => {
  const apiURL = '/api/dashboards/getmetadashboard';
  const plugin = new BitergiaAnalyticsPlugin(initializerContextMock);

  it('Registers menu', async () => {
    const core = await plugin.start(coreServicesMock);

    expect(coreServicesMock.http.fetch).toHaveBeenCalledWith(apiURL);
    expect(core.getMetadashboard()).toEqual(metadashboardMock);

    // Two calls to register project name and menu
    expect(
      coreServicesMock.chrome.navControls.registerCenter
    ).toHaveBeenCalledTimes(2);
  });

  it('Does not register menu if metadashboard data is invalid', async () => {
    // Spy console logs
    console.error = jest.fn();

    // Return invalid value
    coreServicesMock.http.fetch = jest.fn().mockReturnValue({
      data: { metadashboard: null },
    });

    const core = await plugin.start(coreServicesMock);
    expect(coreServicesMock.http.fetch).toHaveBeenCalledWith(apiURL);

    // Only registers project name
    expect(
      coreServicesMock.chrome.navControls.registerCenter
    ).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      'Error loading menu: invalid metadashboard data'
    );
    expect(core.getMetadashboard()).toEqual({ metadashboard: null });
  });

  it('Mounts and unmounts app', async () => {
    const core = await plugin.start(coreServicesMock);

    const unmount = renderApp(coreServicesMock, {}, core, mountParamsMock, {});
    expect(mountParamsMock.element.querySelector('.euiPage')).toBeTruthy();

    unmount();
    expect(mountParamsMock.element).toBeEmptyDOMElement();
  });
});
