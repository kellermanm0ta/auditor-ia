'use client';

import { useState } from 'react';
import type { Skill, SkillCreateInput, SkillInput } from '@/lib/types';

interface SkillModalProps {
  editingSkill: Skill | null;
  onClose: () => void;
  onSaved: (message: string) => void;
  createSkill: (input: SkillCreateInput) => Promise<Skill>;
  updateSkill: (id: string, input: SkillInput) => Promise<Skill>;
}

export default function SkillModal({ editingSkill, onClose, onSaved, createSkill, updateSkill }: SkillModalProps) {
  const [id, setId] = useState(editingSkill?.id ?? '');
  const [name, setName] = useState(editingSkill?.name ?? '');
  const [icon, setIcon] = useState(editingSkill?.icon ?? '');
  const [desc, setDesc] = useState(editingSkill?.desc ?? '');
  const [prompt, setPrompt] = useState(editingSkill?.prompt ?? '');
  const [enabled, setEnabled] = useState(editingSkill?.enabled ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = editingSkill !== null;

  const valid = name.trim() && icon.trim() && desc.trim() && prompt.trim() && (isEditing || id.trim());

  const handleSubmit = async () => {
    if (!valid) return;
    setSubmitting(true);
    setError(null);
    try {
      const input: SkillInput = {
        name: name.trim(),
        icon: icon.trim(),
        desc: desc.trim(),
        prompt: prompt.trim(),
        enabled,
      };
      if (isEditing) {
        await updateSkill(editingSkill!.id, input);
        onSaved('Skill atualizada com sucesso!');
      } else {
        await createSkill({ id: id.trim(), ...input });
        onSaved('Skill criada com sucesso!');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar skill');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
      <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1055 }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isEditing ? 'Editar Skill' : 'Nova Skill'}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger py-2" style={{ fontSize: '13px' }}>{error}</div>
              )}
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Ex: analise-seguranca"
                    disabled={isEditing}
                  />
                  {isEditing && (
                    <div className="form-text">O ID não pode ser alterado.</div>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label d-flex align-items-center gap-2">
                    Ícone
                    {icon.trim() && <i className={`bi ${icon.trim()}`} style={{ color: '#6c5ce7' }}></i>}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="bi-shield-check"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Análise de Segurança"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Descrição</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Descreva o objetivo desta skill"
                  ></textarea>
                </div>
                <div className="col-12">
                  <label className="form-label">Prompt</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Instruções enviadas ao agente"
                  ></textarea>
                </div>
                <div className="col-12">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="skill-enabled"
                      checked={enabled}
                      onChange={(e) => setEnabled(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="skill-enabled">
                      Habilitada por padrão
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!valid || submitting}
              >
                {submitting ? (
                  <><span className="spinner-border spinner-border-sm me-1"></span>Salvando...</>
                ) : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}