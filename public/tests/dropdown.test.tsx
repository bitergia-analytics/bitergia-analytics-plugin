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
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../components/dropdown';

describe('<Dropdown />', () => {
  const baseURL = '/app/dashboards';
  const item = {
    name: 'Menu name',
    dashboards: [
      { name: 'Link 1', dashboard_id: '123456' },
      { name: 'Link 2', dashboard_id: 'abcdef' },
    ],
  };

  it('Renders the component', () => {
    const { container } = render(<Dropdown baseURL={baseURL} item={item} />);
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(screen.getByText('Menu name'));
    expect(document.body).toMatchSnapshot();
  });
});
