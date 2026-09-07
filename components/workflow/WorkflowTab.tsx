'use client';

import { ReactFlowProvider } from '@xyflow/react';
import AsyncWrapper from '../shared/AsyncWrapper';
import { useWorkflowAgents } from '@/hooks/useWorkflowAgents';
import WorkflowFlow from './WorkflowFlow';

export default function WorkflowTab() {
  const { data: agents, error, isLoading } = useWorkflowAgents();

  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <h4 className="mb-1 fw-bold">Orquestração de Agentes</h4>
      <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
        Defina a ordem de execução dos agentes e como eles se encadeiam.
      </p>

      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <span>Pipeline Atual</span>
          <button className="btn btn-outline-primary btn-sm">
            <i className="bi bi-plus-lg"></i> Adicionar Agente
          </button>
        </div>
        <div className="card-body" style={{ height: '500px', padding: 0 }}>
          <AsyncWrapper
            loading={isLoading}
            error={error?.message ?? null}
            loadingMessage="Carregando agentes..."
          >
            <ReactFlowProvider>
              <WorkflowFlow agents={agents ?? []} />
            </ReactFlowProvider>
          </AsyncWrapper>
        </div>
      </div>
    </div>
  );
}