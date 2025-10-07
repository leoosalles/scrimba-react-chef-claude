import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const hf = new HfInference(process.env.HF_API_KEY);

const SYSTEM_PROMPT = `
You are a culinary assistant that receives a list of ingredients from the user and suggests a recipe they could make using some or all of those ingredients. You may include a few additional ingredients if necessary, but keep them minimal. Your response must be formatted strictly using Markdown syntax only — no HTML, no plain text, no other formats. The Markdown should be clean and readable, suitable for rendering directly on a web page. Your response must be formatted using Markdown only — headings, bullet points, and paragraphs are allowed. Do not use code blocks or backticks.
`;

app.post("/api", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "prompt (string) is required" });
    }

    console.log("Sending prompt to Hugging Face...");
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
    });

    const text =
      response?.choices?.[0]?.message?.content ??
      response?.generated_text ??
      JSON.stringify(response);

    console.log("Response received successfully");
    res.json({ text });
  } catch (err) {
    console.error("Error in /api route:", err);
    res.status(500).json({ error: err.message ?? "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});