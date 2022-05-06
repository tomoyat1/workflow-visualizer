import React from "react";
import {
  Alert,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StepArgs } from "../StepGraph/StepGraph";

interface StepDetailsProps {
  step:
    | {
        name: string;
        type: string;
        args: StepArgs;
      }
    | undefined;
}

const details = (name: string, type: string, args: StepArgs) => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h5">{name}</Typography>
    <Typography variant="subtitle1">{type}</Typography>
    <TableContainer component="div">
      <Table sx={{ minWidth: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Parameter</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(args).map((k) => (
            <TableRow
              key={k}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{k}</TableCell>
              <TableCell>{args[k]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

const noDetails = () => (
  <Box sx={{ p: 1 }}>
    <Alert severity="info">Click on a step to show its details!</Alert>
  </Box>
);

const StepDetails: React.FC<StepDetailsProps> = ({ step }) => {
  return step !== undefined
    ? details(step.name, step.type, step.args)
    : noDetails();
};

export default StepDetails;
