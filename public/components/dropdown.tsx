import React, { useState, useEffect } from 'react';
import {
  EuiHeaderLink,
  EuiPopover,
  EuiPopoverTitle,
  EuiListGroup
} from '@elastic/eui';

const Dropdown = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dashboards = getDashboardLinks(item.dashboards);

  function getDashboardLinks(dashboards) {
    return dashboards.map(dashboard => {
      return {
        label: dashboard.name,
        href: `dashboards#/view/${dashboard.panel_id}`
      }
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
          iconType='arrowDown'
          iconSide='right'
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
      <EuiPopoverTitle paddingsize="l">
        {item.name}
      </EuiPopoverTitle>
      <EuiListGroup
        listItems={dashboards}
        flush={true}
        size="s"
        gutterSize="none"
        onClick={closePopover}
      />
    </EuiPopover>
  );
}

export default Dropdown;
