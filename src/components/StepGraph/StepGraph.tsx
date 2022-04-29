import React, {useLayoutEffect, useState} from 'react';
import { Graph } from '@visx/network';
import ELK, {ElkLayoutArguments, ElkNode} from 'elkjs/lib/elk-api';
const elk = new ELK({
    workerFactory: function(url) {
        const { Worker } = require('elkjs/lib/elk-worker.js')
        return new Worker(url)
    }
})

import StepNode from '../StepNode/StepNode';


export interface StepGraphProps {
    steps: Steps
}

interface Steps {
    [key: string]: {
        after: string[],
    }
}

const toNodesAndEdges = async (steps: Steps, width: number, height: number): Promise<ElkNode> => {
    const tmpNode = {
        id: "root",
        layoutOptions: {},
        children: [],
        edges: [],
    } as ElkNode;
    for (let k in steps) {
        // @ts-ignore
        tmpNode.children.push({id: k, width: 200, height: 75})
        for (let a in steps[k].after) {
            // @ts-ignore
            tmpNode.edges.push({id: `${k}To${a}`, sources: [k], targets: [steps[k].after[a]]})
        }
    }

    // TODO: calculate positioning using Elk
    return elk.layout(tmpNode)
};

const StepGraph: React.FC<StepGraphProps> = ({steps}) => {
    const [elkGraph, updateElkGraph] = useState<ElkNode>()
    useLayoutEffect(() => {
        toNodesAndEdges(steps, 200, 75)
            .then((g) => {
                updateElkGraph(g)
                console.log(g)
            });
    }, [steps])
    return (
        <Graph
            nodeComponent={comp => {
            <StepNode type="placeholder" name={comp.}/>
        }}
            graph={elkGraph}
        />
    );
}

export default StepGraph;
