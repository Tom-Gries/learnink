import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Podium from "./Podium";
import { useStaples } from "../provider/StapleProvider";

function Stables() {
  const { staples, loading } = useStaples();
  if (loading) return <p>Lädt…</p>;

  const navigate = useNavigate();

  return (
    <div>

      {staples.map((staple) => (
        <Card key={staple._id}>
          <CardContent>
            <Typography variant="h4" component="div">
              {staple.name}
            </Typography>
            <Podium />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                navigate(`/staple/edit/${staple._id}`)
              }
            >
              Edit
            </Button>
            <Button
              size="small"
              onClick={() =>
                navigate(`/staple/learn/${staple._id}`)
              }
            >
              Learn
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default Stables
