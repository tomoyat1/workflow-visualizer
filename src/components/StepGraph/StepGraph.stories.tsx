import React from 'react';

import StepGraph from './StepGraph';
import {ComponentMeta, ComponentStoryObj} from "@storybook/react";

export default {component: StepGraph} as ComponentMeta<typeof StepGraph>

export const Default: ComponentStoryObj<typeof StepGraph> = {
    args: {
        steps: {
            "n1": { after: [] },
            "n2": { after: ["n1"] },
            "n3": { after: ["n1"] },
            "n4": { after: ["n2", "n3"] }
        }
    }
}
