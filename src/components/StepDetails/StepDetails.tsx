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
  step?: {
    name: string;
    type: string;
    args: StepArgs;
  };
}

const details = (name: string, type: string, args: StepArgs) => (
  <React.Fragment>
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" component="div">
        {name}
      </Typography>
      <Typography variant="subtitle1" component="div">
        {type}
      </Typography>
    </Box>
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
  </React.Fragment>
);

const noDetails = () => (
  <Alert severity="info">Click on a step to show its details!</Alert>
);

const StepDetails: React.FC<StepDetailsProps> = ({ step }) => {
  return (
    <Box sx={{ p: 1 }}>
      {step !== undefined
        ? details(step.name, step.type, step.args)
        : noDetails()}
    </Box>
  );
};

export default StepDetails;
