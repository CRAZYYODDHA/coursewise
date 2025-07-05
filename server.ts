import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables before any other imports
dotenv.config({ path: `${__dirname}/.env` });

// Check if API_KEY is loaded
if (!process.env.API_KEY) {
    console.warn('API_KEY not found in .env file. API functionality may be limited.');
}

import express from 'express';
import cors from 'cors';

// Import your API logic
import generateComparison from './api/generate-comparison.ts';
import generateCourseDetails from './api/generate-course-details.ts';
import generateCourseList from './api/generate-course-list.ts';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API endpoints
app.post('/api/generate-comparison', generateComparison);
app.post('/api/generate-course-details', generateCourseDetails);
app.post('/api/generate-course-list', generateCourseList);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the 'dist' directory (Vite's output)
    app.use(express.static(join(__dirname, 'dist')));

    // Handle all other routes by serving the index.html
    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
    console.log('Environment variables loaded:', {
        API_KEY: process.env.API_KEY ? 'Set' : 'Not set'
    });
});
