import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import { Alert, Container } from "@mui/material";
import StepGraph, { Steps } from "./components/StepGraph/StepGraph";
import CodeInput from "./components/CodeInput/CodeInput";
import yaml from "js-yaml";
import * as z from "zod";
import { ZodError } from "zod";
import { Box } from "@mui/system";

const parse = (y: any): Steps => {
  const schema = z.record(
    z.object({
      type: z.string(),
      after: z.array(z.string()),
    })
  );

  return schema.parse(y);
};

const App: React.FC = () => {
  const [invalid, updateInvalid] = useState(true);
  const [code, updateCode] = useState("");
  const [steps, updateSteps] = useState<Steps>({});
  const [parseError, updateParseError] = useState<ZodError>();

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      let parsed: Steps;
      try {
        const y = yaml.load(code);
        parsed = parse(y);
        updateInvalid(false);
      } catch (e) {
        if (e instanceof ZodError) {
          updateParseError(e);
        }
        updateInvalid(true);
        parsed = {};
      }
      updateSteps(parsed);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [code]);

  return (
    <Container>
      <Box sx={{ height: 500 }}>
        {!invalid ? (
          <StepGraph steps={steps}></StepGraph>
        ) : (
          <Alert severity="error">{`Invalid YAML: ${JSON.stringify(
            parseError?.issues
          )}`}</Alert>
        )}
      </Box>
      <CodeInput invalid={invalid} value={code} updateCode={updateCode} />
    </Container>
  );
};

export default App;
