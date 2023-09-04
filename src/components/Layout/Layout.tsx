import React from 'react';
import { LayoutProps } from './LayoutTypes';
import BackButton from '../BackButton/BackButton';

const Layout: React.FC<LayoutProps> = ({ children, hideBackButton = false, backRoute }) => {
  return (
    <>
    <BackButton hide={hideBackButton} backRoute={backRoute}/>
      {children}
    </>
  );
};

export default Layout;