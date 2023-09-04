import React from 'react';
import { RowButtonLiinkProps } from './RowButtonLinkTypes';
import { Link } from 'react-router-dom';

const RowButtonLiink:React.FC<RowButtonLiinkProps> = ({ children, to, className }) => {
  return (
    <Link to={to} className={`row-button ${className}`}>
        {children}
    </Link>
  );
};

export default RowButtonLiink;