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
  const [metadashboard, setMetadashboard] = useState(props.metadashboard);

  function setActiveLink() {
    let updated = metadashboard;

    if (props.history.location.hash.includes('#/view/')) {
      const currentDashboard = props.history.location.hash
        .split('#/view/')[1]
        .split('?')[0];

      updated = metadashboard.map((dashboard) => {
        if (dashboard.type === 'entry') {
          return Object.assign(dashboard, {
            isActive: currentDashboard === dashboard.panel_id,
          });
        }
        return Object.assign(dashboard, {
          isActive: dashboard.dashboards.some(
            (d) => currentDashboard === d.panel_id
          ),
        });
      });
    } else {
      updated = metadashboard.map((dashboard) =>
        Object.assign(dashboard, { isActive: false })
      );
    }

    setMetadashboard(updated);
  }

  useEffect(() => {
    // Set active link on first load
    setActiveLink();

    // Add class to parent container
    const menu = document.querySelector('.bitergia-menu');
    const parent = menu.closest('.euiHeaderSectionItem').parentElement;
    parent.classList.add('bitergia-menu-parent');
  }, []);

  useEffect(() => {
    // Listen to route changes
    const unlisten = props.history.listen(setActiveLink);
    return unlisten;
  }, []);

  return (
    <EuiHeaderLinks gutterSize="xs" className="bitergia-menu">
      {metadashboard.map((link, index) =>
        link.type === 'entry' ? (
          <Link item={link} key={index} />
        ) : (
          <Dropdown item={link} key={index} />
        )
      )}
    </EuiHeaderLinks>
  );
};
