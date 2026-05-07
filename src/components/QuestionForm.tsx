import { TextField, Switch, FormControlLabel, Card, CardContent, Box } from "@mui/material";
import type { Question, Answer } from "../types/Questions";

interface QuestionFormProps {
  question: Question;
  onChange: (updatedQuestion: Question) => void;
}

export default function QuestionForm({ question, onChange }: QuestionFormProps) {
  const handleAnswerChange = (index: number, updated: Partial<Answer>) => {
    let updatedAnswers = [...question.answers];

    if (updated.isCorrect) {
      updatedAnswers = updatedAnswers.map((answer, i) => ({
        ...answer,
        isCorrect: i === index,
      }));
    } else {
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
    <Card>
      <CardContent>
        <TextField
          label="Frage"
          fullWidth
          multiline
          minRows={1}
          maxRows={3}
          value={question.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...question, text: e.target.value })
          }
        />

        {question.answers.map((answer, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <TextField
              label={`Antwort ${index + 1}`}
              fullWidth
              multiline
              minRows={1}
              maxRows={3}
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
              sx={{ minWidth: 120 }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}