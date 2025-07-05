import { GoogleGenAI } from "@google/genai";
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

        const { searchTerm, platformName } = req.body;

        if (!searchTerm || !platformName) {
            return res.status(400).json({ error: 'Search term and platform name are required.' });
        }

        const prompt = `
            You are a course catalog generator. A user is searching for "${searchTerm}" on the platform "${platformName}".
            Generate a list of 5 realistic, relevant, and plausible-sounding course titles that a user might find on that platform.
            The titles should be creative and specific. Do not generate existing course titles.
            Return the response as a valid JSON array of objects, where each object has a "name" property.
            
            Example response for a search of "python web" on "Udemy":
            [
                {"name": "The Ultimate Python & Django Full-Stack Web Bootcamp"},
                {"name": "Flask for Beginners: Build & Deploy RESTful APIs"},
                {"name": "Asynchronous Python: Advanced Web Development with FastAPI"},
                {"name": "Microservices with Python, Flask, and Docker"},
                {"name": "Web Scraping & Automation with Python: Scrapy and Selenium"}
            ]

            Your response MUST be only the JSON array.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                temperature: 0.8,
                responseMimeType: "application/json",
            }
        });

        const data = parseJsonResponse<{ name: string }[]>(response.text);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in /api/generate-course-list:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
};

export default handler;
