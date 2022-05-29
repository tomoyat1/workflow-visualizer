import React, {
  MouseEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface StepNodeProps {
  name: string;
  type: string;
  onNodeClick: (name: string) => void;
}

const StepNode: React.FC<StepNodeProps> = ({ name, type, onNodeClick }) => {
  const [[cardWidth, cardHeight], updateCardSize] = useState([0, 0]);
  const cardEl = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (cardEl.current != null) {
      updateCardSize([cardEl.current.clientWidth, cardEl.current.clientHeight]);
    }
  }, [cardEl]);

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onNodeClick(name);
  };
  return (
    <foreignObject width={cardWidth + 10} height={cardHeight + 10}>
      <Card
        sx={{
          width: 200,
          ml: "5px",
          mt: "5px",
        }}
        ref={cardEl}
        variant="outlined"
      >
        <CardActionArea>
          <CardContent
            onClick={onClick}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {type}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions onClick={(e) => e.stopPropagation()}>
          <IconButton size="medium">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </CardActions>
      </Card>
    </foreignObject>
  );
};

export default StepNode;
