import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import { Alert, Card, Drawer, Grid } from "@mui/material";
import StepGraph, { Steps } from "./components/StepGraph/StepGraph";
import CodeInput from "./components/CodeInput/CodeInput";
import yaml from "js-yaml";
import * as z from "zod";
import { ZodError } from "zod";
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
  const { height, width } = useWindowDimensions();
  const drawerWidth = width / 4;
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

  const graphComponent = () =>
    !invalid ? (
      <StepGraph steps={steps} onNodeClick={onNodeClick} />
    ) : (
      <Alert severity="error">{`Invalid YAML: ${JSON.stringify(
        parseError?.issues
      )}`}</Alert>
    );

  const codeInputComponent = () => (
    <CodeInput invalid={invalid} value={code} updateCode={updateCode} />
  );

  const detailsComponent = () => (
    <Card sx={{ height: 1 }}>
      <StepDetails
        step={
          steps[selectedStep] !== undefined
            ? {
                name: selectedStep,
                ...steps[selectedStep],
              }
            : undefined
        }
      />
    </Card>
  );

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        spacing={1}
        sx={{
          p: 1,
          height: height,
          width: width - drawerWidth,
        }}
      >
        <Grid item sx={{ flexGrow: 1 }}>
          {graphComponent()}
        </Grid>
        <Grid item container direction="row" spacing={1} sx={{ mt: "auto" }}>
          <Grid xs={12} md={12} item>
            {codeInputComponent()}
          </Grid>
        </Grid>
      </Grid>
      <Drawer
        anchor="right"
        variant="permanent"
        sx={{
          flexShrink: 0,
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {detailsComponent()}
      </Drawer>
    </React.Fragment>
  );
};

export default App;
