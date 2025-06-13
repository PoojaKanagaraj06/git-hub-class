import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// Import task routes
import taskRoutes from './routes/tasks.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Default to 3001 if not in .env

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Mount task routes
app.use('/api/tasks', taskRoutes);

// Simple route for testing
app.get('/', (req, res) => {
  res.send('VoiceTask Calendar API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
