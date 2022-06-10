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
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { FormModal } from '../components/formModal';
import { coreServicesMock } from '../../test/mocks';

describe('<FormModal />', () => {
  it('Renders the component', async () => {
    // Needs to be wrapped in act() due to asynchronous state update on load
    await act(async () => {
      render(
        <FormModal
          showModal={true}
          item={{ name: 'name' }}
          http={coreServicesMock.http}
        />
      );

      // Wait for state change and component render
      await waitFor(() => {
        expect(document.querySelector('.euiModal')).toBeVisible();
        expect(document.querySelector('.euiModal')).toMatchSnapshot();
      });
    });
  });

  it('Saves data', async () => {
    const saveItem = jest.fn();
    const dashboardID = '12345-abc';

    await act(async () => {
      render(
        <FormModal
          showModal={true}
          item={{ name: 'Test name' }}
          http={coreServicesMock.http}
          saveItem={saveItem}
        />
      );

      await waitFor(() => {
        expect(document.querySelector('.euiModal')).toBeVisible();
      });
    });

    // Fill in dashboard ID field
    const dashboardInput = screen.getByLabelText('Dashboard ID or URL');
    fireEvent.change(dashboardInput, {
      target: { value: [dashboardID] },
    });
    fireEvent.keyDown(dashboardInput, { key: 'Enter' });
    fireEvent.click(screen.getByText('Save'));

    expect(saveItem).toHaveBeenCalledWith({
      dashboard_id: dashboardID,
      name: 'Test name',
      type: 'entry',
    });
  });

  it('Renders errors', async () => {
    const saveItem = jest.fn();
    await act(async () => {
      render(
        <FormModal
          showModal={true}
          http={coreServicesMock.http}
          saveItem={saveItem}
        />
      );

      await waitFor(() => {
        expect(document.querySelector('.euiModal')).toBeVisible();
      });
    });

    fireEvent.click(screen.getByText('Save'));

    expect(saveItem).not.toBeCalled();
    expect(
      screen.getByText('Please address the highlighted errors.')
    ).toBeVisible();
    expect(screen.getByText('Name is required')).toBeVisible();
    expect(screen.getByText('Dashboard ID is required')).toBeVisible();
  });
});
