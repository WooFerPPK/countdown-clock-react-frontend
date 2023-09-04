export interface FutureTimePickerProps {
  minTimeMillis: number;
  onSelect: (time: number) => void;
  onError: (hasError: boolean) => void;
}