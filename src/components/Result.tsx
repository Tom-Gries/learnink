import { green, red, grey } from '@mui/material/colors';
import { Box, Button } from "@mui/material";
import QuestionWrapper from "./QuestionWrapper";
import AnswerBox from "./AnswerBox";

export default function Result({ question, decision, next }) {
  return (
    <QuestionWrapper title={question.text}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {question.answers.map((answer) => {


          return (
            <AnswerBox
              key={answer.id}
              text={answer.text}
              disabled={true}
              background={answer.isCorrect ? green[100] : red[100]}
              borderColor={answer.id === decision ? grey[900] : undefined}
              borderWidth={answer.id === decision ? 2 : 1}
            />
          );
        })}
      </Box>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button variant="outlined" onClick={next}>
          Weiter
        </Button>
      </Box>
    </QuestionWrapper>
  );
}