import React, { useState } from "react";
import "./App.css";
import { Container } from "@mui/material";
import StepGraph, { Steps } from "./components/StepGraph/StepGraph";
import CodeInput from "./components/CodeInput/CodeInput";
import yaml from "js-yaml";

const App: React.FC = () => {
  const [steps, updateSteps] = useState<Steps>();
  const codeUpdateCallback = (code: string) => {
    // TODO: parse steps
    let parsed: Steps;
    try {
      parsed = yaml.load(code) as Steps; // TODO: validate with zod
    } catch (e) {
      console.log(e);
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

      <CodeInput updateCodeCallback={codeUpdateCallback} />
    </Container>
  );
};

export default App;
