import React from "react";

import StepDetails from "./StepDetails";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default { component: StepDetails } as ComponentMeta<typeof StepDetails>;

export const Default: ComponentStoryObj<typeof StepDetails> = {
  args: {
    step: {
      name: "deploy-main",
      type: "deploy-manifest",
      args: {
        cluster: "my-cluster",
        environment: "production",
      },
    },
  },
};
