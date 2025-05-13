import React from 'react';

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;
  
  return (
    <div className="w-full h-2 bg-primary/10 rounded-full mt-2 mb-4">
      <div 
        className="h-2 bg-primary rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}