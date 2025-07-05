import React, { useState, useEffect } from 'react';
import type { CourseWithPlatform, Course } from '../types';
import { DonutChart } from './DonutChart';
import { ChevronLeftIcon, LoadingSpinner } from './icons';
import { InDepthReview } from './InDepthReview';
import { geminiService } from '../services/geminiService';
import { platforms } from '../data/db';

interface CourseDetailViewProps {
  courseId: string;
  course?: CourseWithPlatform; // Optional, for statically available courses
  onNavigate: (page: 'home' | 'platform', id?: string) => void;
}

const chartColors = [
    '#0ea5e9', '#14b8a6', '#f59e0b', '#84cc16', '#ec4899',
];

const CourseSkeleton: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-5"></div>
        <div className="flex flex-wrap gap-2 mt-4 mb-8">
            <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        </div>
        <div className="space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
    </div>
);

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course: initialCourse, courseId, onNavigate }) => {
    const [course, setCourse] = useState<CourseWithPlatform | undefined>(initialCourse);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGeneratedCourse = async () => {
            if (!initialCourse && courseId.startsWith('gen:')) {
                setIsLoading(true);
                setError(null);
                try {
                    const [, platformId, courseName] = courseId.split(':');
                    const platform = platforms.find(p => p.id === platformId);
                    if (!platform) throw new Error("Platform not found for generated course.");

                    const details = await geminiService.generateCourseDetails(courseName.replace(/-/g, ' '), platform.name);
                    const newCourse: CourseWithPlatform = {
                        ...details,
                        id: courseId,
                        name: courseName.replace(/-/g, ' '),
                        platformId: platform.id,
                        platform: platform
                    };
                    setCourse(newCourse);
                } catch(err) {
                    const errorMessage = err instanceof Error ? err.message : 'Failed to generate course details.';
                    setError(errorMessage);
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setCourse(initialCourse);
            }
        };

        fetchGeneratedCourse();
    }, [courseId, initialCourse]);

    if (isLoading || !course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <LoadingSpinner className="w-12 h-12 text-sky-500 mb-4" />
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    {error ? "Failed to load course details." : "Loading course details..."}
                </p>
                {error && <p className="text-red-500">{error}</p>}
                {!error && <CourseSkeleton />}
            </div>
        );
    }
    
    return (
        <div>
            <nav className="mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 flex-wrap">
                    <li><button onClick={() => onNavigate('home')} className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Home</button></li>
                    <li><ChevronLeftIcon className="w-4 h-4 transform rotate-180" /></li>
                    <li><button onClick={() => onNavigate('platform', course.platformId)} className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">{course.platform.name}</button></li>
                    <li><ChevronLeftIcon className="w-4 h-4 transform rotate-180" /></li>
                    <li className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-sm sm:max-w-md">{course.name}</li>
                </ol>
            </nav>

            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">{course.name}</h1>
                <div className="flex items-center gap-2 text-lg">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                        On <span className="text-sky-600 dark:text-sky-400">{course.platform.name}</span>
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">•</span>
                     <span className="font-semibold text-slate-700 dark:text-slate-300">
                        By <span className="text-sky-600 dark:text-sky-400">{course.instructor.name}</span>
                    </span>
                </div>
                 <div className="flex flex-wrap gap-2 mt-4">
                    {course.tags.map(tag => (
                       <span key={tag} className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${course.id.startsWith('gen:') ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300'}`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Course Description</h2>
                    <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{course.description}</p>
                  </div>
                   <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">In-Depth Review Analysis</h2>
                    {course.id.startsWith('gen:') ? (
                        <p className="text-slate-500 p-4 text-center">In-depth analysis is not available for AI-generated courses.</p>
                    ) : (
                        <InDepthReview insightId={course.id} isPlatform={false} />
                    )}
                  </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 sticky top-24">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Positive Review Insights</h2>
                    {course.reviewDistribution.length > 0 ? (
                        <DonutChart data={course.reviewDistribution} colors={chartColors} />
                    ): (
                        <p className="text-slate-500 text-center py-8">Review data not available.</p>
                    )}
                </div>
              </div>
            </div>
        </div>
    );
};