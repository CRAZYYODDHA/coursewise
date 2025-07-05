
import React from 'react';
import type { Platform } from '../types';

interface PlatformsMegaMenuProps {
  platforms: Platform[];
  onNavigate: (platformId: string) => void;
}

export const PlatformsMegaMenu: React.FC<PlatformsMegaMenuProps> = ({ platforms, onNavigate }) => {
  // Split platforms into two columns
  const midpoint = Math.ceil(platforms.length / 2);
  const column1 = platforms.slice(0, midpoint);
  const column2 = platforms.slice(midpoint);

  return (
    <div className="hidden md:block absolute top-full left-0 w-full bg-white dark:bg-slate-800 border-b border-x border-slate-200 dark:border-slate-700 shadow-lg animate-fade-in-down">
      <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-2 gap-x-8">
          <div className="space-y-1">
            {column1.map(platform => (
              <button
                key={platform.id}
                onClick={() => onNavigate(platform.id)}
                className="w-full text-left flex items-center gap-4 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <img src={platform.logo} alt="" className="w-8 h-8 rounded-md bg-white p-0.5 shadow-sm"/>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{platform.name}</span>
              </button>
            ))}
          </div>
          <div className="space-y-1">
            {column2.map(platform => (
              <button
                key={platform.id}
                onClick={() => onNavigate(platform.id)}
                className="w-full text-left flex items-center gap-4 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <img src={platform.logo} alt="" className="w-8 h-8 rounded-md bg-white p-0.5 shadow-sm"/>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
