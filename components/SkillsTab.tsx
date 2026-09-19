'use client';

import { useState } from 'react';
import type { Skill } from '@/lib/types';
import AsyncWrapper from './shared/AsyncWrapper';
import Toast from './shared/Toast';
import ConfirmModal from './shared/ConfirmModal';
import SkillModal from './SkillModal';
import { useSkills } from '@/hooks/useSkills';

export default function SkillsTab() {
  const { data: skills, error, isLoading, createSkill, updateSkill, deleteSkill, toggleSkill } = useSkills();
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<Skill | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const list = skills ?? [];

  const handleNew = () => {
    setEditingSkill(null);
    setShowModal(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setShowModal(true);
  };

  const handleDelete = (skill: Skill) => {
    setDeletingSkill(skill);
    setDeleteError(null);
  };

  const confirmDelete = async () => {
    if (!deletingSkill) return;
    try {
      await deleteSkill(deletingSkill.id);
      setDeletingSkill(null);
      setToast('Skill excluída com sucesso!');
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : 'Erro ao excluir skill');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingSkill(null);
  };

  const handleSaved = (message: string) => {
    setShowModal(false);
    setEditingSkill(null);
    setToast(message);
  };

  return (
    <div className="tab-pane fade show active" role="tabpanel">
      <Toast
        show={toast !== null}
        message={toast ?? ''}
        onClose={() => setToast(null)}
      />
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 className="mb-1 fw-bold">Skills dos Agentes</h4>
          <p className="text-secondary mb-0" style={{ fontSize: '14px' }}>
            Ative ou desative skills e refine os prompts utilizados na análise.
          </p>
        </div>
        <button className="btn btn-outline-primary btn-sm" onClick={handleNew}>
          <i className="bi bi-plus-lg"></i> Nova Skill
        </button>
      </div>

      <AsyncWrapper
        loading={isLoading}
        error={error?.message ?? null}
        loadingMessage="Carregando skills..."
      >
        {list.map((skill) => (
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
                      onChange={() => toggleSkill(skill)}
                    />
                  </div>
                </div>
                <p className="text-secondary mb-2" style={{ fontSize: '13px' }}>{skill.desc}</p>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(skill)}>
                    <i className="bi bi-pencil me-1"></i> Editar
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(skill)}>
                    <i className="bi bi-trash me-1"></i> Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </AsyncWrapper>

      {showModal && (
        <SkillModal
          key={editingSkill?.id ?? 'new'}
          editingSkill={editingSkill}
          onClose={handleClose}
          onSaved={handleSaved}
          createSkill={createSkill}
          updateSkill={updateSkill}
        />
      )}

      <ConfirmModal
        show={deletingSkill !== null}
        title="Excluir Skill"
        message={
          deleteError
            ? deleteError
            : `Deseja realmente excluir a skill "${deletingSkill?.name}"?`
        }
        confirmLabel={deleteError ? 'OK' : 'Excluir'}
        variant={deleteError ? 'primary' : 'danger'}
        onConfirm={deleteError ? () => { setDeletingSkill(null); setDeleteError(null); } : confirmDelete}
        onCancel={() => { setDeletingSkill(null); setDeleteError(null); }}
      />
    </div>
  );
}