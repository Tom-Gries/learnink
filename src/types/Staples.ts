import type { Question } from "./Questions";

export type Stables = {
  _id: string;
  name: string;
  questions: Question[];
};