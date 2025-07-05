
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ComparisonModal } from './components/ComparisonModal';
import { HomeView } from './components/HomeView';
import { PlatformDetailView } from './components/PlatformDetailView';
import { CourseDetailView } from './components/CourseDetailView';
import { courses, platforms } from './data/db';
import type { CourseWithPlatform } from './types';

type ViewState = 
  | { page: 'home', options?: { scrollTo?: string } }
  | { page: 'platform', id: string }
  | { page: 'course', id: string };

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ page: 'home' });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleNavigate = (page: 'home' | 'platform' | 'course', id?: string, options?: { scrollTo?: string }) => {
    window.scrollTo(0, 0);
    if (page === 'home') {
      setView({ page: 'home', options });
    } else if (page === 'platform' && id) {
      setView({ page: 'platform', id });
    } else if (page === 'course' && id) {
      setView({ page: 'course', id });
    }
  };

  const renderView = () => {
    switch (view.page) {
      case 'platform': {
        const platform = platforms.find(p => p.id === view.id);
        if (!platform) {
          return <div className="text-center p-8">Platform not found</div>;
        }
        const platformCourses = courses.filter(c => c.platformId === view.id);
        return <PlatformDetailView platform={platform} courses={platformCourses} onNavigate={handleNavigate} />;
      }
      case 'course': {
        const course = courses.find(c => c.id === view.id);
        const platform = course ? platforms.find(p => p.id === course.platformId) : undefined;
        if (!course || !platform) {
          // This could be an AI-generated course, let's pass the ID
          if (view.id.startsWith('gen:')) {
            return <CourseDetailView courseId={view.id} onNavigate={handleNavigate} />;
          }
          return <div className="text-center p-8">Course not found</div>;
        }
        const courseWithPlatform: CourseWithPlatform = { ...course, platform };
        return <CourseDetailView course={courseWithPlatform} courseId={course.id} onNavigate={handleNavigate} />;
      }
      case 'home':
      default:
        return <HomeView onNavigate={handleNavigate} onOpenCompare={() => setIsModalOpen(true)} options={view.options} />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Header onNavigate={handleNavigate} onOpenCompare={() => setIsModalOpen(true)} />
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
      <ComparisonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;