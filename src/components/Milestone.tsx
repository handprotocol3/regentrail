import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MilestoneProps {
  text: string;
}

export const Milestone: React.FC<MilestoneProps> = ({ text }) => {
  return (
    <div className="fixed top-4 right-4 milestone-notification bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-4 flex items-center gap-3">
      <ArrowRight className="text-emerald-500" />
      <div>
        <div className="text-sm font-medium text-gray-500">Submitting to KarmaGap</div>
        <div className="text-emerald-700 font-semibold">{text}</div>
      </div>
    </div>
  );
}