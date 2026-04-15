import type { Question } from "./Questions";

export type Stable = {
  _id?: string;
  name: string;
  questions: Question[];
};

export const emptyStable: Stable = {
  name: "",
  questions: [],
};
