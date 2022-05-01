import React, { useLayoutEffect, useState } from "react";
import { DefaultLink, DefaultNode, Graph as VGraph } from "@visx/network";
import ELK, { ElkEdge, ElkLayoutArguments, ElkNode } from "elkjs/lib/elk-api";
import StepNodeLink from "../StepNodeLink/StepNodeLink";
import { ElkExtendedEdge } from "elkjs";
import StepNode from "../StepNode/StepNode";

const elk = new ELK({
  workerFactory: function (url) {
    const { Worker } = require("elkjs/lib/elk-worker.js");
    return new Worker(url);
  },
  defaultLayoutOptions: {
    "org.eclipse.elk.algorithm": "org.eclipse.elk.layered",
    "org.eclipse.elk.direction": "RIGHT",
    "org.eclipse.elk.edgeRouting": "ORTHOGONAL",
    "org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
    "org.eclipse.elk.spacing.nodeNode": "40",
    "org.eclipse.elk.spacing.nodeNodeBetweenLayers": "40",
  },
});

export interface StepGraphProps {
  steps: Steps;
}

export interface Steps {
  [key: string]: {
    type: string;
    after: string[];
  };
}

interface Detail {
  type: string;
}

interface Details {
  [key: string]: Detail;
}

interface ExtendedNode extends ElkNode {
  edges: ElkExtendedEdge[];
}

interface Graph {
  links: ElkExtendedEdge[];
  nodes: ElkNode[];
  width: number;
  height: number;
  details: Details;
}

const toNodesAndEdges = async (
  steps: Steps,
  width: number,
  height: number
): Promise<Graph> => {
  const tmpNode = {
    id: "root",
    layoutOptions: {},
    children: [],
    edges: [],
  } as ExtendedNode;
  const details: Details = {};
  for (let k in steps) {
    // @ts-ignore
    tmpNode.children.push({ id: k, width: width, height: height });
    details[k] = { type: steps[k].type };
    for (let a in steps[k].after) {
      // @ts-ignore
      tmpNode.edges.push({
        id: `${k}To${a}`,
        sources: [steps[k].after[a]],
        targets: [k],
      });
    }
  }

  const calculated = await elk.layout(tmpNode);
  console.log(calculated);
  return {
    links: calculated.edges,
    nodes: calculated.children,
    width: calculated.width,
    height: calculated.height,
    details: details,
  } as Graph;
};

const StepGraph: React.FC<StepGraphProps> = ({ steps }) => {
  const [graph, updateGraph] = useState<Graph>({
    links: [],
    nodes: [],
    width: 0,
    height: 0,
    details: {},
  });
  useLayoutEffect(() => {
    toNodesAndEdges(steps, 210, 105).then((g) => {
      console.log(g);
      updateGraph(g);
    });
  }, [steps]);
  return (
    <svg
      className="graph"
      width={graph.width}
      height={graph.height}
      viewBox={`0 0 ${graph.width} ${graph.height}`}
      preserveAspectRatio="xMidYMin meet"
    >
      <VGraph
        nodeComponent={(c) => (
          <foreignObject width="210" height="105">
            <StepNode name={c.node.id} type={graph.details[c.node.id].type} />
          </foreignObject>
        )}
        linkComponent={StepNodeLink}
        graph={graph}
      />
    </svg>
    // <div>foo</div>
  );
};

export default StepGraph;
