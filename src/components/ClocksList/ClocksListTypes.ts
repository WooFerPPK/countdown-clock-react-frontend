import { Clock } from "@/interfaces/Clock"
import { ErrorType } from "@/interfaces/ErrorType";

export interface ClocksListProps {
  clocks: Clock[],
  loading: boolean,
  error?: ErrorType
}
