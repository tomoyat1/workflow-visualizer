import React, {useEffect, useState} from 'react';
import { Graph } from '@visx/network';
import ELK, {ElkLayoutArguments, ElkNode} from 'elkjs/lib/elk-api'
const elk = new ELK({
    workerUrl: './elk-worker.min.js'
})


export interface StepGraphProps {
    steps: Steps
}

interface Steps {
    [key: string]: {
        after: [string],
    }
}

interface StepNode extends ElkNode {
    type: string
    name: string
}

const toNodesAndEdges = async (steps: Steps, width: number, height: number): Promise<StepNode> => {
    // TODO: convert Steps to ElkNode without positioning information.

    // TODO: calculate positioning using Elk
    let graph: ElkNode;

    return elk.layout(graph)
};

const StepGraph: React.FC<StepGraphProps> = ({steps}) => {
    const [elkGraph, updateElkGraph] = useState<ElkNode>()
    useEffect(() => {
        toNodesAndEdges(steps, 200, 75)
            .then((g) => {
                updateElkGraph(g)
            });
    })
    return (
        <Graph nodeComponent={comp => {
            <StepNode >
        }} />
    );
}

export default StepGraph;
