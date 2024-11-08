"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.post('/ollama', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    if (!prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
    }
    try {
        const ollamaResponse = yield axios_1.default.post('http://localhost:11434/infer', {
            prompt,
        });
        res.json({ response: ollamaResponse.data });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong with Ollama' });
    }
}));
app.get('/status', (req, res) => {
    res.json({ status: 'Server is running', message: 'Ollama API is available' });
});
app.listen(port, '0.0.0.0', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running at http://0.0.0.0:${port}`);
}));
