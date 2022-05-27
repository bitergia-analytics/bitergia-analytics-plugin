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

import React, { useEffect, useState } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiRadioGroup,
  EuiOverlayMask,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
  EuiButtonIcon,
} from '@elastic/eui';

export const FormModal = ({ showModal, saveItem, item }) => {
  const initialValues = {
    isModalVisible: false,
    isInvalid: false,
    errors: [],
    name: '',
    type: 'entry',
    panelId: '',
    dashboards: [
      {
        name: '',
        type: 'entry',
      },
    ],
  };
  const [isModalVisible, setIsModalVisible] = useState(
    initialValues.isModalVisible
  );
  const [isInvalid, setIsInvalid] = useState(initialValues.isInvalid);
  const [errors, setErrors] = useState(initialValues.errors);
  const [name, setName] = useState(initialValues.name);
  const [type, setType] = useState(initialValues.type);
  const [panelId, setPanelId] = useState(initialValues.panelId);
  const [dashboards, setDashboards] = useState(initialValues.dashboards);

  useEffect(() => {
    setIsModalVisible(showModal || initialValues.showModal);
    setName(item?.name || initialValues.name);
    setType(item?.type || initialValues.type);
    setPanelId(item?.panel_id || initialValues.panelId);
    setDashboards(item?.dashboards || initialValues.dashboards);
  }, [showModal, item]);

  const addDashboard = () => {
    setDashboards([
      ...dashboards,
      {
        name: '',
        panel_id: '',
      },
    ]);
  };

  const removeDashboard = (index) => {
    const copy = [...dashboards];
    copy.splice(index, 1);
    setDashboards(copy);
  };

  const setDashboardData = (index, key, value) => {
    const copy = [...dashboards];
    copy[index][key] = value;
    setDashboards(copy);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setName(initialValues.Name);
    setType(initialValues.type);
    setPanelId(initialValues.panelId);
    setDashboards(initialValues.dashboards);
  };

  const onSave = () => {
    setIsInvalid(false);
    const messages = [];
    if (!name) {
      messages.push('Name is required');
    }
    if (type === 'entry' && !panelId) {
      messages.push('Panel ID is required');
    }
    if (type === 'menu' && dashboards.some((d) => !d.name || !d.panel_id)) {
      messages.push('Missing menu item data');
    }
    if (messages.length > 0) {
      setIsInvalid(true);
      setErrors(messages);
      return;
    }

    const item = { name, type };

    if (type === 'entry') {
      item.panel_id = panelId;
    } else {
      item.dashboards = dashboards.map((d) =>
        Object.assign(d, { type: 'entry' })
      );
    }

    saveItem(item);
    closeModal();
  };

  const entryForm = (
    <>
      <EuiSpacer size="s" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow label="Name">
            <EuiFieldText
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Panel ID">
            <EuiFieldText
              name="panel_id"
              value={panelId}
              onChange={(e) => setPanelId(e.target.value)}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );

  const dashboardsForm = dashboards.map((dashboard, index) => (
    <div key={index}>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem>
          <EuiFormRow label="Name">
            <EuiFieldText
              name="name"
              value={dashboard.name}
              onChange={(e) => setDashboardData(index, 'name', e.target.value)}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Panel ID">
            <EuiFieldText
              name="panel_id"
              value={dashboards[index].panel_id}
              onChange={(e) =>
                setDashboardData(index, 'panel_id', e.target.value)
              }
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace>
            <EuiButtonIcon
              size="s"
              onClick={() => {
                removeDashboard(index);
              }}
              iconType="cross"
              aria-label="Remove item"
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  ));

  const menuForm = (
    <>
      <EuiFormRow label="Menu name">
        <EuiFieldText
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </EuiFormRow>
      <div>
        <EuiSpacer size="m" />
        <EuiTitle size="xxs">
          <h2>Menu items</h2>
        </EuiTitle>
        <EuiSpacer size="m" />
        {dashboardsForm}
        <EuiButtonEmpty onClick={addDashboard}>Add more items</EuiButtonEmpty>
      </div>
    </>
  );

  return (
    <div>
      {isModalVisible && (
        <EuiOverlayMask>
          <EuiModal onClose={closeModal} style={{ width: 800 }}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                <h1>{item.name ? 'Edit item' : 'Add item'}</h1>
              </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiForm component="form" isInvalid={isInvalid} error={errors}>
                <EuiFormRow label="Type">
                  <EuiRadioGroup
                    options={[
                      {
                        id: 'entry',
                        label: 'Link',
                      },
                      {
                        id: 'menu',
                        label: 'Dropdown menu',
                      },
                    ]}
                    idSelected={type}
                    onChange={(id) => setType(id)}
                    name="type"
                  />
                </EuiFormRow>

                {type === 'entry' ? entryForm : menuForm}
              </EuiForm>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
              <EuiButton type="submit" onClick={onSave} fill>
                Save
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      )}
    </div>
  );
};
