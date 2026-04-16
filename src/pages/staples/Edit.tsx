import { useParams } from "react-router-dom";
import { useStaples } from "../../provider/StapleProvider";
import StableForm from "../../components/StableForm";

interface EditProps { }

export default function Edit({ }: EditProps) {
  const { staples, loading } = useStaples();
  const { id } = useParams<{ id: string }>();

  if (id && loading) {
    return <div>Loading...</div>;
  }

  const staple = staples.find((s) => s._id === id);
  if (!staple) return <p>Kein Staple gefunden</p>;

  return (<StableForm stable={staple} />);
}