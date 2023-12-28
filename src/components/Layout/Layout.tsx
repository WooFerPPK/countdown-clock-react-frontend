import React from 'react';
import { LayoutProps } from './LayoutTypes';
import BackButton from '../BackButton/BackButton';

const Layout: React.FC<LayoutProps> = ({ children, hideBackButton = false, backRoute, className }) => {
  return (
    <div className={className}>
    <BackButton hide={hideBackButton} backRoute={backRoute}/>
      {children}
    </div>
  );
};

export default Layout;