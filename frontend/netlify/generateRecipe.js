import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_API_KEY);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients, but try not to include too many extras. Format your response in markdown to make it easier to render on a web page.
`;

export async function handler(event, context) {
  try {
    const { prompt } = JSON.parse(event.body);

    if (!prompt || typeof prompt !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "prompt (string) is required" }),
      };
    }

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

    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message ?? "Internal server error" }),
    };
  }
};