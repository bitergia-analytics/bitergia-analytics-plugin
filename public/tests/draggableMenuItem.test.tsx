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
import { EuiDragDropContext, EuiDroppable } from '@elastic/eui';
import { DraggableMenuItem } from '../components/draggableMenuItem';

describe('<DraggableMenuItem />', () => {
  it('Renders the component', () => {
    const { container } = render(
      <EuiDragDropContext>
        <EuiDroppable droppableId="testID">
          <DraggableMenuItem
            name="Overview"
            index={0}
            parentIndex={1}
            removeItem={jest.fn()}
          />
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(container).toMatchSnapshot();
  });

  it('Removes item', () => {
    const spy = jest.fn();

    render(
      <EuiDragDropContext>
        <EuiDroppable droppableId="testID">
          <DraggableMenuItem
            name="Overview"
            index={0}
            parentIndex={1}
            removeItem={spy}
          />
        </EuiDroppable>
      </EuiDragDropContext>
    );

    const button = screen.getByLabelText('Remove Overview');
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith(1, 0);
  });
});
