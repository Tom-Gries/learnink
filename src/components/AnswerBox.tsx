import { Box } from "@mui/material";
import { grey } from '@mui/material/colors';

interface AnswerBoxProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  background?: string;
  borderColor?: string;
  borderWidth?: number;
}

export default function AnswerBox({ text, onClick, disabled, background, borderColor, borderWidth }: AnswerBoxProps) {
  return (
    <Box
      onClick={!disabled && onClick ? onClick : undefined}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: background || "white",
        color: "black",
        cursor: disabled ? "default" : "pointer",
        border: "1px solid #444",
        borderColor: disabled ? borderColor : undefined,
        borderWidth: disabled ? borderWidth : 1,
        transition: "0.15s",
        "&:hover": {
          backgroundColor: disabled ? background : grey[200],
        },
      }}
    >
      {text}
    </Box>
  );
}