import React from 'react';
import { EuiHeaderLink } from '@elastic/eui';

const Link = ({ item }) => {
  return(
    <EuiHeaderLink
     href={`dashboards#/view/${item.panel_id}`}
     isActive={item.isActive}
     >
      { item.name }
    </EuiHeaderLink>
  );
};

export default Link;
