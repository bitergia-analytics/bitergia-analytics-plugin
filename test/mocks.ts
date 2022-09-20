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

import { coreMock } from '../../../src/core/public/mocks';

const menuMock = {
  menu: [
    {
      name: 'Overview',
      dashboard_id: 'Overview',
      type: 'entry',
    },
    {
      name: 'About',
      type: 'menu',
      dashboards: [
        {
          name: 'About',
          type: 'entry',
          dashboard_id: 'About',
        },
        {
          name: 'Contact',
          type: 'entry',
          dashboard_id: 'http://contact-url.com',
        },
      ],
    },
  ],
};

const initializerContextMock = {
  config: {
    get: jest.fn().mockReturnValue({
      branding: {
        projectName: 'Mock name',
      },
    }),
  },
};

const coreServicesMock = {
  application: {
    getUrlForApp: jest.fn(),
  },
  chrome: {
    navControls: {
      registerCenter: jest.fn(),
    },
    setBreadcrumbs: jest.fn(),
  },
  http: {
    fetch: jest.fn().mockResolvedValue({
      data: menuMock,
    }),
    put: jest.fn().mockResolvedValue({
      hits: [
        {
          _source: {
            dashboard: {
              title: 'Dashboard title',
            },
          },
          _id: '12345',
        },
      ],
    }),
  },
};

const mountParamsMock = coreMock.createAppMountParamters('/');

const historyMock = {
  listen: jest.fn(),
  location: {
    hash: '#/view/About',
  },
};

export {
  menuMock,
  initializerContextMock,
  coreServicesMock,
  mountParamsMock,
  historyMock,
};
