import express from 'express';
import { environment } from './config/enviroment.js';
import ollamaRoutes from './routes/ollama.routes.js';

const app = express();

app.use(express.json());
app.use('/ollama', ollamaRoutes);

app.listen(environment.port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${environment.port}`);
});
