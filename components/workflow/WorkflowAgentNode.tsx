'use client';

import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { Node } from '@xyflow/react';

export type WorkflowAgentNode = Node<{ nome: string; stepNumber: number; color: string }, 'workflowAgent'>;

export default function WorkflowAgentNode({ data }: NodeProps<WorkflowAgentNode>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 14px',
          borderRadius: '8px',
          border: `1px solid ${data.color}`,
          background: 'var(--bg-elevated, #0f0f1a)',
          minWidth: '186px',
          height: '44px',
        }}
      >
        <span
          style={{
            width: '26px',
            height: '26px',
            background: data.color,
            color: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {data.stepNumber}
        </span>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-primary, #fff)',
            whiteSpace: 'nowrap',
          }}
        >
          {data.nome}
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}