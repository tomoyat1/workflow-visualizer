import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import { Container } from "@mui/material";
import StepGraph, { Steps } from "./components/StepGraph/StepGraph";
import CodeInput from "./components/CodeInput/CodeInput";
import yaml from "js-yaml";

const App: React.FC = () => {
  const [invalid, updateInvalid] = useState(false);
  const [code, updateCode] = useState("");
  const [steps, updateSteps] = useState<Steps>();

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      let parsed: Steps;
      try {
        parsed = yaml.load(code) as Steps;
        updateInvalid(false);
      } catch (e) {
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
      {steps !== undefined ? (
        <StepGraph steps={steps}></StepGraph>
      ) : (
        <div>No graph data!</div>
      )}
      <CodeInput invalid={invalid} value={code} updateCode={updateCode} />
    </Container>
  );
};

export default App;
