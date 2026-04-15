import type { Question } from "../types/Questions";
import QuestionForm from "./QuestionForm";

interface QuestionOverviewProps {
  questions: Question[];
  saveQuestion: (question: Question) => void;
}

export default function QuestionOverview({ questions, saveQuestion }: QuestionOverviewProps) {
  return (
    <>
      {questions.map((q, i) => (
        <QuestionForm key={i} question={q} saveQuestion={(question) => saveQuestion(question)} />
      ))}
    </>
  )
}