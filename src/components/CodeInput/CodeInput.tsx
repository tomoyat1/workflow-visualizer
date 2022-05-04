import React from "react";
import { Container, TextField } from "@mui/material";

interface CodeInputProp {
  invalid: boolean;
  value: string;
  updateCode: (code: string) => void;
}

const CodeInput: React.FC<CodeInputProp> = ({ invalid, value, updateCode }) => {
  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCode(value);
  };

  return (
    <TextField
      error={invalid}
      multiline
      fullWidth
      minRows={15}
      maxRows={15}
      value={value}
      onChange={onChange}
      helperText={invalid ? "Invalid workflow YAML" : ""}
    />
  );
};

export default CodeInput;
