export interface Clock {
  _id: string,
  description: string,
  endTime: number,
  paused: boolean,
  remainingTime: number
}