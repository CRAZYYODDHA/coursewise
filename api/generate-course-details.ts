import { GoogleGenAI } from "@google/genai";
import type { Course } from '../types';
import type { Request, Response } from 'express';

const parseJsonResponse = <T>(text: string): T => {
    let jsonStr = text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    try {
        return JSON.parse(jsonStr) as T;
    } catch (e) {
        console.error("Failed to parse JSON response on server:", e);
        console.error("Original AI response text on server:", text);
        throw new Error("AI returned a response that could not be parsed as JSON.");
    }
}

const handler = async (req: Request, res: Response) => {
    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set on the server");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const { courseName, platformName } = req.body;

        if (!courseName || !platformName) {
            return res.status(400).json({ error: 'Course name and platform name are required.' });
        }

        const prompt = `
            You are a course curriculum designer. Create the details for a fictional but realistic course called "${courseName}" offered on the platform "${platformName}".
            Your response MUST be a single, valid JSON object with the exact following structure:
            {
                "description": "A detailed, engaging paragraph (3-4 sentences) describing the course, its main topics, and who it's for.",
                "instructor": {
                "name": "A plausible-sounding instructor name (e.g., 'Dr. Eleanor Vance', 'The Code & Pixels Team', 'Alex Chen')",
                "title": "A plausible-sounding title (e.g., 'Lead Data Scientist', 'AWS Hero & Instructor', 'Creative Director')"
                },
                "tags": [
                "A list of 4-5 relevant and specific keyword tags for the course (e.g., 'Python', 'Machine Learning', 'TensorFlow', 'Data Visualization')."
                ],
                "reviewDistribution": [
                // A list of 5 objects representing a breakdown of positive reviews. Percentages MUST sum to 100.
                // The names should be specific to the likely strengths of such a course.
                { "name": "A review category (e.g., 'Project Realism')", "percentage": 30 },
                { "name": "Another category", "percentage": 25 },
                { "name": "Another category", "percentage": 20 },
                { "name": "Another category", "percentage": 15 },
                { "name": "Another category", "percentage": 10 }
                ]
            }
            Do not include any text outside of the JSON object. The percentages in 'reviewDistribution' must add up to 100.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                temperature: 0.7,
                responseMimeType: "application/json",
            }
        });

        let parsed = parseJsonResponse<Omit<Course, 'id' | 'platformId'>>(response.text);

        // Normalize percentages to ensure they sum to 100
        const totalPercentage = parsed.reviewDistribution.reduce((sum, item) => sum + item.percentage, 0);
        if (Math.abs(totalPercentage - 100) > 1) {
            parsed.reviewDistribution = parsed.reviewDistribution.map(item => ({
                ...item,
                percentage: Math.round((item.percentage / totalPercentage) * 100)
            }));
            const finalSum = parsed.reviewDistribution.reduce((sum, item) => sum + item.percentage, 0);
            if (finalSum !== 100 && parsed.reviewDistribution.length > 0) {
                parsed.reviewDistribution[parsed.reviewDistribution.length - 1].percentage += 100 - finalSum;
            }
        }

        return res.status(200).json(parsed);
    } catch (error) {
        console.error('Error in /api/generate-course-details:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
};

export default handler;
