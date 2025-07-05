
import React, { useState, useCallback, useMemo } from 'react';
import { geminiService } from '../services/geminiService';
import { CloseIcon, SparklesIcon, LoadingSpinner, CheckCircleIcon, XCircleIcon, PlusCircleIcon, ArrowPathIcon, SearchIcon, TrendingUpIcon } from './icons';
import type { StructuredComparisonResult, ComparisonSubject } from '../types';
import { RadarChart } from './RadarChart';
import { courses, platforms } from '../data/db';
import { reviewInsights } from '../data/reviewInsights';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const insightsMap = new Map(reviewInsights.map(i => [i.id, i]));

const ComparisonResultDisplay: React.FC<{ result: StructuredComparisonResult }> = ({ result }) => {
    const labels = result.item1.ratings.map(r => r.name);

    const calculateAverage = (ratings: { name: string; score: number }[]) => {
        if (!ratings || ratings.length === 0) return 0;
        const total = ratings.reduce((sum, item) => sum + item.score, 0);
        return total / ratings.length;
    };

    const avg1 = calculateAverage(result.item1.ratings);
    const avg2 = calculateAverage(result.item2.ratings);

    const [higherScoringItem] = avg1 >= avg2 ? [result.item1, result.item2] : [result.item2, result.item1];
    const higherAvg = Math.max(avg1, avg2);
    const lowerAvg = Math.min(avg1, avg2);
    
    // Handle division by zero and no difference cases
    const percentageDifference = lowerAvg > 0 ? Math.round(((higherAvg - lowerAvg) / lowerAvg) * 100) : (higherAvg > 0 ? 100 : 0);
    
    const hasDifference = higherAvg > lowerAvg && percentageDifference > 0;

    const summaryText = hasDifference
        ? `${higherScoringItem.name} scores ${percentageDifference}% higher overall based on these metrics.`
        : `Both items score similarly overall based on these metrics.`;

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-center mb-4 text-slate-800 dark:text-slate-200">Feature Comparison</h3>
                <div className="flex justify-center items-center">
                    <RadarChart labels={labels} data1={result.item1.ratings} data2={result.item2.ratings} />
                </div>
                 <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{result.item1.name}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{result.item2.name}</span>
                    </div>
                </div>
            </div>

            {hasDifference && (
                <div className="bg-emerald-50 dark:bg-emerald-900/50 p-4 rounded-lg border-l-4 border-emerald-500 flex items-center gap-4">
                    <TrendingUpIcon className="w-8 h-8 text-emerald-500 shrink-0"/>
                    <div>
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-200">Statistical Difference</h4>
                        <p className="text-emerald-700 dark:text-emerald-300 text-sm">{summaryText}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">{result.item1.name}</h4>
                    <div>
                        <h5 className="font-semibold flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                            <CheckCircleIcon className="w-5 h-5"/> Pros
                        </h5>
                        <ul className="space-y-1.5 list-inside text-slate-600 dark:text-slate-400 text-sm">
                            {result.item1.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h5 className="font-semibold flex items-center gap-2 mb-2 text-red-600 dark:text-red-400">
                            <XCircleIcon className="w-5 h-5"/> Cons
                        </h5>
                        <ul className="space-y-1.5 list-inside text-slate-600 dark:text-slate-400 text-sm">
                            {result.item1.cons.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">{result.item2.name}</h4>
                     <div>
                        <h5 className="font-semibold flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                            <CheckCircleIcon className="w-5 h-5"/> Pros
                        </h5>
                        <ul className="space-y-1.5 list-inside text-slate-600 dark:text-slate-400 text-sm">
                            {result.item2.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h5 className="font-semibold flex items-center gap-2 mb-2 text-red-600 dark:text-red-400">
                            <XCircleIcon className="w-5 h-5"/> Cons
                        </h5>
                        <ul className="space-y-1.5 list-inside text-slate-600 dark:text-slate-400 text-sm">
                            {result.item2.cons.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

             <div className="bg-white dark:bg-slate-900/50 rounded-lg p-6 border-2 border-sky-500/50">
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">The Verdict</h3>
                <p className="text-slate-700 dark:text-slate-300">{result.verdict}</p>
            </div>
        </div>
    );
};

const ItemSelector: React.FC<{
  onSelectItem: (item: ComparisonSubject) => void;
  onClose: () => void;
}> = ({ onSelectItem, onClose }) => {
  const [activeTab, setActiveTab] = useState<'Courses' | 'Platforms'>('Courses');
  const [searchTerm, setSearchTerm] = useState('');

  const allCourses = useMemo(() => courses.map(c => ({
    id: c.id,
    name: c.name,
    type: 'Course' as const,
    description: c.description,
    logo: platforms.find(p => p.id === c.platformId)?.logo,
    reviewInsight: insightsMap.get(c.id),
  })), []);

  const allPlatforms = useMemo(() => platforms.map(p => ({
    id: p.id,
    name: p.name,
    type: 'Platform' as const,
    description: p.summary,
    logo: p.logo,
    reviewInsight: insightsMap.get(p.id),
  })), []);
  
  const filteredItems = useMemo(() => {
    const list = activeTab === 'Courses' ? allCourses : allPlatforms;
    if (!searchTerm) return list;
    return list.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [activeTab, searchTerm, allCourses, allPlatforms]);

  return (
    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800 flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Select an Item to Compare</h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
          />
        </div>
      </div>
      <div className="border-b border-slate-200 dark:border-slate-700 shrink-0">
        <div className="px-4 flex gap-4">
          <button onClick={() => setActiveTab('Courses')} className={`py-3 text-sm font-semibold border-b-2 ${activeTab === 'Courses' ? 'border-sky-500 text-sky-500' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}>Courses</button>
          <button onClick={() => setActiveTab('Platforms')} className={`py-3 text-sm font-semibold border-b-2 ${activeTab === 'Platforms' ? 'border-sky-500 text-sky-500' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}>Platforms</button>
        </div>
      </div>
      <div className="overflow-y-auto">
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredItems.map(item => (
            <li key={item.id}>
              <button onClick={() => onSelectItem(item)} className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                {item.logo && <img src={item.logo} alt={item.name} className="w-10 h-10 rounded-md object-contain bg-white p-1 shadow-sm"/>}
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.type}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const ComparisonSlot: React.FC<{
  item: ComparisonSubject | null;
  onSelect: () => void;
}> = ({ item, onSelect }) => {
  if (!item) {
    return (
      <button onClick={onSelect} className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-slate-500 dark:text-slate-400">
        <PlusCircleIcon className="w-8 h-8"/>
        <span className="font-semibold">Add Item to Compare</span>
      </button>
    );
  }
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900/50">
      <div className="flex items-start gap-3 flex-grow">
        {item.logo && <img src={item.logo} alt={item.name} className="w-12 h-12 rounded-lg object-contain bg-white p-1 shadow-sm shrink-0"/>}
        <div>
            <p className="text-xs font-semibold uppercase text-sky-500">{item.type}</p>
            <p className="font-bold text-slate-800 dark:text-slate-200">{item.name}</p>
        </div>
      </div>
      <button onClick={onSelect} className="w-full text-sm flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
        <ArrowPathIcon className="w-4 h-4" /> Change
      </button>
    </div>
  );
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose }) => {
  const [item1, setItem1] = useState<ComparisonSubject | null>(null);
  const [item2, setItem2] = useState<ComparisonSubject | null>(null);
  const [isSelecting, setIsSelecting] = useState<'item1' | 'item2' | null>(null);
  const [comparisonResult, setComparisonResult] = useState<StructuredComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleComparison = useCallback(async () => {
    if (!item1 || !item2) {
      setError('Please select two items to compare.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setComparisonResult(null);
    try {
      // Mitigate positional bias by ensuring a consistent order for the AI prompt.
      let subject1 = item1;
      let subject2 = item2;
      let swapped = false;

      // Sort alphabetically by ID to create a canonical order.
      if (item1.id > item2.id) {
        subject1 = item2;
        subject2 = item1;
        swapped = true;
      }
      
      let result = await geminiService.generateComparison(subject1, subject2);

      // If we swapped the items for the API call, swap the results back for display.
      if (swapped) {
        result = {
          item1: result.item2,
          item2: result.item1,
          verdict: result.verdict,
        };
      }
      
      setComparisonResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate comparison. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [item1, item2]);

  const handleSelectItem = (item: ComparisonSubject) => {
    if (isSelecting === 'item1') {
      setItem1(item);
    } else if (isSelecting === 'item2') {
      setItem2(item);
    }
    setIsSelecting(null);
  };
  
  const handleClose = () => {
    setItem1(null);
    setItem2(null);
    setComparisonResult(null);
    setError(null);
    setIsLoading(false);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-start sm:items-center p-4" onClick={handleClose}>
      <div 
        className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-sky-500" />
            AI-Powered Comparison
          </h2>
          <button onClick={handleClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 min-h-[150px]">
            <ComparisonSlot item={item1} onSelect={() => setIsSelecting('item1')} />
            <ComparisonSlot item={item2} onSelect={() => setIsSelecting('item2')} />
          </div>

          <div className="mb-4">
            <button
              onClick={handleComparison}
              disabled={isLoading || !item1 || !item2}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 dark:disabled:bg-sky-800/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? <LoadingSpinner /> : <SparklesIcon className="w-5 h-5" />}
              {isLoading ? 'Generating...' : 'Generate Comparison'}
            </button>
          </div>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <div className="min-h-[200px]">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <LoadingSpinner className="w-12 h-12 mb-4" />
                <p className="text-lg">AI is analyzing... this may take a moment.</p>
              </div>
            )}
            {comparisonResult && <ComparisonResultDisplay result={comparisonResult} />}
            {!isLoading && !comparisonResult && <p className="text-center text-slate-500 pt-16">Your AI-generated comparison will appear here.</p>}
          </div>
        </div>

        {isSelecting && <ItemSelector onSelectItem={handleSelectItem} onClose={() => setIsSelecting(null)} />}
      </div>
    </div>
  );
};