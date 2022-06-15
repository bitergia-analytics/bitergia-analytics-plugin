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
import { Link } from '../components/link';

describe('<Link />', () => {
  const baseURL = '/app/dashboards';
  const item = {
    name: 'Link name',
    dashboard_id: '12345-abc',
  };

  it('Renders the component', () => {
    const { container } = render(<Link baseURL={baseURL} item={item} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('Builds the URL from dashboard ID', () => {
    const { container } = render(<Link baseURL={baseURL} item={item} />);
    const element = screen.getByText('Link name').closest('a');

    expect(element).toHaveAttribute('href', '/app/dashboards#/view/12345-abc');
  });

  it('Leaves the URL if it is not a dashboard ID', () => {
    const { container } = render(
      <Link
        baseURL={baseURL}
        item={{
          name: 'Link name',
          dashboard_id: 'http://link.com',
        }}
      />
    );
    const element = screen.getByText('Link name').closest('a');

    expect(element).toHaveAttribute('href', 'http://link.com');
  });
});
