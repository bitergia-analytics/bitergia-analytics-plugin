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
  EuiHeaderLink,
  EuiPopover,
  EuiPopoverTitle,
  EuiListGroup,
} from '@elastic/eui';

export const Dropdown = ({ item, baseURL }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dashboards = getDashboardLinks(item.dashboards);

  function getDashboardLinks(links) {
    return links.map((dashboard) => {
      const url = dashboard.panel_id.includes('http')
        ? dashboard.panel_id
        : `${baseURL}#/view/${dashboard.panel_id}`;
        
      return {
        label: dashboard.name,
        href: url,
      };
    });
  }

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function closePopover() {
    setIsOpen(false);
  }

  return (
    <EuiPopover
      button={
        <EuiHeaderLink
          iconType="arrowDown"
          iconSide="right"
          onClick={handleClick}
          isActive={item.isActive}
        >
          {item.name}
        </EuiHeaderLink>
      }
      anchorPosition="downCenter"
      isOpen={isOpen}
      closePopover={closePopover}
      panelPaddingSize="m"
      panelClassName="custom-panel"
    >
      <EuiPopoverTitle paddingsize="l">{item.name}</EuiPopoverTitle>
      <EuiListGroup
        listItems={dashboards}
        flush={true}
        size="s"
        gutterSize="none"
        onClick={closePopover}
      />
    </EuiPopover>
  );
};
