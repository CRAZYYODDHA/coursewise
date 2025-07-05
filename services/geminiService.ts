import type { StructuredComparisonResult, ComparisonSubject, Course } from '../types';

const handleApiResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'An unknown API error occurred.' }));
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    return response.json() as Promise<T>;
};

const generateComparison = async (item1: ComparisonSubject, item2: ComparisonSubject): Promise<StructuredComparisonResult> => {
    const response = await fetch('/api/generate-comparison', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item1, item2 }),
    });
    return handleApiResponse<StructuredComparisonResult>(response);
};

const generateCourseList = async (searchTerm: string, platformName: string): Promise<{ name: string }[]> => {
    const response = await fetch('/api/generate-course-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm, platformName }),
    });
    return handleApiResponse<{ name: string }[]>(response);
};

const generateCourseDetails = async (courseName: string, platformName: string): Promise<Omit<Course, 'id' | 'platformId'>> => {
    const response = await fetch('/api/generate-course-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseName, platformName }),
    });
    return handleApiResponse<Omit<Course, 'id' | 'platformId'>>(response);
};


export const geminiService = {
    generateComparison,
    generateCourseList,
    generateCourseDetails
};