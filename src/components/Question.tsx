import { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import QuestionWrapper from "./QuestionWrapper";
import AnswerBox from "./AnswerBox";
import type { Question } from "../types/Questions";

type QuestionProps = {
  question: Question;
  takeDecision: (d: string) => void;
};

export default function Question({ question, takeDecision }: QuestionProps) {
  const TOTAL_TIME = 120_000;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const percent = 100 - (diff / TOTAL_TIME) * 100;
      setProgress(Math.max(percent, 0));
      if (percent <= 0) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [question]);

  return (
    <QuestionWrapper title={question.text}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {question.answers.map((answer) => (
          <AnswerBox
            key={answer.id}
            text={answer.text}
            onClick={() => takeDecision(answer.id)}
            disabled={false}
          />
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 2 }}
        />
      </Box>
    </QuestionWrapper>
  );
}