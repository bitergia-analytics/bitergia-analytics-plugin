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
import { EuiHeaderLink } from '@elastic/eui';

export const Link = ({ item, baseURL, navigateToUrl }) => {
  const url = item.dashboard_id?.includes('http')
    ? item.dashboard_id
    : `${baseURL}#/view/${item.dashboard_id}`;

  const isLeftClickEvent = (event: React.MouseEvent) => {
    return event.button === 0;
  };

  const navigateToLink = (event: React.MouseEvent) => {
    if (isLeftClickEvent(event)) {
      event.preventDefault();
      navigateToUrl(url);
    }
    return;
  };

  return (
    <EuiHeaderLink href={url} isActive={item.isActive} onClick={navigateToLink}>
      {item.name}
    </EuiHeaderLink>
  );
};
