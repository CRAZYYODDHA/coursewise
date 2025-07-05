
import React from 'react';
import type { Course, Platform } from '../types';
import { DonutChart } from './DonutChart';

interface ReviewCardProps {
  course: Course;
  platform?: Platform;
  onClick: () => void;
}

const chartColors = [
    '#0ea5e9', // sky-500
    '#14b8a6', // teal-500
    '#f59e0b', // amber-500
    '#84cc16', // lime-500
    '#ec4899', // pink-500
];

export const ReviewCard: React.FC<ReviewCardProps> = ({ course, platform, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md hover:shadow-xl border border-transparent dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
       <div className="flex-grow">
        {platform && <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-2">{platform.name}</p>}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{course.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.slice(0, 3).map(tag => (
                <span key={tag} className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-sky-900/50 dark:text-sky-300">
                    {tag}
                </span>
            ))}
        </div>
      </div>
      <div className="mt-auto">
          <DonutChart data={course.reviewDistribution} colors={chartColors} />
      </div>
    </div>
  );
};