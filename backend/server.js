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
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients, but try not to include too many extras. Format your response in markdown to make it easier to render on a web page. Do not use code blocks or backticks.
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