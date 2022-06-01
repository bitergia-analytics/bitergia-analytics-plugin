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

import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiSpacer,
  EuiTitle,
  EuiTabbedContent,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiToast,
  EuiButton,
} from '@elastic/eui';
import { DragDropEditor } from './../components/dragDropEditor';
import { JsonEditor } from './../components/jsonEditor';

export const App = ({ basename, notifications, http, navigation, methods }) => {
  const metadashboard = methods.getMetadashboard()?.metadashboard;

  const renderToast = (error) => {
    if (error) {
      notifications.toasts.addError(
        { error, message: error.body?.message || error },
        { title: 'Error saving menu' }
      );
    } else {
      window.location.reload();
    }
  };

  const tabs = [
    {
      id: 'dnd',
      name: 'Visual interface',
      content: (
        <Fragment>
          <EuiSpacer />
          <DragDropEditor
            renderToast={renderToast}
            http={http}
            value={metadashboard}
          />
        </Fragment>
      ),
    },
    {
      id: 'json',
      name: 'JSON',
      content: (
        <Fragment>
          <EuiSpacer />
          <JsonEditor
            renderToast={renderToast}
            http={http}
            value={methods.getMetadashboard()}
          />
        </Fragment>
      ),
    },
  ];

  return (
    <Router basename={basename}>
      <EuiPage restrictWidth="1300px">
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle>
              <h2>Bitergia Analytics</h2>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle size="s">
                <h3>Edit menu</h3>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiTabbedContent
                tabs={tabs}
                initialSelectedTab={tabs[0]}
                autoFocus="selected"
              />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </Router>
  );
};
