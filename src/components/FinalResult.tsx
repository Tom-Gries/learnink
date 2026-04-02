interface FinalResultProps { Score: number }

export default function FinalResult({ Score }: FinalResultProps) {
  return (
    <>
      Dein Scorte beträgt {Score}.
    </>
  );
}