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

import React, { useState, useEffect } from 'react';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiButtonIcon,
  EuiIcon,
  EuiText,
  EuiButton,
  EuiSpacer,
} from '@elastic/eui';
import { FormModal } from './formModal';
import { DraggableMenuItem } from './draggableMenuItem';
import { API_PREFIX } from '../../common';

export const DragDropEditor = ({ value, http, renderToast }) => {
  const [menu, setMenu] = useState(value || []);
  const [showModal, setShowModal] = useState(false);
  const [editableItem, setEditableItem] = useState();

  const openModal = (item, index = menu.length + 1) => {
    setShowModal(true);
    setEditableItem({ ...item, index });
  };

  const saveItem = (item) => {
    const copy = [...menu];
    copy.splice(editableItem.index, 1, item);
    setMenu(copy);
  };

  const removeItem = (parentIndex, index) => {
    const copy = [...menu];
    if (index !== undefined) {
      copy[parentIndex].dashboards.splice(index, 1);
    } else {
      copy.splice(parentIndex, 1);
    }
    setMenu(copy);
  };

  const onSave = async () => {
    try {
      const body = JSON.stringify({ menu });
      const response = await http.put(`${API_PREFIX}/menu`, {
        body,
      });
      renderToast();
    } catch (error) {
      const message = error.body?.message || error.toString();
      renderToast(error);
    }
  };

  const onDragEnd = ({ source, destination }) => {
    const copy = [...menu];
    if (source && destination) {
      if (source.droppableId === 'parent') {
        const item = copy.splice(source.index, 1);
        copy.splice(destination.index, 0, item[0]);
      } else {
        const item = copy[source.droppableId].dashboards.splice(
          source.index,
          1
        );
        copy[destination.droppableId].dashboards.splice(
          destination.index,
          0,
          item[0]
        );
      }
      setMenu(copy);
    }
  };

  return (
    <>
      <FormModal
        saveItem={saveItem}
        showModal={showModal}
        item={editableItem}
        http={http}
      />

      <EuiFlexGroup alignItems="center">
        <EuiFlexItem>
          <EuiText size="s">Drag and drop items to rearrange them</EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={() => openModal({})}>Add item</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={onSave} fill>
            Save changes
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiDragDropContext onDragEnd={onDragEnd}>
        <EuiDroppable
          direction="horizontal"
          droppableId="parent"
          type="macro"
          style={{
            display: 'flex',
            overflowY: 'auto',
          }}
        >
          {menu.map((dashboard, index) => (
            <EuiDraggable
              key={index}
              index={index}
              draggableId={`parent_${index}`}
              spacing="s"
              isRemovable={true}
            >
              {(provided, state) => (
                <EuiPanel
                  paddingSize="s"
                  style={{ minWidth: '150px', padding: '14px' }}
                >
                  <EuiFlexGroup justifyContent="spaceBetween" gutterSize="xl">
                    <EuiFlexItem grow={false}>
                      <EuiText size="s">{dashboard.name}</EuiText>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiFlexGroup gutterSize="xs">
                        <EuiFlexItem>
                          <EuiButtonIcon
                            iconType="pencil"
                            iconSize="s"
                            aria-label="Edit"
                            onClick={() => openModal(dashboard, index)}
                          />
                        </EuiFlexItem>
                        <EuiFlexItem>
                          <EuiButtonIcon
                            iconType="cross"
                            aria-label="Remove"
                            onClick={() => removeItem(index)}
                          />
                        </EuiFlexItem>
                      </EuiFlexGroup>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                  {menu[index].dashboards && (
                    <EuiDroppable droppableId={index.toString()} spacing="none">
                      <EuiSpacer size="s" />
                      {menu[index].dashboards.map(({ name }, idx) => (
                        <DraggableMenuItem
                          name={name}
                          key={idx}
                          index={idx}
                          parentIndex={index}
                          removeItem={removeItem}
                        />
                      ))}
                    </EuiDroppable>
                  )}
                </EuiPanel>
              )}
            </EuiDraggable>
          ))}
        </EuiDroppable>
      </EuiDragDropContext>
    </>
  );
};
