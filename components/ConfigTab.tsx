'use client';

import AsyncWrapper from './AsyncWrapper';
import { useOutputFormats } from '@/hooks/useOutputFormats';
import { useSkills } from '@/hooks/useSkills';

export default function ConfigTab() {
  const { data: outputFormats, error: outputError, isLoading: outputLoading } = useOutputFormats();
  const { data: skills, error: skillsError, isLoading: skillsLoading } = useSkills();

  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <h4 className="mb-1 fw-bold">Configurações</h4>
      <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
        Ajuste o comportamento geral da plataforma.
      </p>

      <div className="card mb-3">
        <div className="card-header">Execução dos Agentes</div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div className="fw-semibold">Modo de Execução</div>
              <div className="text-secondary" style={{ fontSize: '13px' }}>
                Agentes rodam em paralelo ou em série?
              </div>
            </div>
            <div className="d-flex gap-2">
              <input type="radio" className="btn-check" name="execMode" id="modeParallel" value="parallel" defaultChecked />
              <label className="btn btn-outline-primary btn-sm" htmlFor="modeParallel">
                <i className="bi bi-arrow-up-right"></i> Paralelo
              </label>
              <input type="radio" className="btn-check" name="execMode" id="modeSerial" value="serial" />
              <label className="btn btn-outline-primary btn-sm" htmlFor="modeSerial">
                <i className="bi bi-arrow-right"></i> Série
              </label>
            </div>
          </div>
        </div>
      </div>

      <AsyncWrapper
        loading={outputLoading}
        error={outputError?.message ?? null}
        loadingMessage="Carregando formatos de saída..."
      >
        <div className="card mb-3">
          <div className="card-header">Formato de Saída</div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="fw-semibold">Formato padrão do relatório</div>
                <div className="text-secondary" style={{ fontSize: '13px' }}>
                  Como o resultado da análise deve ser apresentado.
                </div>
              </div>
              <select className="form-select form-select-sm w-auto" id="outputFormat" defaultValue="markdown">
                {(outputFormats ?? []).map((fmt) => (
                  <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </AsyncWrapper>

      <AsyncWrapper
        loading={skillsLoading}
        error={skillsError?.message ?? null}
        loadingMessage="Carregando skills..."
      >
        <div className="card">
          <div className="card-header">Skills Padrão</div>
          <div className="card-body">
            <div className="text-secondary" style={{ fontSize: '13px' }}>
              Skills que serão habilitadas por padrão em novas análises.
            </div>
            <div className="mt-3">
              {(skills ?? []).map((s) => (
                <div className="form-check form-check-inline" key={s.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`def-${s.id}`}
                    defaultChecked={s.enabled}
                  />
                  <label className="form-check-label" htmlFor={`def-${s.id}`} style={{ fontSize: '13px' }}>
                    {s.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AsyncWrapper>
    </div>
  );
}