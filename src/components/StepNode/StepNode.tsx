import React, {
  MouseEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Card } from "@mui/material";

import Box from "@mui/material/Box";

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
          ":hover": {
            cursor: "pointer",
          },
        }}
        ref={cardEl}
        onClick={onClick}
        variant="outlined"
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Box
            sx={{
              fontSize: "h6.fontSize",
            }}
          >
            {name}
          </Box>
          <Box sx={{ typography: "subtitle1" }}>{type}</Box>
        </Box>
      </Card>
    </foreignObject>
  );
};

export default StepNode;
