
import React, { useState, useEffect } from 'react';
import { PlatformCard } from './PlatformCard';
import { ReviewCard } from './ReviewCard';
import { BookOpenIcon, CpuChipIcon, ScaleIcon, SparklesIcon, UserGroupIcon, AcademicCapIcon, CheckBadgeIcon } from './icons';
import { courses, platforms } from '../data/db';
import type { Platform, Course } from '../types';

interface HomeViewProps {
    onNavigate: (page: 'platform' | 'course', id: string) => void;
    onOpenCompare: () => void;
    options?: { scrollTo?: string };
}

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
    <div className="flex flex-col items-center text-center">
        <div className="mb-2 text-sky-500">{icon}</div>
        <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">{value}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
    </div>
);

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenCompare, options }) => {
    const [latestReviews, setLatestReviews] = useState<Course[]>([]);
    const [topPlatforms, setTopPlatforms] = useState<Platform[]>([]);
    const [loadingReviews, setLoadingReviews] = useState<boolean>(true);
    const [loadingPlatforms, setLoadingPlatforms] = useState<boolean>(true);

    const loadInitialData = () => {
        setLoadingPlatforms(true);
        setTopPlatforms(platforms);
        setLoadingPlatforms(false);

        setLoadingReviews(true);
        const featuredCourses = ['google-data-analytics', 'complete-2024-web-dev', 'cs50x', 'fundamentals-of-graphic-design'];
        setLatestReviews(courses.filter(c => featuredCourses.includes(c.id)));
        setLoadingReviews(false);
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (options?.scrollTo) {
            setTimeout(() => {
                const element = document.querySelector(options.scrollTo);
                if (element) {
                    const yOffset = -80; // height of sticky header
                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [options]);

    const SkeletonReviewCard: React.FC = () => (
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md animate-pulse flex flex-col">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-3"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
            <div className="space-y-2 mb-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
             <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            </div>
            <div className="flex items-center justify-start gap-6 md:gap-8 mt-auto pt-4">
                <div className="w-[120px] h-[120px] bg-slate-200 dark:bg-slate-700 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );

    const SkeletonPlatformCard: React.FC = () => (
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md animate-pulse">
            <div className="h-16 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
            <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
        </div>
    );


    return (
        <>
            <div className="text-center pt-8 pb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                    Find Your Next Course
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
                    AI-powered insights and comparisons to help you choose the best online learning path.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <StatCard icon={<AcademicCapIcon className="w-10 h-10"/>} value={`${courses.length}+`} label="Courses Indexed" />
                    <StatCard icon={<CpuChipIcon className="w-10 h-10"/>} value={`${platforms.length}`} label="Platforms Analyzed" />
                    <StatCard icon={<UserGroupIcon className="w-10 h-10"/>} value="150k+" label="Reviews Synthesized" />
                    <StatCard icon={<CheckBadgeIcon className="w-10 h-10"/>} value="10k+" label="AI Insights Generated" />
                </div>
            </div>
            
            <section id="comparison-tool" className="mb-16">
                 <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-8 text-center">
                    <div className="flex justify-center items-center mx-auto w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-900/50 mb-4">
                        <ScaleIcon className="w-8 h-8 text-sky-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Unsure Which to Choose?</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
                        Compare any two courses or platforms side-by-side with our AI-powered analysis tool.
                    </p>
                    <button onClick={onOpenCompare} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto">
                        <SparklesIcon className="w-5 h-5" />
                        Launch Comparison Tool
                    </button>
                 </div>
            </section>

            {/* Top Platforms Section */}
            <section id="platforms" className="mb-16 pt-20 -mt-20">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <CpuChipIcon className="w-8 h-8 text-sky-500" />
                        Explore Platforms
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loadingPlatforms ? (
                        Array.from({ length: 6 }).map((_, i) => <SkeletonPlatformCard key={i} />)
                    ) : (
                        topPlatforms.map((platform) => (
                            <PlatformCard key={platform.id} platform={platform} onClick={() => onNavigate('platform', platform.id)} />
                        ))
                    )}
                </div>
            </section>

            {/* Latest Reviews Section */}
            <section id="reviews" className="mb-16 pt-20 -mt-20">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <BookOpenIcon className="w-8 h-8 text-sky-500" />
                        Featured Course Insights
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {loadingReviews ? (
                        Array.from({ length: 4 }).map((_, i) => <SkeletonReviewCard key={i} />)
                    ) : (
                        latestReviews.map((course) => (
                           <ReviewCard key={course.id} course={course} platform={platforms.find(p => p.id === course.platformId)} onClick={() => onNavigate('course', course.id)} />
                        ))
                    )}
                </div>
            </section>
        </>
    );
};
