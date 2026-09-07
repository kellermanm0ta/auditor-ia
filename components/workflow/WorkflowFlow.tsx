'use client';

import { useMemo, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
} from '@xyflow/react';
import type { WorkflowAgent } from '@/lib/types';
import { buildFlow } from '@/lib/workflowLayout';
import WorkflowAgentNode from './WorkflowAgentNode';

const nodeTypes = { workflowAgent: WorkflowAgentNode };

interface FlowProps {
  agents: WorkflowAgent[];
}

export default function WorkflowFlow({ agents }: FlowProps) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildFlow(agents),
    [agents],
  );
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    requestAnimationFrame(() => fitView({ padding: 0.2, duration: 300 }));
  }, [initialNodes, fitView]);

  return (
    <div style={{ width: '100%', height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#6c5ce7' },
        }}
      />
    </div>
  );
}