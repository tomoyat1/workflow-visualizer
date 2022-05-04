import React from "react";
import { path as d3Path } from "d3-path";
import { ElkExtendedEdge } from "elkjs";

interface NodeLinkProp {
  link: ElkExtendedEdge;
}

const NodeLink: React.FC<NodeLinkProp> = ({ link }) => {
  const sections = link.sections[0];
  const path = d3Path();

  const { x: startX, y: startY } = sections.startPoint;
  const { x: targetX, y: targetY } = sections.endPoint;

  const percent = 0.5;
  path.moveTo(startX, startY);
  path.lineTo(startX + (targetX - startX) * percent, startY);
  path.lineTo(startX + (targetX - startX) * percent, targetY);
  path.lineTo(targetX - 2, targetY);

  return (
    <g>
      <defs>
        <marker
          id="markerArrow"
          markerWidth="13"
          markerHeight="13"
          refX="3"
          refY="6"
          orient="auto"
        >
          <path d="M2,2 L2,10 L5,6 L2,2" />
        </marker>
      </defs>
      <path
        strokeWidth={2}
        fill="none"
        stroke="#000000"
        strokeOpacity={1}
        d={path.toString()}
        markerEnd="url(#markerArrow)"
      />
    </g>
  );
};

export default NodeLink;
