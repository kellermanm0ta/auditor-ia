'use client';

import { useState } from 'react';
import { skillsData, type Skill } from '@/data/skills';

export default function SkillsTab() {
  const [skills, setSkills] = useState<Skill[]>(skillsData);

  const toggleSkill = (id: string) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 className="mb-1 fw-bold">Skills dos Agentes</h4>
          <p className="text-secondary mb-0" style={{ fontSize: '14px' }}>
            Ative ou desative skills e refine os prompts utilizados na análise.
          </p>
        </div>
        <button className="btn btn-outline-primary btn-sm">
          <i className="bi bi-plus-lg"></i> Nova Skill
        </button>
      </div>

      {skills.map((skill) => (
        <div className="card mb-2" key={skill.id}>
          <div className="card-body">
            <div className="d-flex align-items-start gap-3">
              <i className={`bi ${skill.icon}`} style={{ fontSize: '20px', color: '#6c5ce7', marginTop: '2px' }}></i>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fw-semibold">{skill.name}</span>
                    <span className="badge badge-agent ms-2 small">{skill.id}</span>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={skill.enabled}
                      onChange={() => toggleSkill(skill.id)}
                    />
                  </div>
                </div>
                <p className="text-secondary mb-2" style={{ fontSize: '13px' }}>{skill.desc}</p>
                <div className="input-group input-group-sm">
                  <span className="input-group-text" style={{ fontSize: '11px' }}>
                    Prompt
                  </span>
                  <input type="text" className="form-control form-control-sm" defaultValue={skill.prompt} style={{ fontSize: '12px' }} />
                  <button className="btn btn-outline-primary btn-sm"><i className="bi bi-pencil"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}