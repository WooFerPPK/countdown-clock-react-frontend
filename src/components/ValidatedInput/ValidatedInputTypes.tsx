import { InputProps } from '../Input/InputTypes';

export interface ValidatedInputProps extends InputProps {
  error?: string;
}