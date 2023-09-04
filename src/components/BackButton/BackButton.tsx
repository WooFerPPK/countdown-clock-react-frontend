// BackButton.js
import React from 'react';
import Button from '../Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { BackButtonProps } from './BackButtonTypes';


const BackButton: React.FC<BackButtonProps> = ({ hide, backRoute }) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/' || hide) {
    return null;
  }

  const handleGoBack = () => {
    if (backRoute) {
      navigate(backRoute);
    } else {
      navigate(-1);
    }
  };

  return <Button label='Go Back' onClick={handleGoBack} />;
};

export default BackButton;
