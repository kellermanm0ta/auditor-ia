'use client';

const workflowAgents = [
  'Análise de Segurança',
  'Análise de Arquitetura',
  'Code Smell',
  'Análise de Desempenho',
];

export default function WorkflowTab() {
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
        <div className="card-body">
          {workflowAgents.map((name, i) => (
            <div key={name}>
              <div className="workflow-node">
                <span className="node-index">{i + 1}</span>
                <div className="flex-grow-1">
                  <div className="fw-semibold">{name}</div>
                  <div className="text-secondary" style={{ fontSize: '12px' }}>
                    {i === 0 ? 'Início da pipeline' : 'Recebe saída do agente anterior'}
                  </div>
                </div>
                <div className="d-flex gap-1">
                  {i > 0 && (
                    <button className="btn btn-outline-primary btn-sm"><i className="bi bi-arrow-up"></i></button>
                  )}
                  {i < workflowAgents.length - 1 && (
                    <button className="btn btn-outline-primary btn-sm"><i className="bi bi-arrow-down"></i></button>
                  )}
                  <button className="btn btn-outline-danger btn-sm"><i className="bi bi-trash"></i></button>
                </div>
              </div>
              {i < workflowAgents.length - 1 && (
                <div className="workflow-connector"><i className="bi bi-arrow-down"></i></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}