import React from 'react';

import StepNode from './StepNode';
import {ComponentMeta, ComponentStoryObj} from "@storybook/react";

export default {component: StepNode} as ComponentMeta<typeof StepNode>

export const Default: ComponentStoryObj<typeof StepNode> = {
    args: {
        name: "deploy to prod",
        type: "deploy-manifest",
    }
}
