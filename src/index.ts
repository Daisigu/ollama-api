import express, { Request, Response } from "express";
import ollama from "ollama";

const app = express();
const port = 3001;
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.API_TOKEN;

app.use(express.json());

const validateToken = (req: Request, res: Response, next: Function): void => {
  const token = req.headers["authorization"];
  if (!token || token !== `Bearer ${TOKEN}`) {
    res.status(403).json({ error: "Forbidden: Invalid or missing token" });
    return;
  }
  next();
};

app.post("/ollama", validateToken, async (req: Request, res: Response): Promise<void> => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required", body: req.body });
    return;
  }

  try {
    const response = await ollama.chat({
      model: "llama3.2-vision:11b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong with Ollama" });
  }
});

app.get("/status", (req: Request, res: Response): void => {
  res.json({ status: "Server is running", message: "Ollama API is available" });
});

app.listen(port, "0.0.0.0", async () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
