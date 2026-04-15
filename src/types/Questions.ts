export type Answer = {
  text: string;
  isCorrect: boolean;
}

export type Question = {
  id?: string;
  text: string;
  answers: Answer[];
};

export const EmptyQuestion: Question = {
  text: "",
  answers: [
    { text: "", isCorrect: true },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],
}