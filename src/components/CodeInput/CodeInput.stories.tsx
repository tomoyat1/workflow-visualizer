import React from "react";

import CodeInput from "./CodeInput";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default { component: CodeInput } as ComponentMeta<typeof CodeInput>;

export const Default: ComponentStoryObj<typeof CodeInput> = {
  args: {
    invalid: true,
    value: "foo",
    updateCode: (c: string) => {
      console.log(c);
    },
  },
};
