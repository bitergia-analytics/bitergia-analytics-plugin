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
  EuiDraggable,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiButtonIcon,
  EuiText,
} from '@elastic/eui';

export const DraggableMenuItem = ({ name, index, parentIndex, removeItem }) => {
  return (
    <EuiDraggable
      index={index}
      draggableId={`parent_${parentIndex}_${index}`}
      spacing="s"
      isRemovable={true}
    >
      <EuiPanel
        paddingSize="s"
        grow={false}
        style={{
          border: '0',
          boxShadow: 'none',
          background: 'rgba(110, 169, 264, 0.05)',
        }}
      >
        <EuiFlexGroup justifyContent="spaceBetween" gutterSize="xs">
          <EuiFlexItem>
            <EuiText size="s">{name}</EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="cross"
              aria-label={`Remove ${name}`}
              onClick={() => removeItem(parentIndex, index)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </EuiDraggable>
  );
};
