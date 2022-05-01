import React, { useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";

interface CodeInputProp {
  updateCodeCallback: (code: string) => void;
}

const CodeInput: React.FC<CodeInputProp> = ({ updateCodeCallback }) => {
  const [code, updateCode] = useState<string>();
  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCode(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (code !== undefined) {
        updateCodeCallback(code);
      }
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Container>
      <TextField
        multiline
        fullWidth
        minRows={20}
        maxRows={20}
        onChange={onChange}
      />
    </Container>
  );
};

export default CodeInput;
