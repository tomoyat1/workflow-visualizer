import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const { height } = useWindowDimensions();
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

  return (
    <Grid container>
      <Grid
        item
        xs={9}
        onClick={(e) => {
          e.stopPropagation();
          updateSelectedStep("");
        }}
      >
        <Box sx={{ p: 1 }}>
          <Box sx={{ height: graphHeight }}>
            {!invalid ? (
              <StepGraph steps={steps} onNodeClick={updateSelectedStep} />
            ) : (
              <Alert severity="error">{`Invalid YAML: ${JSON.stringify(
                parseError?.issues
              )}`}</Alert>
            )}
          </Box>
          <CodeInput
            invalid={invalid}
            value={code}
            updateCode={updateCode}
            ref={codeInputEl}
          />
        </Box>
      </Grid>
      <Grid item xs={3} sx={{ p: 1, display: "flex" }}>
        <StepDetails
          step={
            steps[selectedStep] !== undefined
              ? {
                  name: selectedStep,
                  ...steps[selectedStep],
                }
              : undefined
          }
          sx={{ flexGrow: 1 }}
        />
      </Grid>
    </Grid>
  );
};

export default App;
