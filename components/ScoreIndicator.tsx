
import React from 'react';

interface ScoreIndicatorProps {
  score: number;
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ score }) => {
  const circumference = 2 * Math.PI * 45; // 2 * pi * r
  const offset = circumference - (score / 100) * circumference;

  let colorClass = 'stroke-red-500';
  if (score >= 80) {
    colorClass = 'stroke-green-500';
  } else if (score >= 50) {
    colorClass = 'stroke-yellow-500';
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-32 h-32">
        <circle
          className="text-base-300-light dark:text-base-300-dark"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="64"
          cy="64"
        />
        <circle
          className={`${colorClass} transition-all duration-500`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="64"
          cy="64"
          transform="rotate(-90 64 64)"
        />
      </svg>
      <span className="absolute text-3xl font-bold text-content-100-light dark:text-content-100-dark">
        {score}%
      </span>
    </div>
  );
};

export default ScoreIndicator;
