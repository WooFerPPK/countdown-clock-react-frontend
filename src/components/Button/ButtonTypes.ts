import { MouseEventHandler } from 'react';

export interface ButtonProps {
  label?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
  children?: React.ReactNode,
  holdTime?: number
}