import { useState, useEffect } from "react";
import type { Stable } from "../types/Staples";
import { useStaples } from "../provider/StapleProvider";
import { Button, Grid, TextField } from "@mui/material";
import { EmptyQuestion, type Question } from "../types/Questions";
import QuestionForm from "./QuestionForm";

interface StableFormProps {
  stable: Stable;
}

export default function StableForm({ stable }: StableFormProps) {
  const [formValue, setFormValue] = useState(stable);
  const [question, setQuestion] = useState(EmptyQuestion);
  const { updateStaple } = useStaples();

  // 🔥 Synchronisation: wenn sich stable ändert → formValue updaten
  useEffect(() => {
    setFormValue(stable);
  }, [stable]);

  const submit = () => {
    const updatedFormValue = { ...formValue };

    if (question.text) {
      updatedFormValue.questions = [
        ...updatedFormValue.questions,
        question,
      ];
    }

    updateStaple(updatedFormValue);
    setQuestion(EmptyQuestion);
  };

  const updateName = (name: string) => {
    setFormValue((prev) => ({ ...prev, name }));
  };

  const updateQuestion = (index: number, question: Question) => {
    const updatedQuestions = [...formValue.questions];
    updatedQuestions[index] = question;
    setFormValue((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  return (
    <Grid container direction="column" spacing={2} padding={2}>
      <TextField
        label="Stable Name"
        value={formValue.name}
        onChange={(e) => updateName(e.target.value)}
      />

      {formValue.questions.map((question, index) => (
        <QuestionForm
          key={index}
          question={question}
          onChange={(updatedQuestion) =>
            updateQuestion(index, updatedQuestion)
          }
        />
      ))}

      <QuestionForm
        question={question}
        onChange={(updatedQuestion) => setQuestion(updatedQuestion)}
      />

      <Button onClick={submit}>Save</Button>
    </Grid>
  );
}