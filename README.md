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

## 🧱 HTML Structure (index.html)

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

**Purpose:** Instantiate the Hugging Face Inference client using the API key stored in environment variables.

**Benefit:** Establishes a secure and authenticated connection to Hugging Face's hosted models, enabling the backend to send prompts and receive AI-generated recipe suggestions.

**Explanation:** This line creates a new instance of the `HfInference` class, which acts as a bridge between the Express server and Hugging Face's Mixtral model. By passing `process.env.HF_API_KEY`, the client authenticates requests without exposing sensitive credentials in the codebase. This setup allows the backend to send structure prompts, based on user-provided ingredients, and retrieve natural language responses that simulate a chef's recommendation. It's a critical step that enables the core functionality of transforming ingredient lists into creative, AI-powered recipes.<br><br>

```js
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients...
`;
```

**Purpose:** Define the behavior of the AI assistant.

**Benefit:** Ensures consistent and relevant responses from the model.

**Explanation:** Sets the context for the AI to generate recipe suggestions.<br><br>

```js
app.post("/api", async (req, res) => { ... });
```

**Purpose:** Define the `/api` POST route that handles incoming requests from the frontend containing ingredient data.

**Benefit:** Establishes a dedicated endpoint where the React application can submit prompts and receive AI-generated recipe suggestions, enabling dynamic interaction between user input and the Mixtral model.

**Explanation:** This route is the core bridge between the user interface and the AI assistant. When a user enters ingredients and clicks "Get a recipe", the frontend sends a POST request to `/api` with JSON payload containing the prompt. The backend extracts this prompt from `req.body`, formats it with a system message to guide the model's behavior, and sends it to Hugging Face's Mixtral model using the `hf.chatCompletion()` method. Once the model returns a response, the backend sends it back to the frontend as a JSON object. This route encapsulates the entire flow of data, from the user input to AI output, making it the heart of the recipe generation experience.<br><br>

```js
const { prompt } = req.body;
```

