import React, { useState, useEffect } from 'react';
import { EuiHeaderLinks } from '@elastic/eui';
import Link from './link.tsx';
import Dropdown from './dropdown.tsx';

const Menu = (props) => {
  const [metadashboard, setMetadashboard] = useState(props.metadashboard);

  function setActiveLink() {
    let updated = metadashboard;

    if (props.history.location.hash.includes('#/view/')) {
      const currentDashboard = props.history.location.hash.split('#/view/')[1].split('?')[0];

      updated = metadashboard.map(dashboard => {
        if (dashboard.type === 'entry') {
          return Object.assign(dashboard, {
            isActive: currentDashboard === dashboard.panel_id
          })
        }
        return Object.assign(dashboard, {
          isActive: dashboard.dashboards.some(d => currentDashboard === d.panel_id)
        })
      });
    } else {
      updated = metadashboard.map(dashboard =>
        Object.assign(dashboard, { isActive: false })
      );
    }

    setMetadashboard(updated);
  }

  useEffect(() => {
    // Set active link on first load
    setActiveLink();
  }, []);

  useEffect(() => {
    // Listen to route changes
    const unlisten = props.history.listen(setActiveLink);
    return unlisten;
  }, []);

  return(
    <EuiHeaderLinks gutterSize="xs">
      {metadashboard.map((link, index) => (
        link.type === 'entry' ?
        <Link item={link} key={index} />
        :
        <Dropdown item={link} key={index} />
      ))}
    </EuiHeaderLinks>
  );
};

export default Menu;
