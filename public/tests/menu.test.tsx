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

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { historyMock, metadashboardMock } from '../../test/mocks';
import { Menu } from '../components/menu';
import { EuiHeaderSectionItem } from '@elastic/eui';

describe('<Menu />', () => {
  it('Renders the component', () => {
    const { container } = render(
      <EuiHeaderSectionItem>
        <Menu
          metadashboard={metadashboardMock.metadashboard}
          history={historyMock}
        />
      </EuiHeaderSectionItem>
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('Sets the current URL as active', () => {
    const { container } = render(
      <EuiHeaderSectionItem>
        <Menu
          metadashboard={metadashboardMock.metadashboard}
          history={historyMock}
        />
      </EuiHeaderSectionItem>
    );
    const activeLink = container.querySelector('.euiHeaderLink-isActive');

    expect(activeLink).toBeInTheDocument();
    expect(activeLink).toContainElement(screen.getByText('About'));
  });
});
