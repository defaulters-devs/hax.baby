import React, { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { sound } from '../../utils/audio';
import { ProjectModal, type ProjectDetail } from './ProjectModal';
import { SectionSparkleCrown } from './CuteSparkleElements';
import './PortfolioProjects.css';

export const PortfolioProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const projects: (ProjectDetail & { num: string; previewType: 'catcher' | 'timer' | 'constellation' })[] = [
    {
      id: 'catcher',
      num: '01',
      title: 'The Maybe Catcher',
      subtitle: 'Postponement Energy Transmuter',
      badge: 'Flagship Invention',
      icon: '🎒',
      purpose: 'Detects the cloudy sigh of hesitation that people emit when postponing important work, and dissolves the underlying guilt before suggesting an easy first step.',
      blueprint: 'Constructed from celestial stardust weaves that absorb negative signals into a warm golden pouch, neutralizing shame with pure empathy.',
      features: [
        'Non-judgmental intent capture',
        'Deterministic micro-step translator',
        'Empathetic encouragement messaging',
      ],
      morroNote: 'When you take away the guilt, people naturally want to move forward. That is the magic of the Catcher.',
      previewType: 'catcher',
      actionText: 'Experience the Ritual',
      actionHref: '#ritual',
    },
    {
      id: 'sprint',
      num: '02',
      title: 'Star Sprint Engine',
      subtitle: 'Lightweight Focus Chronometer',
      badge: 'Focus Instrument',
      icon: '⏱️',
      purpose: 'A gentle timekeeping concept designed around short, achievable sprints (5, 15, and 25 minutes) to break through inertia without burnout.',
      blueprint: 'Calibrated to human cognitive rhythms using celestial harmonic chimes instead of harsh alarms. Every tick pulses with calming starlight.',
      features: [
        'Short 5-minute initial momentum baseline',
        'Web Audio ambient chime intervals',
        'Distraction-free progress dial geometry',
      ],
      morroNote: 'You do not need an entire afternoon. Five honest minutes of attention will move mountains.',
      previewType: 'timer',
      actionText: 'View Case Study',
    },
    {
      id: 'constellation',
      num: '03',
      title: 'The Done Constellation',
      subtitle: 'Milestone Sky Observatory',
      badge: 'Celestial Archive',
      icon: '🌌',
      purpose: 'A visual milestone system that translates completed small actions into permanent glowing star nodes, weaving a personal constellation of effort in the night sky.',
      blueprint: 'Charts geometric coordinate lines between finished deeds, turning abstract completed effort into tangible, sparkling constellations.',
      features: [
        'Coordinate mapping of accomplished milestones',
        'Celebratory stardust illumination',
        'Encouraging retrospective memory',
      ],
      morroNote: 'Never measure how far you have left to go without first looking up to see how brightly your sky is already shining.',
      previewType: 'constellation',
      actionText: 'View Case Study',
    },
  ];

  const handleOpenModal = (project: ProjectDetail) => {
    sound.playSparkle();
    setSelectedProject(project);
  };

  const handleAction = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="portfolio-projects-section">
      <div className="container">
        <div className="section-header">
          <SectionSparkleCrown label="Star Inventions ✦ Works" />
          <div className="celestial-badge gold-badge">
            <Sparkles size={14} fill="#F59E0B" /> Inventions & Works
          </div>
          <h2>Morro's Inventions & Projects</h2>
          <p>
            Three original creations engineered by the Little Star Prince to help people overcome procrastination and build momentum.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-top-row">
                <span className="project-number">{project.num}</span>
                <span className="project-badge">{project.badge}</span>
              </div>

              {/* Compact Visual Preview Graphic */}
              <div className="project-visual-preview">
                {project.previewType === 'catcher' && (
                  <div className="preview-graphic catcher-preview">
                    <span className="mini-cloud">☁️</span>
                    <span className="mini-arrow">➔</span>
                    <span className="mini-pouch">🎒</span>
                  </div>
                )}

                {project.previewType === 'timer' && (
                  <div className="preview-graphic timer-preview">
                    <div className="mini-dial">
                      <span className="dial-hand" />
                      <span className="dial-label">5m</span>
                    </div>
                  </div>
                )}

                {project.previewType === 'constellation' && (
                  <div className="preview-graphic constellation-preview">
                    <svg className="mini-constellation-svg" viewBox="0 0 100 60">
                      <line x1="20" y1="40" x2="50" y2="20" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="50" y1="20" x2="80" y2="35" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3,3" />
                      <circle cx="20" cy="40" r="4" fill="#FBBF24" />
                      <circle cx="50" cy="20" r="5" fill="#38BDF8" />
                      <circle cx="80" cy="35" r="4" fill="#FBBF24" />
                    </svg>
                  </div>
                )}
              </div>

              <h3 className="project-title">{project.title}</h3>
              <h4 className="project-subtitle">{project.subtitle}</h4>

              <p className="project-desc">{project.purpose}</p>

              <div className="project-card-footer">
                <button
                  type="button"
                  className="project-study-btn"
                  onClick={() => handleOpenModal(project)}
                >
                  <BookOpen size={16} />
                  <span>View Case Study</span>
                </button>

                {project.actionHref && (
                  <button
                    type="button"
                    className="project-action-link-btn"
                    onClick={() => handleAction(project.actionHref!)}
                  >
                    <span>Try It</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onAction={handleAction}
      />
    </section>
  );
};
