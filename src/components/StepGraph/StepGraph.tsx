import React, { useLayoutEffect, useState } from "react";
import { Graph as VGraph } from "@visx/network";
import ELK, { ElkNode } from "elkjs/lib/elk-api";
import StepNodeLink from "../StepNodeLink/StepNodeLink";
import { ElkExtendedEdge } from "elkjs";
import StepNode from "../StepNode/StepNode";
import { Box } from "@mui/material";
import _ from "lodash";

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

export interface StepArgs {
  [key: string]: string;
}

export interface Step {
  type: string;
  after: string[];
  args: StepArgs;
}

export interface Steps {
  [key: string]: Step;
}

export interface StepGraphProps {
  steps: Steps;
  onNodeClick: (name: string) => void;
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

interface EdgeMatrix {
  [key: string]: {
    [key: string]: boolean;
  };
}

const toEdgeMatrix = (steps: Steps): EdgeMatrix => {
  let mr: EdgeMatrix = {};
  for (let [to, v] of Object.entries(steps)) {
    mr[to] = {};
    for (let from in steps) {
      mr[to][from] = v.after.includes(from);
    }
  }
  return mr;
};

const mul = (m1: EdgeMatrix, m2: EdgeMatrix): EdgeMatrix => {
  let mr: EdgeMatrix = {};
  for (let [to, v] of Object.entries(m1)) {
    mr[to] = {};
    for (let from in v) {
      let a = false;
      for (let k in v) {
        a ||= m1[to][k] && m2[k][from];
      }
      mr[to][from] = a;
    }
  }
  return mr;
};

const exp = (m: EdgeMatrix, n: number): EdgeMatrix => {
  // Only supports n >= 2
  let r: EdgeMatrix = _.cloneDeep(m);
  for (let i = 1; i < n; i++) {
    r = mul(r, m);
  }
  return r;
};

const xor = (m1: EdgeMatrix, m2: EdgeMatrix): EdgeMatrix => {
  let r: EdgeMatrix = _.cloneDeep(m1);
  for (let [to, v] of Object.entries(r)) {
    r[to] = {};
    for (let from in v) {
      r[to][from] = m1[to][from] ? !m2[to][from] : m2[to][from]; // Logical XOR
    }
  }
  return r;
};

const isZero = (m: EdgeMatrix): boolean => {
  let zero = xor(m, m); // XOR with self always gives zero.
  return _.isEqual(m, zero);
};

const removeShortEdges = (steps: Steps): Steps => {
  const mat = toEdgeMatrix(steps);
  let i = 2;
  let smplMat = _.cloneDeep(mat);
  while (true) {
    const nHop = exp(mat, i);
    if (isZero(nHop)) {
      break;
    }
    for (let [to, v] of Object.entries(nHop)) {
      for (let from in v) {
        if (nHop[to][from]) {
          smplMat[to][from] = false;
        }
      }
    }
    i++;
  }
  let result = _.cloneDeep(steps);
  for (let [to, v] of Object.entries(result)) {
    v.after = v.after.filter((a) => smplMat[to][a]);
  }
  return result;
};

const sanitize = (steps: Steps): Steps => {
  const results = _.cloneDeep(steps);
  for (let s in results) {
    results[s].after = results[s].after.filter((a) => a in steps && a !== s);
  }
  return results;
};

const toNodesAndEdges = async (
  steps: Steps,
  nodeWidth: number,
  nodeHeight: number
): Promise<Graph> => {
  steps = sanitize(steps);
  steps = removeShortEdges(steps);
  const tmpNode = {
    id: "root",
    layoutOptions: {},
    children: [],
    edges: [],
  } as ExtendedNode;
  const details: Details = {};
  for (let k in steps) {
    // @ts-ignore
    tmpNode.children.push({ id: k, width: nodeWidth, height: nodeHeight });
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
  return {
    links: calculated.edges,
    nodes: calculated.children,
    width: calculated.width,
    height: calculated.height,
    details: details,
  } as Graph;
};

const StepGraph: React.FC<StepGraphProps> = ({ steps, onNodeClick }) => {
  const [nodeWidth, nodeHeight] = [210, 105];
  const [graph, updateGraph] = useState<Graph>({
    links: [],
    nodes: [],
    width: 0,
    height: 0,
    details: {},
  });
  useLayoutEffect(() => {
    toNodesAndEdges(steps, nodeWidth, nodeHeight).then((g) => {
      updateGraph(g);
    });
  }, [steps, nodeWidth, nodeHeight]);
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick("");
      }}
    >
      <svg
        className="graph"
        width={graph.width}
        height={graph.height}
        viewBox={`0 0 ${graph.width} ${graph.height}`}
        preserveAspectRatio="xMidYMin meet"
      >
        <VGraph
          nodeComponent={(c) => (
            <StepNode
              onNodeClick={onNodeClick}
              name={c.node.id}
              type={graph.details[c.node.id].type}
            />
          )}
          linkComponent={StepNodeLink}
          graph={graph}
        />
      </svg>
    </Box>
  );
};

export default StepGraph;
