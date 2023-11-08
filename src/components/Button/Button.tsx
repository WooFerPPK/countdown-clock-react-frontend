import React, { useState, useEffect } from 'react';
import { ButtonProps } from './ButtonTypes';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({ label, children, onClick, disabled = false, holdTime }) => {
  const [holding, setHolding] = useState(false);
  const [holdStartTime, setHoldStartTime] = useState(null);

  useEffect(() => {
    let holdTimer: ReturnType<typeof setTimeout>;
    if (holding && holdTime) {
      holdTimer = setTimeout(() => {
        onClick(null);
        setHolding(false);
      }, holdTime - (Date.now() - holdStartTime));
    }
    return () => {
      clearTimeout(holdTimer);
    };
  }, [holding, holdTime, holdStartTime, onClick]);

  const handleMouseDown = () => {
    if (holdTime) {
      setHolding(true);
      setHoldStartTime(Date.now());
    }
  };

  const handleMouseUp = () => {
    if (holdTime) {
      setHolding(false);
    }
  };
  const buttonStyle = holding && holdTime ? { transitionDuration: `${holdTime}ms` } : {};
  return (
    <button
      className={holding ? 'growing-button' : ''}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={!holdTime ? onClick : undefined}
      disabled={disabled}
      style={buttonStyle}
    >
      {label || children}
    </button>
  );
};

export default Button;
