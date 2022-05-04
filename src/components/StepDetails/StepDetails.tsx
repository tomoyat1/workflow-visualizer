import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import Box from "@mui/material/Box";

interface StepArgs {
  [key: string]: string;
}

interface StepDetailsProps {
  name: string;
  type: string;
  args: StepArgs;
}

const StepDetails: React.FC<StepDetailsProps> = ({ name, type, args }) => {
  return (
    <Card>
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
};

export default StepDetails;
