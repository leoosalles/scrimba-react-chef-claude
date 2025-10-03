# 👨‍🍳 Chef Claude: AI-Powered Recipe Generator

**Chef Claude** is a React-based web application that allows users to input a list of ingredients they have on hand and receive AI-generated recipe suggestion. The project integrates a **Node.js + Express backend** with the **Hugging Face Inference API**, leveraging the `Mixtral-8x7B-Instruct` model to generate creative recipe outputs in raw Markdown format.

On the frontend, built with **React and Vite**, users can:

- Add ingredients dynamically through a form.
- View their list of available ingredients.
- Request a recipe suggestion once enough ingredients have been provided.
- Convert raw Markdown recipe text into accessible, styled HTML using `ReactMarkdown` and `remark-gfm`.

The backend handles API requests securely, using environment variables for the Hugging Face API key and applying **CORS** and JSON middleware for safe data handling.

Styling is implemented with **CSS** to ensure a clean, responsive, and user-friendly interface. Accessibility considerations such as `aria-live`, semantic HTML, and keyboard-friendly navigation were included to enhance usability.

This project was developed as a required activity for the **Learn React** module, part of the **Frontend Development Specialization** course offered by Scrimba. It combines essential frontend skills (state management, conditional rendering, component composition) with backend integration and external API usage, making it a pratical exercise in **full-stack React development**.

---

## 🎯 Learning Goals

- Build and organize React components with clear separation of concerns
- Manage state and update the UI dynamically based on user input
- Pass and handle props effectively between components
- Integrate a Node.js + Express backend with a React frontend
- Consume an external API (Hugging Face Inference API) securely using environment variables
- Render AI-generated markdown content safety with `ReactMarkdown` and `remark-gfm`
- Apply responsive and accessible styling using semantic HTML, ARIA attributes, and keyboard navigation
- Practice full-stack development by combining frontend, backend, and third-party API integration

---

## 📌 Features

- Add ingredients dynamically through a responsive input form
- Display a live list of all ingredients added by the user
- Generate AI-powered recipe suggestions using Hugging Face's Mixtral-8x7B-Instruct model
- Convert raw Markdown recipe text into accessible, styled HTML using `ReactMarkdown` and `remark-gfm`
- Graceful error handling for empty inputs, API failures, and network issues
- Accessible design with semantic HTML, `aria-live` regions, and keyboard-friendly navigation
- Modular React architecture with reusable components for header, form, ingredient list, and recipe display
- Backend integration with Node.js + Express for secure API requests and environment variable management

---

## 📂 Project Structure

```
📁 root/
┃ 📁 frontend/
┃ ┣ 📁 node_modules/
┃ ┣ 📁 src/
┃ ┃ ┣ 📂 components/
┃ ┃ ┃ ┣ 📄 Header.jsx
┃ ┃ ┃ ┣ 📄 Main.jsx
┃ ┃ ┃ ┣ 📄 IngredientsList.jsx
┃ ┃ ┃ ┗ 📄 ClaudeRecipe.jsx
┃ ┃ ┣ 📂 images/
┃ ┃ ┃ ┗ 🖼️ chef-claude-icon.png
┃ ┃ ┣ 📄 App.jsx
┃ ┃ ┣ 📄 index.jsx
┃ ┃ ┣ 📄 ai.js
┃ ┃ ┗ 📄 index.css
┃ ┣ 📄 .gitignore
┃ ┗ 📄 index.html
┗ 📁 backend/
  ┣ 📁 node_modules/
  ┣ 📄 server.js
  ┣ 📄 .gitignore
  ┗ 📄 .env
```

---

## ⚙️ Backend

### `server.js` file

```js
import express from "express";
```

**Purpose:** Import the Express framework to build the backend server for the application.

**Benefit:** Provides a robust and minimalist structure to handle HTTP requests, define API endpoints, and manage middleware, essential for connecting the frontend React app to the AI-powered recipe generation logic.

**Explanation:** In this project, Express serves as the backbone of the backend service. It allows me to define a `/api` POST route that receives ingredient data from the frontend, forwards it to Hugging Face's Mixtral model, and returns a recipe suggestion. Express' simplicity and flexibility make it ideal for rapid development and integration with external APIs like Hugging Face, while also supporting middleware like `cors` and `express.json()` to ensure smooth communication and data handling.<br><br>

```js
import dotenv from "dotenv";
```

**Purpose:** Import the `dotenv` package to enable loading of environment varibles from a `.env` file into `process.env`.

**Benefit:** Centralizes configuration and protects sensitive information, such as the Hugging Face API key, by keeping it outside the source code and version control.

**Explanation:** In the Chef Claude project, the backend communicates with Hugging Face's Mixtral model to generate recipes based on user-provided ingredients. To authenticate these requests securely, the API key is stored in a `.env` file and accessed via `process.env.HF_API_KEY`. By importing and configuring `dotenv`, the server can read this key at runtime without exposing it in the codebase. This approach enhances security, simplifies deployment across environments (development, staging, production), and aligns with best practices for managing secrets in Node.js applications.<br><br>

```js
import cors from "cors";
```

**Purpose:** Import the CORS (Cross-Origin Resource Sharing) middleware to manage and authorize requests between different origins.

**Benefit:** Enables the React frontend, served from a different port or domain, to communicate securely and reliably with the Express backend, avoiding browser-imposed restrictions.

**Explanation:** In the Chef Claude application, the frontend (typically running on `localhost:5173` or similar during development) sends ingredient data to the backend API hosted on `localhost:3000`. By default, browsers block such cross-origin requests for security reasons. The `cors` middleware explicitly allows these requests, ensuring that the frontend can fetch AI-generated recipes without triggering CORS errors. This setup is essential for local development and can be fine-tuned for production to restrict access to trusted domains only.<br><br>

```js
import { HfInference } from "@huggingface/inference";
```

**Purpose:** Import the Hugging Face Inference SDK to interact with hosted machine learning models via API.

**Benefit:** Enables seamless integration with Hugging Face's powerful language models, specifically Mixtral, in order to generate intelligent, context-aware recipe suggestions based on user-provided ingredients.

**Explanation:** In this project, the backend needs to send structured prompts to an AI model and receive natural language responses that resemble human-written recipes. The `HfInference` class abstracts the complexity of making raw HTTP requests to Hugging Face's API and provides a clean, promise-based interface for invoking models like `mistralai/Mixtral-8x7B-Instruct-v0.1`. This allows the server to focus on formatting prompts and handling responses, while the SDK manages authentication, request formatting, and communication with the model endpoint. By using this client, the project benefits from reliability, scalability, and access to cutting-edge generative AI capabilities.<br><br>

```js
dotenv.config();
```

**Purpose:** Activate the `dotenv` configuration to load environment variables from the `.env` file into `process.env`.

**Benefit:** Grants secure and centralized access to sensitive configuration values, such as the Hugging Face API key, without hardcoding them into the source code.

**Explanation:** This line ensures that variables defined in the `.env` file (like `HF_API_KEY` and optionally `PORT`) are available throughout the application via `process.env`.<br><br>

```js
const app = express();
```

**Purpose:** Instantiate the Express application to serve as the foundation of the backend server.

**Benefit:** Initializes the server environment, enabling the definition of routes, middleware, and request handling logic that connects the frontend to the AI-powered recipe engine.

**Explanation:** This `app` object becomes the central interface for configuring the backend. It allows me to define the `/api` POST endpoint that receives ingredient data from the React frontend, applies middleware like `cors` and `express.json()`, and communicates with Hugging Face's Mixtral model.<br><br>

```js
app.use(cors());
```

**Purpose:** Apply the CORS (Cross-Origin Resource Sharing) middleware globally to the Express application.

**Benefit:** Enables the React frontend, typically running on a different port (e.g., `localhost:5173`), to send HTTP requests to the backend server (`localhost:3000`) without being blocked by the browser's same-origin policy.

**Explanation:** The frontend and backend operate on separate origins during development. Browsers enforce strict cross-origin rules to prevent unauthorized data access, which would normally block these requests. By using `cors()` as middleware, the server explicitly allows requests from other origins, ensuring that the frontend can successfully communicate with the backend to submit ingredients and retrive AI-generated recipes.<br><br>

```js
app.use(express.json());
```

**Purpose:** Register Express' built-in middleware to automatically parse incoming request bodies formatted as JSON.

**Benefit:** Transforms raw JSON payloads into usable JavaScript objects, allowing the backend to easily access and manipulate data sent from the frontend, such as the list of ingredients.

**Explanation:** The frontend sends a POST request to the `/api` endpoint with a JSON body containing a prompt built from the user's ingredients. This middleware ensures that `req.body` is correctly parsed and accessible as a JavaScript object, enabling the server to extract the prompt and forward it to Hugging Face's Mixtral model. Without this line, the backend would not be able to interpret the JSON payload, resulting in undefined or malformed data during recipe generation.<br><br>

```js
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```

**Purpose:** Register a custom middleware that logs every incoming HTTP request to the server.

**Benefit:** Facilitates debugging, performance tracking, and visibility into how the frontend interacts with the backend, especially useful during development and testing.

**Explanation:** This middleware captures and prints a log entry for each request, including a timestamp (`new Date().toISOString()`), the HTTP method (`GET`, `POST`, etc), and the requested URL. This helps me to monitor activity such as when the frontend sends a POST to `/api` to generate a recipe. The `next()` function ensures that the request continues through the middleware stack, allowing subsequent handlers (like JSON parsing or route logic) to execute. This lightweight logging is invaluable for tracing issues, verifying request flow, and understanding user behavior during recipe generation.<br><br>

```js
const hf = new HfInference(process.env.HF_API_KEY);
```

**Purpose:** Instantiates the Hugging Face Inference client using the API key stored in environment variables.

**Benefit:** Establishes a secure and authenticated connection to Hugging Face's hosted models, enabling the backend to send prompts and receive AI-generated recipe suggestions.

**Explanation:** This line creates a new instance of the `HfInference` class, which acts as a bridge between the Express server and Hugging Face's Mixtral model. By passing `process.env.HF_API_KEY`, the client authenticates requests without exposing sensitive credentials in the codebase. This setup allows the backend to send structure prompts, based on user-provided ingredients, and retrieve natural language responses that simulate a chef's recommendation. It's a critical step that enables the core functionality of transforming ingredient lists into creative, AI-powered recipes.<br><br>

```js
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients...
`;
```

**Purpose:** Defines the behavior of the AI assistant.

**Benefit:** Ensures consistent and relevant responses from the model.

**Explanation:** Sets the context for the AI to generate recipe suggestions.<br><br>

```js
app.post("/api", async (req, res) => { ... });
```

**Purpose:** Defines the `/api` POST route that handles incoming requests from the frontend containing ingredient data.

**Benefit:** Establishes a dedicated endpoint where the React application can submit prompts and receive AI-generated recipe suggestions, enabling dynamic interaction between user input and the Mixtral model.

**Explanation:** This route is the core bridge between the user interface and the AI assistant. When a user enters ingredients and clicks "Get a recipe", the frontend sends a POST request to `/api` with JSON payload containing the prompt. The backend extracts this prompt from `req.body`, formats it with a system message to guide the model's behavior, and sends it to Hugging Face's Mixtral model using the `hf.chatCompletion()` method. Once the model returns a response, the backend sends it back to the frontend as a JSON object. This route encapsulates the entire flow of data, from the user input to AI output, making it the heart of the recipe generation experience.<br><br>

```js
const { prompt } = req.body;
```

**Purpose:** Extracts the `prompt` property from the incoming JSON payload sent in the HTTP request body.

**Benefit:** Captures the user's input, specifically the list of ingredients or culinary context, submitted via the frontend, making it available for processing by the backend.

**Explanation:** When a user enters ingredients and clicks the button to generate a recipe, the React frontend sends a POST request to the `/api` endpoint with JSON object containing a `prompt` field. This line uses object destructuring to isolate that field from `req.body`, allowing the backend to pass it directly to Hugging Face's Mixtral model. The `prompt` serves as the core input for the AI, guiding it to generate a personalized recipe recommendation based on the user's ingredients.<br><br>

```js
if (!prompt || typeof prompt !== "string") {
  return res.status(400).json({ error: "prompt (string) is required" });
}
```

**Purpose:** Validates the structure and type of the incoming `prompt` to ensure it is a non-empty string before proceeding with AI inference.

**Benefit:** Prevents malformed or missing data from being sent to Hugging Face's Mixtral model, avoiding unnecessary API calls, potencial errors, and wasted compute resources.

**Explanation:** This conditional check acts as a safeguard against invalid requests. The frontend is expected to send a JSON payload with a `prompt` field containing a string built from the user's ingredient list. This validation ensures that the `prompt` exists and is of the correct type (`string`). If the check fails, due to a missing field, null value, or incorrect type, the server immediately responds with a `400 Bad Request` status and a descriptive error message. This early rejection improves robustness, helps me catch issues during integration, and ensures that only well-formed prompts reach the AI model for recipe generation.<br><br>

```js
const response = await hf.chatCompletion({
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: prompt },
  ],
  max_tokens: 1024,
});
```

**Purpose:** Sends a structured prompt, composed of a system directive and user input, to Hugging Face's Mixtral model using the `chatCompletion` method.

**Benefit:** Harnesses the capabilities of a cutting-edge large language model (LLM) to generate rich, coherent, and context-aware recipe suggestions based on the ingredients provided by the user.

**Explanation:** This line initiates the core AI interaction. The `chatCompletion` method mimics a conversational exchange, where the `system` message sets the behavior and tone of the model (e.g., "You are a helpful chef"), and the `user` message contains the actual ingredient prompt submitted via the frontend. The model used (`mistralai/Mixtral-8x7B-Instruct-v0.1`) is optimized for instruction-following tasks, making it ideal for generating recipes. The `max_tokens` parameter limits the length of the response to ensure concise output. Once the model processes the input, it returns a completion object containing the generated recipe, which is then sent back to the frontend for display.<br><br>

```js
const text =
  response?.choices?.[0]?.message?.content ??
  response?.generated_text ??
  JSON.stringify(response);
```

**Purpose:** Extracts the AI-generated recipe text from the Hugging Face response object, accounting for variations in response structure.

**Benefit:** Ensures robust and fault-tolerant parsing of the model's output, regardless of whether the response follows the chat-style-format (`choices.[0].message.content`) or a simpler text-based format (`generated_text`).

**Explanation:** This line is responsible for retrieving the actual recipe generated by the Mixtral model. Hugging Face's API may return different response shapes depending on the model or endpoint used. To handle this gracefully, the code uses optional chaining (`?.`) to safely access nested properties without throwing errors if any part is undefined. It also uses the nullish coalescing operator (`??`) to fall back to alternative formats: first checking for `choices[0].message.content`, then `generated_text`, and finally converting the entire response to a string as a last resort. This approach guarantees that the backend always returns a usable string to the frontend, even if the model's output format changes or is unexpectedly structured.<br><br>

```js
res.json({ text });
```

**Purpose:** Sends the AI-generated recipe back to the frontend as a JSON response.

**Benefit:** Makes the model's output accessible to the React application, allowing it to render the recipe dynamically in the user interface.

**Explanation:** This line finalizes the `/api` route by returning the processed result from Hugging Face's Mixtral model. The `text` variable contains the recipe generated based on the user's ingredients. By wrapping it in a JSON object and sending it via `res.json()`, the server ensures that the frontend receives a structured response it can easily parse and display. This step completes the request-response cycle, transforming user input into a personalized recipe powered by AI.<br><br>

```js
} catch (err) {
  console.error("Error in /api route:", err);
  res.status(500).json({ error: err.message ?? "Internal server error" });
}
```

**Purpose:** Handles unexpected runtime errors that may occur during the execution of the `/api` route, ensuring the server remains stable and responsive.

**Benefit:** Prevents the backend from crashing due to unhandled exceptions and provides the frontend with a clear, structured error response, improving resilience and user experience.

**Explanation:** This `catch` block wraps the asychronous logic that sends prompts to Hugging Face and processes the model's response. If any part of that process fails, due to network issues, invalid API keys, malformed responses, or internal bugs, the error is caught here. The `console.error()` logs the full error details to the server console for debugging purposes, while `res.status(500).json(...)` sends a simplified error message to the client.<br><br>

```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

**Purpose:** Defines a port for the Express server and starts listening for incoming HTTP requests.

**Benefit:** Enables the backend to operate both in local development and in production environments (e.g., on platforms like Vercel, Render, or Railway) by dynamically selecting the appropriate port.

**Explanation:** This snippet ensures that the server is accessible and ready to handle requests from the frontend. It first checks if a `PORT` variable is defined in the environment, typically injected by the hosting provider during deployment. If not, it defaults to port `3000`, which is standard for local development. Once the server starts, it logs a message to the console with the full local URL, helping me to confirm that the backend is running and reachable. This setup is essential for completing the frontend-backend communication loop, allowing users to submit ingredients and receive AI-generated recipes.<br><br>

### `.gitignore` file

```gitignore
node_modules/
```

**Purpose:** Excludes the `node_modules` directory from version control.

**Benefit:** Prevents unnecessary files (thousands of dependencies installed via npm) from being tracked in Git, reducing repository size and avoiding conflicts.

**Explanation:** `node_modules` contains third-party packages that can be installed anytime using `npm install`. Since they are reproducible from `package.json` and `package-lock.json`, they should never be committed.<br><br>

```gitignore
.env
```

**Purpose:** Excludes the `.env` file that stores environment variables (e.g., API keys, database credentials, and configuration values).

**Benefit:** Protects sensitive information from being exposed publicly in the repository and avoids environment-specific settings being shared across developers.

**Explanation:** Each developer or deployment environment can create their own `.env` file locally, ensuring security and flexibility without affecting others.<br><br>

---

## 🖥️ Frontend

### 🧱 HTML Structure (index.html)

- Root container `<div id="root"></div>` for mounting the React application
- React entry script `<script type="module" src="./src/index.jsx"></script>`
- Entire page structure (header, forms, recipe display) created via React components (Header, IngredientsList, ClaudeRecipe, Main)
- Component-based layout ensures reusability and modular design
- Responsive and semantic content rendered dynamically through JSX
- Recipes, ingredients, and user interactions managed via props and centralized state<br><br>

```html
<div id="root"></div>
```

**Purpose:** Serves as the root container where the React application will be mounted.

**Benefit:** Provides a single, central DOM node for React to manage, enabling dynamic rendering and component-based updates.

**Explanation:** React's `createRoot` method targets this element to inject the entire application, allowing React to handle all UI changes efficiently without manipulating the DOM manually.<br><br>

```html
<script type="module" src="./src/index.jsx"></script>
```

**Purpose:** Loads the main React entry point as an ES module.

**Benefit:** Ensures modern JavaScript features (import/export) are supported, keeping the code modular and maintainable.

**Explanation:** This script initializes the React app by importing the `App` component and rendering it inside the `#root` element with `createRoot`, establishing the starting point of the application.<br><br>

