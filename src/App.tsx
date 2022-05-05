import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import { Alert, Card, CardContent, Grid, Stack } from "@mui/material";
import StepGraph, { Steps } from "./components/StepGraph/StepGraph";
import CodeInput from "./components/CodeInput/CodeInput";
import yaml from "js-yaml";
import * as z from "zod";
import { ZodError } from "zod";
import StepDetails from "./components/StepDetails/StepDetails";
import { Box } from "@mui/system";

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

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = () => {
  const [windowDimensions, updateWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => updateWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

const App: React.FC = () => {
  const [invalid, updateInvalid] = useState(true);
  const [code, updateCode] = useState("");
  const [steps, updateSteps] = useState<Steps>({});
  const [selectedStep, updateSelectedStep] = useState<string>("");
  const [parseError, updateParseError] = useState<ZodError>();
  const [graphHeight, updateGraphHeight] = useState<number>(0);
  const codeInputEl = useRef<HTMLDivElement>(null);
  const { height, width } = useWindowDimensions();
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

  useLayoutEffect(() => {
    if (codeInputEl.current != null) {
      const h = codeInputEl.current.offsetHeight;
      updateGraphHeight(height - h - 16); // 8px paddings on top and bottom of <Box />
    }
  });

  const graphComponent = () => (
    <Card sx={{ height: 1 }}>
      <CardContent>
        {!invalid ? (
          <StepGraph steps={steps} onNodeClick={updateSelectedStep} />
        ) : (
          <Alert severity="error">{`Invalid YAML: ${JSON.stringify(
            parseError?.issues
          )}`}</Alert>
        )}
      </CardContent>
    </Card>
  );

  const codeInputComponent = () => (
    <CodeInput
      invalid={invalid}
      value={code}
      updateCode={updateCode}
      ref={codeInputEl}
    />
  );

  const detailsComponent = () => (
    <StepDetails
      step={
        steps[selectedStep] !== undefined
          ? {
              name: selectedStep,
              ...steps[selectedStep],
            }
          : undefined
      }
      sx={{
        height: 1,
      }}
    />
  );

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      sx={{ p: 1, height: height }}
    >
      <Grid item sx={{ width: 1, flexGrow: 1 }}>
        {graphComponent()}
      </Grid>
      <Grid item container direction="row" spacing={1} sx={{ mt: "auto" }}>
        <Grid xs={12} md={8} item>
          {codeInputComponent()}
        </Grid>
        <Grid xs={12} md={4} item>
          {detailsComponent()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
