import React from 'react'

interface Semester {
  label: string
  subjects: string[]
}

interface Curriculum {
  semesters: Semester[]
}

interface CurriculumGridProps {
  curriculum?: Curriculum | null
}

export const CurriculumGrid: React.FC<CurriculumGridProps> = ({ curriculum }) => {
  if (!curriculum || !curriculum.semesters || curriculum.semesters.length === 0) {
    return null
  }

  return (
    <div className="curriculum-grid">
      {curriculum.semesters.map((semester, index) => (
        <div key={index} className="semester-card">
          <div className="semester-header">
            <span className="semester-num">— 0{index + 1}</span>
            <h3 className="semester-title">{semester.label}</h3>
          </div>
          <ul className="subject-list">
            {semester.subjects.map((subject, sIndex) => (
              <li key={sIndex} className="subject-item">
                <span className="subject-bullet">/</span>
                {subject}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <style>{`
        .curriculum-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1px;
          background: var(--outline-soft, #d8dadc);
          border: 1px solid var(--outline-soft, #d8dadc);
          margin: 2rem 0;
        }

        .semester-card {
          background: white;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
        }

        .semester-header {
          margin-bottom: 2rem;
        }

        .semester-num {
          font-family: var(--mono, monospace);
          font-size: 0.75rem;
          color: var(--secondary-soft, #6b7280);
          display: block;
          margin-bottom: 0.5rem;
        }

        .semester-title {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--secondary, #111827);
        }

        .subject-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .subject-item {
          font-size: 0.9375rem;
          color: var(--tertiary, #374151);
          line-height: 1.4;
          display: flex;
          gap: 0.75rem;
        }

        .subject-bullet {
          color: var(--primary, #b21c3e);
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .curriculum-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
