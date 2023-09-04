import React from 'react';
import { InputProps } from './InputTypes';

const Input: React.FC<InputProps> = ({ type, value, disabled, className, onChange }) => {
  return (
    <input className={className} type={type} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
  )
}

export default Input;