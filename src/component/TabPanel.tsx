import React, { HTMLProps } from 'react';

interface TabPanelProps extends HTMLProps<HTMLDivElement> {
  value: number;
  index: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  style,
  ...props
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ flexGrow: 1, overflow: 'scroll', ...style }}
      {...props}
    >
      {value === index ? children : null}
    </div>
  );
};
