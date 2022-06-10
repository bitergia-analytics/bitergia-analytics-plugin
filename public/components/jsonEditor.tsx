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
  EuiButton,
  EuiButtonEmpty,
  EuiCodeEditor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
} from '@elastic/eui';

export const JsonEditor = ({ http, renderToast, value }) => {
  const [jsonValue, setJsonValue] = useState(JSON.stringify({}));
  const [isInvalid, setIsInvalid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState([]);

  const placeholderJson = {
    metadashboard: [
      {
        name: 'Panel name',
        type: 'entry',
        dashboard_id: 'id',
      },
    ],
  };

  const metadashboard = value || placeholderJson;

  const setInitialValue = () => {
    setJsonValue(JSON.stringify(metadashboard, null, 2));
    setErrors([]);
  };

  const onCodeEditorChange = (value) => {
    try {
      JSON.parse(value);
      setErrors([]);
    } catch (error) {
      setErrors(['Invalid JSON syntax']);
    }
    setJsonValue(value);
  };

  const onSave = async () => {
    try {
      const response = await http.put('/api/dashboards/metadashboard/edit', {
        body: jsonValue,
      });
      renderToast();
    } catch (error) {
      const message = error.body?.message || error.toString();
      setErrors([message]);
      renderToast(error);
    }
  };

  useEffect(() => {
    setInitialValue();
  }, [value]);

  useEffect(() => {
    const isInvalid = errors.length > 0;
    setIsInvalid(isInvalid);
  }, [errors]);

  useEffect(() => {
    const oldValue = JSON.stringify(metadashboard, null, 2);
    setIsChanged(oldValue !== jsonValue);
  }, [jsonValue]);

  return (
    <EuiForm>
      <EuiFormRow label="JSON" isInvalid={isInvalid} error={errors} fullWidth>
        <EuiCodeEditor
          mode="hjson"
          value={jsonValue}
          onChange={onCodeEditorChange}
          width="100%"
          height="auto"
          minLines={6}
          maxLines={20}
          showGutter={false}
          fontSize={14}
          setOptions={{
            showLineNumbers: false,
            tabSize: 2,
            wrap: true,
          }}
        />
      </EuiFormRow>
      <EuiSpacer size="m" />
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton
            onClick={onSave}
            disabled={isInvalid || !isChanged}
            iconType="check"
            fill
          >
            Save changes
          </EuiButton>
        </EuiFlexItem>
        {isChanged && (
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              iconType="cross"
              flush="left"
              onClick={setInitialValue}
            >
              Cancel changes
            </EuiButtonEmpty>
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
    </EuiForm>
  );
};
