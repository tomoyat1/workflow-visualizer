import React, { useState } from "react";
import "./App.css";
import { Container } from "@mui/material";
import StepGraph, { Steps } from "./components/StepGraph/StepGraph";
import CodeInput from "./components/CodeInput/CodeInput";
import yaml from "js-yaml";

const App: React.FC = () => {
  const [invalid, updateInvalid] = useState(false);
  const [steps, updateSteps] = useState<Steps>();

  const codeUpdateCallback = (code: string) => {
    let parsed: Steps;
    try {
      parsed = yaml.load(code) as Steps; // TODO: validate with zod
      updateInvalid(false);
    } catch (e) {
      console.log(e);
      updateInvalid(true);
      parsed = {};
    }

    updateSteps(parsed);
  };

  return (
    <Container>
      {steps !== undefined ? (
        <StepGraph steps={steps}></StepGraph>
      ) : (
        <div>No graph data!</div>
      )}

      <CodeInput invalid={invalid} updateCodeCallback={codeUpdateCallback} />
    </Container>
  );
};

export default App;
