import React, { useEffect } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import './ProjectModal.css';

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  purpose: string;
  blueprint: string;
  features: string[];
  morroNote: string;
  actionText?: string;
  actionHref?: string;
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
  onAction?: (actionHref: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onAction }) => {
  useEffect(() => {
    if (project) {
      sound.playChime(640);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-proj-title">
      <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="project-modal-close"
          onClick={() => {
            sound.playChime(420);
            onClose();
          }}
          aria-label="Close Case Study"
        >
          <X size={20} />
        </button>

        <div className="modal-top-tag">
          <span className="modal-badge">{project.badge}</span>
        </div>

        <div className="modal-header-section">
          <div className="modal-icon-bubble">
            <span className="modal-emoji">{project.icon}</span>
          </div>
          <div>
            <h3 id="modal-proj-title">{project.title}</h3>
            <h4 className="modal-subtitle">{project.subtitle}</h4>
          </div>
        </div>

        <div className="modal-body-content">
          <div className="modal-info-block">
            <h5>Core Purpose</h5>
            <p>{project.purpose}</p>
          </div>

          <div className="modal-info-block">
            <h5>How Morro Engineered It</h5>
            <p>{project.blueprint}</p>
          </div>

          <div className="modal-features-list">
            <h5>Key Architectural Highlights</h5>
            <ul>
              {project.features.map((feat, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="feat-check" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-morro-quote">
            <Sparkles size={16} className="text-gold" />
            <p>"{project.morroNote}"</p>
          </div>
        </div>

        <div className="modal-footer-actions">
          {project.actionHref && (
            <button
              type="button"
              className="modal-action-btn"
              onClick={() => {
                if (onAction && project.actionHref) {
                  onAction(project.actionHref);
                }
                onClose();
              }}
            >
              <span>{project.actionText || "Explore Invention"}</span>
            </button>
          )}

          <button
            type="button"
            className="modal-dismiss-btn"
            onClick={onClose}
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
