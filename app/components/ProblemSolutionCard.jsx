"use client";

import { useState } from 'react';
import MobiusIcon from './MobiusIcon';

export default function ProblemSolutionCard({ 
  problemText, 
  solutionText,
  problemDesc,
  solutionDesc
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MobiusIcon isHovered={isHovered} />
      
      <div className="card-content problem-state">
        <h3 className="card-title problem-title">{problemText}</h3>
        {problemDesc && <p className="card-desc problem-desc">{problemDesc}</p>}
      </div>
      
      <div className="card-content solution-state">
        <h3 className="card-title solution-title">{solutionText}</h3>
        {solutionDesc && <p className="card-desc solution-desc">{solutionDesc}</p>}
      </div>
      
      <style jsx>{`
        .card-wrapper {
          position: relative;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          background: transparent;
        }

        .card-content {
          position: absolute;
          inset: 0;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: opacity 0.5s ease, transform 0.5s ease, filter 0.5s ease;
          z-index: 10;
          pointer-events: none;
        }

        .problem-state {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        .solution-state {
          opacity: 0;
          transform: translateY(15px) scale(0.95);
          filter: blur(4px);
        }

        .card-wrapper:hover .problem-state {
          opacity: 0;
          transform: translateY(-15px) scale(1.05);
          filter: blur(8px);
        }

        .card-wrapper:hover .solution-state {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        .card-title {
          font-family: var(--font-clash);
          font-size: 1.6rem;
          margin: 0 0 1rem 0;
          line-height: 1.3;
        }

        .problem-title {
          color: var(--text-primary);
          font-weight: 600;
        }

        .solution-title {
          background: linear-gradient(135deg, var(--primary-purple), var(--primary-pink));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }

        .card-desc {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .problem-desc {
          color: var(--text-secondary);
        }

        .solution-desc {
          color: var(--text-primary);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
