import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/ollama', async (req: Request, res: Response): Promise<void> => {
  
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  try {
    const ollamaResponse = await axios.post('http://localhost:11434/infer', {
      prompt,
    });

    res.json({ response: ollamaResponse.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong with Ollama' });
  }
});
app.get('/status', (req: Request, res: Response): void => {
  res.json({ status: 'Server is running', message: 'Ollama API is available' });
});

app.listen(port, '0.0.0.0', async () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
