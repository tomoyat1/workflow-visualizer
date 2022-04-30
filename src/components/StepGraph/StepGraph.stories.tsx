import React from 'react';

import StepGraph from './StepGraph';
import {ComponentMeta, ComponentStoryObj} from "@storybook/react";

export default {component: StepGraph} as ComponentMeta<typeof StepGraph>

export const Default: ComponentStoryObj<typeof StepGraph> = {
    args: {
        steps: {
            "migrate-db": { after: [], type: "run-job" },
            "deploy-canary": { after: ["migrate-db"], type: "deploy-manifest" },
            "deploy-baseline": { after: ["migrate-db"], type: "deploy-manifest" },
            "deploy-main": { after: ["deploy-baseline", "deploy-canary"], type: "deploy-manifest" },
            "webhook": { after: ["deploy-main"], type: "webhook" },
        }
    }
}
