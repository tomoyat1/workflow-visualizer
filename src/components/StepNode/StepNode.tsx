import React from 'react';
import {Card} from '@mui/material'

import Box from "@mui/material/Box";
import { positions } from '@mui/system';

export interface StepNodeProps {
    name: string
    type: string
}

const StepNode: React.FC<StepNodeProps> = ({name, type}) => {
    return (
        <Card sx={{
            width: 200,
        }}>
            <Box sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: {xs: 'center', md: 'flex-start'},
            }}>
                <Box sx={{
                    fontSize: 'h6.fontSize',
                }}>
                    {name}
                </Box>
                <Box sx={{typography: 'subtitle1'}}>
                    {type}
                </Box>
            </Box>
        </Card>
    );
}

export default StepNode;
