export interface InputProps {
  type: string,
  value?: string,
  disabled?: boolean,
  className?: string,
  onChange: (newValue: string) => void;
}