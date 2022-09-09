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
import { EuiHeaderLinks } from '@elastic/eui';
import { Link } from './link.tsx';
import { Dropdown } from './dropdown.tsx';

export const Menu = (props) => {
  const [menu, setMenu] = useState(props.menu);
  const { baseURL, history } = props;

  function setActiveLink() {
    let updated = menu;

    if (history.location.hash.includes('#/view/')) {
      const currentDashboard = history.location.hash
        .split('#/view/')[1]
        .split('?')[0];

      updated = menu.map((dashboard) => {
        if (dashboard.type === 'entry') {
          return Object.assign(dashboard, {
            isActive: currentDashboard === dashboard.dashboard_id,
          });
        }
        return Object.assign(dashboard, {
          isActive: dashboard.dashboards.some(
            (d) => currentDashboard === d.dashboard_id
          ),
        });
      });
    } else {
      updated = menu.map((dashboard) =>
        Object.assign(dashboard, { isActive: false })
      );
    }

    setMenu(updated);
  }

  useEffect(() => {
    // Set active link on first load
    setActiveLink();

    // Add class to parent container
    const menuBar = document.querySelector('.bitergia-menu');
    const parent = menuBar.closest('.euiHeaderSectionItem').parentElement;
    parent.classList.add('bitergia-menu-parent');
  }, []);

  useEffect(() => {
    // Listen to route changes
    const unlisten = history.listen(setActiveLink);
    return unlisten;
  }, [history]);

  return (
    <EuiHeaderLinks gutterSize="xs" className="bitergia-menu">
      {menu.map((link, index) =>
        link.type === 'entry' ? (
          <Link item={link} baseURL={baseURL} key={index} />
        ) : (
          <Dropdown item={link} baseURL={baseURL} key={index} />
        )
      )}
    </EuiHeaderLinks>
  );
};
