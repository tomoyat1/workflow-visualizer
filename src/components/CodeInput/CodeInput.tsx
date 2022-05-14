import React from "react";
import { Box, SxProps, TextField, Theme, Typography } from "@mui/material";

interface CodeInputProp {
  invalid: boolean;
  value: string;
  updateCode: (code: string) => void;
  sx?: SxProps<Theme>;
}

const CodeInput: React.FC<CodeInputProp> = ({ invalid, value, updateCode }) => {
  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCode(value);
  };
  return (
    <Box>
      <Typography variant={"h4"} component={"div"} sx={{ mb: 1 }}>
        Workflow definition
      </Typography>
      <Box>
        <TextField
          error={invalid}
          multiline
          fullWidth
          value={value}
          onChange={onChange}
          minRows={10}
          maxRows={10}
        />
      </Box>
    </Box>
  );
};

export default CodeInput;
