import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables before any other imports
dotenv.config({ path: `${__dirname}/.env` });

// Check if API_KEY is loaded
if (!process.env.API_KEY) {
    throw new Error('API_KEY not found in .env file');
}

import express from 'express';
import cors from 'cors';

// Import your API logic
import generateComparison from './api/generate-comparison.ts';
import generateCourseDetails from './api/generate-course-details.ts';
import generateCourseList from './api/generate-course-list.ts';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API endpoints
app.post('/api/generate-comparison', generateComparison);
app.post('/api/generate-course-details', generateCourseDetails);
app.post('/api/generate-course-list', generateCourseList);

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
    console.log('Environment variables loaded:', {
        API_KEY: process.env.API_KEY ? 'Set' : 'Not set'
    });
});
