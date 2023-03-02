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
  menuMock,
  initializerContextMock,
  coreServicesMock,
  mountParamsMock,
} from '../../test/mocks';
import { API_PREFIX } from '../../common';

describe('Plugin setup', () => {
  const apiURL = `${API_PREFIX}/menu`;
  const plugin = new BitergiaAnalyticsPlugin(initializerContextMock);

  it('Registers menu', async () => {
    const core = await plugin.start(coreServicesMock);

    expect(coreServicesMock.http.fetch).toHaveBeenCalledWith(apiURL);
    expect(core.getMenu()).toEqual(menuMock);

    // Registers project name
    expect(
      coreServicesMock.chrome.navControls.registerExpandedCenter
    ).toHaveBeenCalledTimes(1);
    // Registers menu
    expect(
      coreServicesMock.chrome.navControls.registerExpandedRight
    ).toHaveBeenCalledTimes(1);
  });

  it('Does not register menu if data is invalid', async () => {
    // Spy console logs
    console.error = jest.fn();

    // Return invalid value
    coreServicesMock.http.fetch = jest.fn().mockReturnValue({
      data: { menu: null },
    });

    const core = await plugin.start(coreServicesMock);
    
    expect(coreServicesMock.http.fetch).toHaveBeenCalledWith(apiURL);
    expect(
      coreServicesMock.chrome.navControls.registerExpandedRight
    ).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledWith(
      'Error loading menu: invalid menu data'
    );
    expect(core.getMenu()).toEqual({ menu: null });
  });

  it('Mounts and unmounts app', async () => {
    const core = await plugin.start(coreServicesMock);

    const unmount = renderApp(coreServicesMock, {}, core, mountParamsMock, {});
    expect(mountParamsMock.element.querySelector('.euiPage')).toBeTruthy();

    unmount();
    expect(mountParamsMock.element).toBeEmptyDOMElement();
  });
});
