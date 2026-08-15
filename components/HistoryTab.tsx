'use client';

import { useState } from 'react';
import { historyData } from '@/data/history';

function severityBadgeClass(severity: string): string {
  if (severity === 'Crítico' || severity === 'Alto') return 'danger';
  if (severity === 'Médio') return 'warning text-dark';
  return 'success';
}

function severityBorderClass(severity: string): string {
  if (severity === 'Crítico' || severity === 'Alto') return 'text-danger border-danger';
  if (severity === 'Médio') return 'text-warning border-warning';
  return 'text-success border-success';
}

export default function HistoryTab() {
  const [search, setSearch] = useState('');

  const filtered = historyData.filter((h) =>
    h.repo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <h4 className="mb-1 fw-bold">Histórico de Análises</h4>
      <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
        Visualize análises anteriores realizadas pela plataforma.
      </p>

      <div className="input-group mb-3" style={{ maxWidth: '360px' }}>
        <span className="input-group-text" style={{ borderRight: 0 }}>
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar repositório..."
          style={{ borderLeft: 0 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.map((h, idx) => (
        <div
          className="history-item d-flex align-items-center justify-content-between flex-wrap gap-2"
          key={idx}
        >
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-github" style={{ fontSize: '18px', color: '#6c5ce7' }}></i>
            <div>
              <div className="fw-semibold" style={{ fontSize: '14px' }}>{h.repo}</div>
              <div className="text-secondary" style={{ fontSize: '12px' }}>
                <i className="bi bi-calendar3 me-1"></i>{h.date} · {h.time}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="badge badge-agent"><i className="bi bi-robot me-1"></i>{h.agents} agentes</span>
            <span className={`badge bg-${severityBadgeClass(h.severity)}`}>{h.issues} issues</span>
            <span className={`badge bg-opacity-25 border ${severityBorderClass(h.severity)}`}>
              {h.severity}
            </span>
            <button className="btn btn-outline-primary btn-sm"><i className="bi bi-eye"></i></button>
          </div>
        </div>
      ))}
    </div>
  );
}