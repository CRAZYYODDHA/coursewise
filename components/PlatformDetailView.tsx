import React, { useState, useMemo, useCallback } from 'react';
import type { Platform, Course } from '../types';
import { ChevronLeftIcon, GlobeAltIcon, CreditCardIcon, StarIcon, SearchIcon, SparklesIcon, LoadingSpinner } from './icons';
import { InDepthReview } from './InDepthReview';
import { geminiService } from '../services/geminiService';

interface PlatformDetailViewProps {
    platform: Platform;
    courses: Course[];
    onNavigate: (page: 'home' | 'platform' | 'course', id?: string) => void;
}

export const PlatformDetailView: React.FC<PlatformDetailViewProps> = ({ platform, courses, onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [generatedCourses, setGeneratedCourses] = useState<Course[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAISearch = useCallback(async () => {
        if (!searchTerm) return;
        setIsGenerating(true);
        setGeneratedCourses([]);
        try {
            const results = await geminiService.generateCourseList(searchTerm, platform.name);
            const newCourses: Course[] = results.map((result, index) => ({
                id: `gen:${platform.id}:${searchTerm.replace(/\s+/g, '-')}:${index}`, // Unique ID for generated course
                name: result.name,
                platformId: platform.id,
                description: 'Click to generate full course details with AI.',
                instructor: { name: 'AI Generated' },
                tags: ['AI Generated'],
                reviewDistribution: [],
            }));
            setGeneratedCourses(newCourses);
        } catch(error) {
            console.error("Failed to generate course list:", error);
            // You might want to show an error state to the user here
        } finally {
            setIsGenerating(false);
        }
    }, [searchTerm, platform.id, platform.name]);

    const filteredCourses = useMemo(() => {
        if (!searchTerm) return courses;
        return courses.filter(course => 
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [courses, searchTerm]);

    const displayCourses = searchTerm ? [...filteredCourses, ...generatedCourses] : courses;

  return (
    <div>
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <button onClick={() => onNavigate('home')} className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Home</button>
          </li>
          <li>
            <ChevronLeftIcon className="w-4 h-4 transform rotate-180" />
          </li>
          <li className="font-semibold text-slate-800 dark:text-slate-200">{platform.name}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
        <img src={platform.logo} alt={`${platform.name} logo`} className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-contain bg-white p-2 shadow-lg border border-slate-200 dark:border-slate-700 shrink-0" />
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{platform.name}</h1>
          <p className="text-lg text-sky-600 dark:text-sky-400 font-semibold mb-4 italic">{platform.tagline}</p>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl">{platform.summary}</p>
        </div>
      </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Courses on {platform.name}</h2>
                    <div className="relative mb-6">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                        <input 
                            type="text"
                            placeholder={`Search courses on ${platform.name}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                        />
                    </div>
                    <div className="space-y-4">
                        {displayCourses.map(course => (
                        <div 
                            key={course.id}
                            onClick={() => onNavigate('course', course.id)}
                            className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-600 transition-all duration-300 cursor-pointer"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{course.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {course.tags.map(tag => (
                                    <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full ${course.id.startsWith('gen:') ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        ))}
                        {displayCourses.length === 0 && searchTerm && !isGenerating && (
                            <div className="text-center py-12 px-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                                <div className="flex justify-center items-center mx-auto w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-4">
                                    <SearchIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">No matches found</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                                    We couldn't find any courses matching "{searchTerm}" in our database. You can try searching with AI to discover more courses.
                                </p>
                                <button
                                    onClick={handleAISearch}
                                    className="bg-sky-500 text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 mx-auto hover:bg-sky-600 transition-colors shadow-sm hover:shadow-md"
                                >
                                    <SparklesIcon className="w-5 h-5" />
                                    Search with AI
                                </button>
                            </div>
                        )}
                        {isGenerating && (
                            <div className="flex justify-center items-center gap-2 py-8 text-slate-500">
                                <LoadingSpinner className="w-6 h-6" />
                                <p>AI is searching for courses...</p>
                            </div>
                        )}
                    </div>
                </div>
                
                 <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">In-Depth Review Analysis</h2>
                    <InDepthReview insightId={platform.id} isPlatform={true} />
                </div>
            </div>
            <div className="lg:col-span-1">
                 <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 sticky top-24">
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Platform Details</h3>
                     <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                           <GlobeAltIcon className="w-5 h-5 text-sky-500 shrink-0 mt-0.5"/>
                           <a href={platform.website} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors break-all">{platform.website}</a>
                        </li>
                        <li className="flex items-start gap-3">
                           <CreditCardIcon className="w-5 h-5 text-sky-500 shrink-0 mt-0.5"/>
                           <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-100">Pricing: </span>
                            <span className="text-slate-600 dark:text-slate-300">{platform.pricingModel}</span>
                           </div>
                        </li>
                         <li className="flex items-start gap-3">
                           <StarIcon className="w-5 h-5 text-sky-500 shrink-0 mt-0.5"/>
                           <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-100">Key Features:</span>
                            <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300">
                                {platform.keyFeatures.map(feature => <li key={feature}>{feature}</li>)}
                            </ul>
                           </div>
                        </li>
                     </ul>
                 </div>
            </div>
        </div>
    </div>
  );
};