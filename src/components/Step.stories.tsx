import React from 'react';

import Step, {StepProps} from './Step';
import {ComponentMeta, ComponentStoryObj} from "@storybook/react";

export default {component: Step} as ComponentMeta<typeof Step>

export const Default: ComponentStoryObj<typeof Step> = {
    args: {
        task: {
            id: '1',
            title: 'Test Step',
            state: 'TASK_INBOX',
            updatedAt: new Date(2021, 0, 1, 9, 0),
        }
    }
}

export const Pinned: ComponentStoryObj<typeof Step> = {
    args: {
        task: {
            ...Default.args.task,
            state: 'TASK_PINNED',
        }
    }
}

export const Archived: ComponentStoryObj<typeof Step> = {
    args: {
        task: {
            ...Default.args.task,
            state: 'TASK_ARCHIVED',
        }
    }
}
