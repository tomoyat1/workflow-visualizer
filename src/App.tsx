import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import { Alert, Grid } from "@mui/material";
import StepGraph, { Steps } from "./components/StepGraph/StepGraph";
import CodeInput from "./components/CodeInput/CodeInput";
import yaml from "js-yaml";
import * as z from "zod";
import { ZodError } from "zod";
import { Box } from "@mui/system";
import StepDetails from "./components/StepDetails/StepDetails";

const parse = (y: any): Steps => {
  const schema = z.record(
    z.object({
      type: z.string(),
      after: z.array(z.string()),
      args: z.record(z.string()),
    })
  );

  return schema.parse(y);
};

const App: React.FC = () => {
  const [invalid, updateInvalid] = useState(true);
  const [code, updateCode] = useState("");
  const [steps, updateSteps] = useState<Steps>({});
  const [selectedStep, updateSelectedStep] = useState<string>();
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
      updateSelectedStep("");
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [code]);

  const onNodeClick = (name: string) => {
    updateSelectedStep(name);
  };

  return (
    <Grid container>
      <Grid item xs={8}>
        <Box sx={{ p: 1 }}>
          <Box sx={{ height: 500 }}>
            {!invalid ? (
              <StepGraph steps={steps} onNodeClick={onNodeClick} />
            ) : (
              <Alert severity="error">{`Invalid YAML: ${JSON.stringify(
                parseError?.issues
              )}`}</Alert>
            )}
          </Box>
          <CodeInput invalid={invalid} value={code} updateCode={updateCode} />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ p: 1 }}>
          {selectedStep !== undefined && steps[selectedStep] !== undefined ? (
            <StepDetails
              name={selectedStep}
              type={steps[selectedStep].type}
              args={steps[selectedStep].args}
            />
          ) : (
            <div>Please select a step</div>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;
