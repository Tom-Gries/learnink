import { TextField, Switch, FormControlLabel } from "@mui/material";
import type { Question, Answer } from "../types/Questions";

interface QuestionFormProps {
  question: Question;
  onChange: (updatedQuestion: Question) => void;
}

export default function QuestionForm({ question, onChange }: QuestionFormProps) {
  const handleAnswerChange = (index: number, updated: Partial<Answer>) => {
    let updatedAnswers = [...question.answers];

    // Wenn diese Antwort auf "correct" gesetzt wird
    if (updated.isCorrect) {
      updatedAnswers = updatedAnswers.map((answer, i) => ({
        ...answer,
        isCorrect: i === index, // nur diese eine true
      }));
    } else {
      // normales Update (z.B. Text ändern oder false setzen)
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        ...updated,
      };
    }

    onChange({
      ...question,
      answers: updatedAnswers,
    });
  };

  return (
    <>
      <TextField
        label="Frage"
        value={question.text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ ...question, text: e.target.value })
        }
      />

      {question.answers.map((answer, index) => (
        <div key={index} style={{ marginTop: 10 }}>
          <TextField
            label={`Antwort ${index + 1}`}
            value={answer.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleAnswerChange(index, { text: e.target.value })
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={answer.isCorrect}
                onChange={(e) =>
                  handleAnswerChange(index, { isCorrect: e.target.checked })
                }
              />
            }
            label="Richtig"
          />
        </div>
      ))}
    </>
  );
}