import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import { useStaples } from "../provider/StapleProvider";

interface CreateStableFormProps { }

export default function CreateStableForm({ }: CreateStableFormProps) {
  const [name, setName] = useState("");
  const { createStaple } = useStaples();

  return (
    <>
      <Card>
        <CardContent>
          <TextField label="Stable Name" value={name} fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => createStaple({ name: name, questions: [] })}
          >
            Create new stable
          </Button>
        </CardActions>
      </Card>
    </>
  );
}