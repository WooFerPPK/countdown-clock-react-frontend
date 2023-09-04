import React from 'react';
import { ButtonProps } from './ButtonTypes';

const Button: React.FC<ButtonProps> = ({label, children, onClick, disabled = false}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label || children}
    </button>
  )
}

export default Button;
