import { useState } from "react";
import { TextField, Switch, FormControlLabel, Box, Button } from "@mui/material";
import { EmptyQuestion, type Question } from "../types/Questions";

interface QuestionFormProps {
  question?: Question | null;
  saveQuestion: (question: Question) => void;
}

export default function QuestionForm({ question, saveQuestion }: QuestionFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    question ?? EmptyQuestion
  );

  function setCorrectAnswer(index: number) {
    setCurrentQuestion(prev => ({
      ...prev,
      answers: prev.answers.map((a, i) => ({
        ...a,
        isCorrect: i === index,
      })),
    }));
  }

  function updateAnswerText(index: number, text: string) {
    setCurrentQuestion(prev => ({
      ...prev,
      answers: prev.answers.map((a, i) => (i === index ? { ...a, text } : a)),
    }));
  }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <TextField
        label="Fragestellung"
        value={currentQuestion.text}
        onChange={(e) =>
          setCurrentQuestion(prev => ({ ...prev, text: e.target.value }))
        }
        fullWidth
      />

      {currentQuestion.answers.map((answer, index) => (
        <Box key={index} display="flex" alignItems="center" gap={2}>
          <TextField
            label={`Antwort ${index + 1}`}
            value={answer.text}
            onChange={(e) => updateAnswerText(index, e.target.value)}
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={answer.isCorrect}
                onChange={() => setCorrectAnswer(index)}
              />
            }
            label="Correct"
          />
        </Box>
      ))}

      <Button
        variant="contained"
        onClick={() => { saveQuestion(currentQuestion); setCurrentQuestion(EmptyQuestion) }}
        color="primary"
      >
        Frage speichern
      </Button>
    </Box>
  );
}