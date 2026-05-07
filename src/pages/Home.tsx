import { Grid } from "@mui/material";
import CreateStableForm from "../components/CreateStableForm";
import Stables from "../components/Staples";

function Home() {
  return (
    <Grid container spacing={2} padding={2}>
      <Stables />
      <CreateStableForm />
    </Grid>
  );
}

export default Home