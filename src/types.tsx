import { Moment } from "moment";

export type CountdownInput = Partial<{ m: number; s: number; h: number; }>;
export type CountdownConfig = Partial<{
  onDone: () => any;
  recurring: boolean;
}>;

export interface CountdownReturnValues {
  time: Moment;
  start: () => void;
  stop: () => void;
  started: boolean;
  paused: boolean;
  reset: () => void;
}
