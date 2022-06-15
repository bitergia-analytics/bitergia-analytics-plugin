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
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DragDropEditor } from '../components/dragDropEditor';
import { coreServicesMock } from '../../test/mocks';

describe('<DragDropEditor />', () => {
  const value = [{ name: 'Overview', dashboard_id: 'Overview', type: 'entry' }];

  it('Renders the component', async () => {
    await act(async () => {
      const { container } = render(
        <DragDropEditor
          value={value}
          http={coreServicesMock.http}
          renderToast={jest.fn()}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('Removes an item', async () => {
    await act(async () => {
      const { container } = render(
        <DragDropEditor
          value={value}
          http={coreServicesMock.http}
          renderToast={jest.fn()}
        />
      );
    });

    expect(screen.getByText('Overview')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Remove'));

    expect(screen.queryByText('Overview')).not.toBeInTheDocument();
  });

  it('Opens modal to edit an item', async () => {
    await act(async () => {
      const { container } = render(
        <DragDropEditor
          value={value}
          http={coreServicesMock.http}
          renderToast={jest.fn()}
        />
      );
    });

    expect(screen.getByText('Overview')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Edit'));

    expect(screen.getByText('Edit item')).toBeInTheDocument();
  });
});
