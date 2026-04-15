import { useState } from "react";
import QuestionOverview from "../../components/QuestionOverview";
import StableNameForm from "../../components/StableNameForm";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useStaples } from "../../provider/StapleProvider";
import { emptyStable, type Stable } from "../../types/Staples";
import QuestionForm from "../../components/QuestionForm";
import type { Question } from "../../types/Questions";

interface EditProps { }

export default function Edit({ }: EditProps) {
  const { staples, loading } = useStaples();
  const [stable, setStable] = useState<Stable>(emptyStable);
  const { id } = useParams<{ id: string }>();

  if (id && loading) {
    return <div>Loading...</div>;
  }
  if (id && !loading) {
    setStable(staples.find(s => s._id === id) || emptyStable);
  }

  const change = ({ name }: { name: string }) => {
    setStable({ ...stable, name });
  }

  const saveStable = () => {
    console.log("Stable saved")
  }


  const saveQuestion = (question: Question) => {
    if (!question.id) {
      setStable(prev => ({ ...prev, questions: [...prev.questions, question] }));
    } else {
      setStable(prev => ({
        ...prev,
        questions: prev.questions.map(q => q.id === question.id ? question : q)
      }));
    }
    saveStable();
  }


  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <StableNameForm stableName={stable.name} saveStable={() => { console.log("Stable saved") }} change={(e: React.ChangeEvent<HTMLInputElement>) => change({ name: e.target.value })} />
      </Grid>
      <Grid size={12}>
        <QuestionForm question={undefined} saveQuestion={(question) => saveQuestion(question)} />
      </Grid>
      <Grid size={12}>
        <QuestionOverview questions={stable.questions} saveQuestion={(question) => saveQuestion(question)} />
      </Grid>
    </Grid>
  );
}