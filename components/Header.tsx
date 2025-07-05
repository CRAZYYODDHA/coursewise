
import React, { useState } from 'react';
import { CompassIcon, MenuIcon, CloseIcon, ScaleIcon, ChevronDownIcon } from './icons';
import { platforms } from '../data/db';
import { PlatformsMegaMenu } from './PlatformsMegaMenu';

interface HeaderProps {
    onNavigate: (page: 'home' | 'platform', id?: string, options?: { scrollTo?: string }) => void;
    onOpenCompare: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenCompare }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const handleNavClick = (section?: string) => {
      onNavigate('home', undefined, { scrollTo: section });
      setIsMenuOpen(false);
  }

  const handlePlatformNav = (platformId: string) => {
    onNavigate('platform', platformId);
    setIsMegaMenuOpen(false);
    setIsMenuOpen(false);
  }

  return (
    <header 
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800"
        onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center py-4">
          <button onClick={() => handleNavClick()} className="flex items-center gap-2 group shrink-0">
            <CompassIcon className="w-8 h-8 text-sky-500 group-hover:rotate-12 transition-transform" />
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              CourseWise
            </span>
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleNavClick('#reviews')}
              className="text-sm font-medium text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400 transition-colors">
              Insights
            </button>
            <div className="relative" onMouseEnter={() => setIsMegaMenuOpen(true)}>
              <button 
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400 transition-colors">
                Platforms <ChevronDownIcon className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
            >
              <ScaleIcon className="w-4 h-4 text-sky-500"/>
              Compare
            </button>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              {isMenuOpen ? <CloseIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col gap-4">
               <button 
                onClick={() => handleNavClick('#reviews')}
                className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors text-left p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                Insights
              </button>
              <details className="group">
                  <summary className="flex justify-between items-center text-base font-medium text-slate-700 dark:text-slate-200 list-none cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                      Platforms
                      <ChevronDownIcon className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-2 pl-4 space-y-2">
                    {platforms.map(p => (
                      <button key={p.id} onClick={() => handlePlatformNav(p.id)} className="block w-full text-left text-slate-600 dark:text-slate-300 hover:text-sky-500">{p.name}</button>
                    ))}
                  </div>
              </details>
              <button
                onClick={() => {
                  onOpenCompare();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors text-left p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ScaleIcon className="w-5 h-5 text-sky-500"/>
                Compare Courses
              </button>
            </nav>
          </div>
        )}
      </div>
      {isMegaMenuOpen && (
        <PlatformsMegaMenu platforms={platforms} onNavigate={handlePlatformNav} />
      )}
    </header>
  );
};