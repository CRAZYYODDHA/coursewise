import React from 'react';
import { reviewInsights } from '../data/reviewInsights';
import { ThumbsUpIcon, ThumbsDownIcon } from './icons';

interface InDepthReviewProps {
    insightId: string;
    isPlatform: boolean;
}

export const InDepthReview: React.FC<InDepthReviewProps> = ({ insightId, isPlatform }) => {
    const insight = reviewInsights.find(i => i.id === insightId);

    if (!insight) {
        return <p className="text-slate-500 p-4 text-center">No detailed review analysis available for this {isPlatform ? 'platform' : 'course'}.</p>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200 mb-2"><ThumbsUpIcon className="w-5 h-5 text-green-500"/> Common Praise</h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-400">
                    {insight.praise.map((item, i) => <li key={`praise-${i}`}>{item}</li>)}
                </ul>
            </div>
             <div>
                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200 mb-2"><ThumbsDownIcon className="w-5 h-5 text-red-500"/> Common Criticisms</h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-400">
                    {insight.criticism.map((item, i) => <li key={`crit-${i}`}>{item}</li>)}
                </ul>
            </div>
             <div className="bg-sky-50 dark:bg-sky-900/50 p-4 rounded-lg border-l-4 border-sky-500">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Best For</h4>
                <p className="text-slate-700 dark:text-slate-300">{insight.bestFor}</p>
             </div>
             <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200">The Verdict</h4>
                <p className="text-slate-600 dark:text-slate-300">{insight.verdict}</p>
             </div>
        </div>
    );
};
