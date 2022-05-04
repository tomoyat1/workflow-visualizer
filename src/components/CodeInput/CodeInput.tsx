import React from "react";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";

interface CodeInputProp {
  invalid: boolean;
  value: string;
  updateCode: (code: string) => void;
  ref: any;
}

const CodeInput = React.forwardRef<HTMLDivElement, CodeInputProp>(
  (props, ref) => {
    const onChange = ({
      target: { value },
    }: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.updateCode(value);
    };
    return (
      <Card ref={ref}>
        <CardHeader title="Workflow definition" />
        <CardContent>
          <TextField
            error={props.invalid}
            multiline
            fullWidth
            minRows={10}
            maxRows={10}
            value={props.value}
            onChange={onChange}
          />
        </CardContent>
      </Card>
    );
  }
);

export default CodeInput;
