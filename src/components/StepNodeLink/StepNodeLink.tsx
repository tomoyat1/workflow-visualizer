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
  path.lineTo(targetX - 1, targetY);

  return (
    <path
      strokeWidth={2}
      fill="none"
      stroke="#000000"
      strokeOpacity={1}
      d={path.toString()}
    />
  );
};

export default NodeLink;
