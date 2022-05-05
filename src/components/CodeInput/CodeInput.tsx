import React, { useRef } from "react";
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
  ref: any;
  sx?: SxProps<Theme>;
}

const CodeInput = React.forwardRef<HTMLDivElement, CodeInputProp>(
  ({ invalid, value, updateCode, sx = [] }, extRef) => {
    const ref = useRef<HTMLDivElement>(null);
    const onChange = ({
      target: { value },
    }: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateCode(value);
    };
    return (
      <Card ref={ref} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
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
  }
);

export default CodeInput;
