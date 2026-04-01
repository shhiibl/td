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
      className="relative min-h-[360px] flex flex-col justify-center p-10 text-center cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Icon/Effect */}
      <MobiusIcon isHovered={isHovered} />
      
      {/* Problem State */}
      <div className={`
        absolute inset-0 p-10 flex flex-col justify-center items-center gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 pointer-events-none
        ${isHovered ? 'opacity-0 -translate-y-8 blur-xl scale-110' : 'opacity-100 translate-y-0 blur-0 scale-100'}
      `}>
        <h3 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight leading-tight">
          {problemText}
        </h3>
        {problemDesc && (
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {problemDesc}
          </p>
        )}
      </div>
      
      {/* Solution State */}
      <div className={`
        absolute inset-0 p-10 flex flex-col justify-center items-center gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 pointer-events-none
        ${isHovered ? 'opacity-100 translate-y-0 blur-0 scale-100' : 'opacity-0 translate-y-8 blur-xl scale-90'}
      `}>
        <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
          {solutionText}
        </h3>
        {solutionDesc && (
          <p className="text-text-primary text-base md:text-lg font-semibold leading-relaxed">
            {solutionDesc}
          </p>
        )}
      </div>
    </div>
  );
}
