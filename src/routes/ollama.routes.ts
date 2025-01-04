import { Router } from 'express';
import { validateToken } from '../middleware/auth.middleware.js';
import { OllamaService } from '../services/ollama.service.js';

const router = Router();

router.post('/', validateToken, async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        res.status(400).json({ error: 'Prompt is required', body: req.body });
        return;
    }
    
    try {
        const response = await OllamaService.chat(prompt);
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong with Ollama' });
    }
});

router.get('/status', (_req, res) => {
    res.json({ status: 'Server is running', message: 'Ollama API is available' });
});

export default router;