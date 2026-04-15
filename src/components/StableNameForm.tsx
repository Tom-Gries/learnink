import { Button, TextField } from "@mui/material";

interface StableNameFormProps {
  stableName?: string;
  saveStable: () => void;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StableNameForm({ stableName = "", saveStable, change }: StableNameFormProps) {
  return (
    <>
      <TextField label="Stable Name" value={stableName} fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => change(e)} />
      <Button
        variant="contained"
        onClick={saveStable}
        color="primary"
      >
        Stable speichern
      </Button >
    </>
  );
}