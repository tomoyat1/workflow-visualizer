import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Alert,
  SxProps,
  Theme,
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
  sx?: SxProps<Theme>;
}

const details = (
  name: string,
  type: string,
  args: StepArgs,
  sx: SxProps<Theme>
) => (
  <Card sx={[...(Array.isArray(sx) ? sx : [sx])]}>
    <CardHeader title={name} subheader={type} />
    <CardContent>
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
    </CardContent>
  </Card>
);

const noDetails = (sx: SxProps<Theme>) => (
  <Card sx={[...(Array.isArray(sx) ? sx : [sx])]}>
    <CardContent>
      <Alert severity="info">Click on a step to show its details!</Alert>
    </CardContent>
  </Card>
);

const StepDetails: React.FC<StepDetailsProps> = ({ step, sx = [] }) => {
  return step !== undefined
    ? details(step.name, step.type, step.args, sx)
    : noDetails(sx);
};

export default StepDetails;
