import React from "react";

import StepGraph from "./StepGraph";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default { component: StepGraph } as ComponentMeta<typeof StepGraph>;

export const Default: ComponentStoryObj<typeof StepGraph> = {
  args: {
    steps: {
      "migrate-db": { after: [], type: "run-job", args: {} },
      "deploy-canary": {
        after: ["migrate-db"],
        type: "deploy-manifest",
        args: {},
      },
      "deploy-baseline": {
        after: ["migrate-db"],
        type: "deploy-manifest",
        args: {},
      },
      "deploy-main": {
        after: ["deploy-baseline", "deploy-canary"],
        type: "deploy-manifest",
        args: {},
      },
      webhook: { after: ["deploy-main"], type: "webhook", args: {} },
    },
  },
};
