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
  EuiComboBox,
} from '@elastic/eui';

export const FormModal = ({ showModal, saveItem, item, http }) => {
  const initialValues = {
    isModalVisible: false,
    isInvalid: false,
    errors: [],
    name: '',
    type: 'entry',
    dashboardId: {
      label: '',
      dashboard_id: '',
    },
    dashboards: [
      {
        name: '',
        type: 'entry',
        label: '',
        dashboard_id: '',
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
  const [dashboardId, setDashboardId] = useState(initialValues.dashboardId);
  const [dashboards, setDashboards] = useState(initialValues.dashboards);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    function findOption(id) {
      if (!id) {
        return;
      }
      const found = options.find((option) => option.dashboard_id === id);
      return found ? found : createOption(id, options);
    }

    setIsModalVisible(showModal || initialValues.showModal);
    setName(item?.name || initialValues.name);
    setType(item?.type || initialValues.type);
    setDashboardId(findOption(item?.dashboard_id) || initialValues.dashboardId);
    setDashboards(initialValues.dashboards);

    if (item?.dashboards) {
      const copy = [...item.dashboards];
      const dashboardsData = copy.map((dashboard) => {
        const optionData = findOption(dashboard.dashboard_id);
        return { ...optionData, ...dashboard };
      });
      setDashboards(dashboardsData);
    }
  }, [showModal, item]);

  useEffect(() => {
    async function fetchDashboards() {
      try {
        const response = await http.put('/api/dashboards/search');

        const result = response.hits.map((hit) => {
          return {
            label: hit._source.dashboard.title,
            dashboard_id: hit._id.replace('dashboard:', ''),
          };
        });

        setOptions(result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDashboards();
  }, []);

  const addDashboard = () => {
    setDashboards([
      ...dashboards,
      {
        name: '',
        type: 'entry',
        dashboard_id: '',
        label: '',
      },
    ]);
  };

  const removeDashboard = (index) => {
    const copy = [...dashboards];
    copy.splice(index, 1);
    setDashboards(copy);
  };

  const createOption = (searchValue = '', flattenedOptions = []) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
      dashboard_id: searchValue,
    };

    if (
      !flattenedOptions.find(
        (option) =>
          option.dashboard_id.trim().toLowerCase() === normalizedSearchValue
      )
    ) {
      setOptions([...options, newOption]);
    }

    return newOption;
  };

  const setDashboardData = (index, value) => {
    const copy = [...dashboards];
    Object.assign(copy[index], value);
    setDashboards(copy);
  };

  const closeModal = () => {
    setIsInvalid(false);
    setErrors([]);
    setIsModalVisible(false);
    setName(initialValues.name);
    setType(initialValues.type);
    setDashboardId(initialValues.dashboardId);
    setDashboards(initialValues.dashboards);
  };

  const onSave = () => {
    setIsInvalid(false);
    const messages = [];
    if (!name) {
      messages.push('Name is required');
    }
    if (type === 'entry' && !dashboardId.dashboard_id) {
      messages.push('Dashboard ID is required');
    }
    if (type === 'menu' && dashboards.some((d) => !d.name || !d.dashboard_id)) {
      messages.push('Missing menu item data');
    }
    if (messages.length > 0) {
      setIsInvalid(true);
      setErrors(messages);
      return;
    }

    const itemData = { name, type };

    if (type === 'entry') {
      itemData.dashboard_id = dashboardId.dashboard_id;
    } else {
      itemData.dashboards = dashboards.map((dashboard) => {
        return {
          dashboard_id: dashboard.dashboard_id,
          name: dashboard.name,
          type: 'entry',
        };
      });
    }

    saveItem(itemData);
    closeModal();
  };

  const entryForm = (
    <>
      <EuiSpacer size="s" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow label="Name" id="name">
            <EuiFieldText
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Dashboard ID or URL" id="dashboard-id">
            <EuiComboBox
              options={options}
              selectedOptions={[dashboardId]}
              singleSelection={{ asPlainText: true }}
              onChange={(e) =>
                setDashboardId(e[0] || initialValues.dashboardId)
              }
              onCreateOption={(e) => setDashboardId(createOption(e))}
              id="dashboard-id"
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
              onChange={(e) =>
                setDashboardData(index, { name: e.target.value })
              }
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Dashboard ID or URL">
            <EuiComboBox
              options={options}
              selectedOptions={[dashboards[index]]}
              singleSelection={{ asPlainText: true }}
              onChange={(e) =>
                setDashboardData(
                  index,
                  e[0] || {
                    dashboard_id: '',
                    label: '',
                  }
                )
              }
              onCreateOption={(e) => setDashboardData(index, createOption(e))}
              style={{ width: '350px' }}
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
                <h1>{item?.name ? 'Edit item' : 'Add item'}</h1>
              </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiForm component="form" isInvalid={isInvalid} error={errors}>
                <EuiFormRow label="Type" id="type">
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
                    id="type"
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
