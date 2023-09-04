// ValidatedInput.tsx
import React from 'react';
import Input from '../Input/Input';
import { ValidatedInputProps } from './ValidatedInputTypes';

const ValidatedInput: React.FC<ValidatedInputProps> = ({ error, ...inputProps }) => {
  const combinedClassName = `${inputProps.className} ${error ? 'error' : ''}`;
  
  return (
    <>
      <Input {...inputProps} className={combinedClassName} />
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default ValidatedInput;
