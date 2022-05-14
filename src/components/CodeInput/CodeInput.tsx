import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";

interface CodeInputProp {
  invalid: boolean;
  value: string;
  updateCode: (code: string) => void;
  sx?: SxProps<Theme>;
}

const CodeInput: React.FC<CodeInputProp> = ({
  invalid,
  value,
  updateCode,
  sx = [],
}) => {
  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCode(value);
  };
  return (
    <Card sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <CardHeader title="Workflow definition" />
      <CardContent
        sx={{
          height: 1,
        }}
      >
        <TextField
          error={invalid}
          multiline
          fullWidth
          value={value}
          onChange={onChange}
          minRows={10}
          maxRows={10}
        />
      </CardContent>
    </Card>
  );
};

export default CodeInput;
