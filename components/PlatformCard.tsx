
import React from 'react';
import type { Platform } from '../types';

interface PlatformCardProps {
  platform: Platform;
  onClick: () => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md hover:shadow-xl border border-transparent dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <img src={platform.logo} alt={`${platform.name} logo`} className="w-16 h-16 mb-4 rounded-lg object-contain bg-white p-1 shadow-sm" />
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{platform.name}</h3>
      <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 mb-4 italic">
        {platform.tagline}
      </p>
      <p className="text-slate-600 dark:text-slate-300 text-sm flex-grow">{platform.summary}</p>
    </div>
  );
};