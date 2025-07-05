import { GoogleGenAI } from "@google/genai";
import type { StructuredComparisonResult, ComparisonSubject } from '../types';
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

        const { item1, item2 } = req.body as { item1: ComparisonSubject, item2: ComparisonSubject };

        if (!item1 || !item2) {
            return res.status(400).json({ error: 'Two items are required for comparison.' });
        }

        const context1 = item1.reviewInsight ? `\n        Here is some pre-analyzed data for ${item1.name}:\n        - Common Praise: ${item1.reviewInsight.praise.join(', ')}\n        - Common Criticisms: ${item1.reviewInsight.criticism.join(', ')}\n        ` : '';

        const context2 = item2.reviewInsight ? `\n        Here is some pre-analyzed data for ${item2.name}:\n        - Common Praise: ${item2.reviewInsight.praise.join(', ')}\n        - Common Criticisms: ${item2.reviewInsight.criticism.join(', ')}\n        ` : '';

        const prompt = `\n            You are an expert educational analyst. Compare two learning options.\n\n            Option 1 is a ${item1.type} named \"${item1.name}\". Its description is: \"${item1.description}\". ${context1}\n\n            Option 2 is a ${item2.type} named \"${item2.name}\". Its description is: \"${item2.description}\". ${context2}\n\n            Analyze them based on the criteria below. Your response MUST be a single, valid JSON object, without any markdown formatting or text outside the JSON.\n            The name for each item in your response MUST exactly match the names provided above.\n\n            The JSON object should have the structure: { \"item1\": {...}, \"item2\": {...}, \"verdict\": \"...\" }.\n\n            For each item, provide the following:\n            1.  \"name\": The name of the item being analyzed.\n            2.  \"ratings\": An array of 4 objects. Each object must have a \"name\" and a \"score\" (from 1 to 10). The names must be exactly: \"Beginner Friendliness\", \"Practicality (Hands-on)\", \"Content Depth\", and \"Value for Money\".\n            3.  \"pros\": An array of 3-4 strings detailing the key advantages.\n            4.  \"cons\": An array of 3-4 strings detailing the key disadvantages.\n            \n            The top-level \"verdict\" property should contain a final, decisive recommendation on who should choose which option and why. Base your analysis on the descriptions and the provided review context.\n        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                temperature: 0,
                responseMimeType: "application/json",
            }
        });

        const parsedData = parseJsonResponse<StructuredComparisonResult>(response.text);
        if (!parsedData.item1 || !parsedData.item2 || !parsedData.verdict) {
            throw new Error("Invalid JSON structure received from AI.");
        }

        return res.status(200).json(parsedData);
    } catch (error) {
        console.error('Error in /api/generate-comparison:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
};

export default handler;
