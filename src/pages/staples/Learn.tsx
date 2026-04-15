import Question from "../../components/Question";
import { useStaples } from "../../provider/StapleProvider";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Result from "../../components/Result";
import FinalResult from "../../components/FinalResult";
import type { Answer } from "../../types/Questions";

export default function Learn() {
  const { id } = useParams();
  const { staples, loading } = useStaples();
  const [score, setScore] = useState(0);

  const [index, setIndex] = useState(0);
  const [decision, setDecision] = useState<Answer | null>(null);

  if (loading) return <p>Lädt…</p>;

  const staple = staples.find((s) => s._id === id);
  if (!staple) return <p>Kein Staple gefunden</p>;

  const question = staple.questions[index];

  const takeDecision = (selectedAnswer: Answer) => {
    updateScore(selectedAnswer.isCorrect);
    setDecision(selectedAnswer);
  }

  const updateScore = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  }

  if (!question) return <FinalResult Score={score} />;

  if (decision) {
    return (
      <Result
        question={question}
        decision={decision}
        next={() => {
          setDecision(null);
          setIndex((prev) => prev + 1);
        }}
      />
    );
  }

  return (
    <Question
      question={question}
      takeDecision={(d: Answer) => takeDecision(d)}
    />
  );
}