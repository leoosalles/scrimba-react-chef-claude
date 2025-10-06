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

### 🧱 HTML Structure


### `index.html` file

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

### ⚛️ React Component Code Explanation


### `index.jsx` file

```jsx
import { createRoot } from "react-dom/client";
```

**Purpose:** Imports the `createRoot` function from React's new rendering API.

**Benefit:** Provides an optimized way to attach React components to the DOM, replacing the older `ReactDOM.render` method.

**Explanation:** `createRoot` initializes a React "root" where the component tree will be rendered, enabling concurrent features and better performance in modern React apps.<br><br>

```jsx
import App from "./App.jsx";
```

**Purpose:** Imports the main application component.

**Benefit:** Centralizes the app's logic and UI into a reusable component that serves as the entry point.

**Explanation:** The `App` component acts as the top-level container, managing child components and routing if present.<br><br>

```jsx
const root = createRoot(document.querySelector('#root'));
```

**Purpose:** Creates a React root and link it to the `#root` element in the HTML.

**Benefit:** Connects React's virtual DOM to the actual DOM element, enabling React to control updates efficiently.

**Explanation:** `document.querySelector('root')` selects the `<div id="root"></div>` from the HTML file. `createRoot` binds React's rendering system to it, preparing the app to display content.<br><br>

```jsx
root.render(
  <App />
)
```

**Purpose:** Renders the `App` component inside the created React root.

**Benefit:** Displays the entire application within the specified DOM element while React manages updates efficiently.

**Explanation:** This mounts the `App` component (and everything inside it) to the browser, making the app visible and interactive for the user.<br><br>


### `App.jsx` file

```jsx
import { Header } from "./components/Header.jsx";
```

**Purpose:** Imports the `Header` component.

**Benefit:** Keeps the UI modular and reusable by separating the header section into its own file.

**Explanation:** This allows `App.jsx` to render a consistent header without duplicating code, improving maintainability.<br><br>

```jsx
import { Main } from "./components/Main.jsx";
```

**Purpose:** Imports `Main` component.

**Benefit:** Encapsulates the main content logic in a dedicated component for better structure and readability.

**Explanation:** This ensures that all core application content is handled separately, making the `App` cleaner and easier to manage.<br><br>

```jsx
export default function App() {...}
```

**Purpose:** Defines the root React component `App` and exports it as the default export.

**Benefit:** Enables `App` to be imported easily in `index.jsx` as the main entry point of the application.

**Explanation:** Default export ensures this component can be mounted directly onto the DOM by React, serving as the central container of the frontend.<br><br>

```jsx
return (
  <div className="container">
    <Header />
    <Main />
  </div>
);
```

**Purpose:** Returns the JSX structure of the app.

**Benefit:** Provides a clean layout with a container `<div>` wrapping the `Header` and `Main` components.

**Explanation:** The `<Header />` is rendered first (for branding/navigation), followed by `<Main />` (the dynamic content). The `className="container"` ensures global styling consistency.<br><br>


### `Header.jsx` file

```jsx
import chefClaudeLogo from "../images/chef-claude-icon.png";
```

**Purpose:** Imports the Chef Claude logo image from the `images` folder.

**Benefit:** Centralizes asset usage so the logo can be easily referenced, reused, or replaced without hardcoding paths multiple times.

**Explanation:** The imported image becomes a variable (`chefClaudeLogo`) that React can render in the component just like any other JavaScript resource.<br><br>

```jsx
function Header() {...}
```

**Purpose:** Declares the `Header` functional component.

**Benefit:** Encapsulates all header-related UI logic in a reusable, isolated function.

**Explanation:** This function defines the structure of the header, which can be reused in `App.jsx` or any other component.<br><br>

```jsx
return (
  <header className="header-container">
    ...
  </header>
);
```

**Purpose:** Begins the JSX returned by the component, wrapping content in a semantic `<header>` tag.

**Benefit:** Improves accessibility and SEO by indicating that this section represents the page header.

**Explanation:** The `className="header-container"` links this section to CSS styling, ensuring consistent design.<br><br>

```jsx
<img className="logo" src={chefClaudeLogo} alt="Chef Claude icon" />
```

**Purpose:** Renders the logo image with a CSS class and accessibility attributes.

**Benefit:** Displays the Chef Claude brand visually while keeping the site accessible for screen readers via the `alt` attribute.

**Explanation:** The `src` uses the imported variable `chefClaudeLogo`, ensuring the correct image file is bundled by the build process.<br><br>

```jsx
<h1 className="logo-title">Chef Claude</h1>
```

**Purpose:** Renders the main title of the application.

**Benefit:** Provides a clear, textual identity of the app for both users and search engines.

**Explanation:** The `<h1>` semantic tag ensures proper heading hierarchy, while `className="logo-title"` applies styling.<br><br>

```jsx
export { Header }
```

**Purpose:** Exports the `Header` component for use in other files, like `App.jsx`.

**Benefit:** Allows modular and reusable architecture, where components can be imported wherever needed.

**Explanation:** The named export makes it explicit which component is being exported, supporting scalable project structure.<br><br>


### `Main.jsx` file

```jsx
import { useState } from "react";
```

**Purpose:** Imports the `useState` hook from the React library to enable local state management within the `Main` functional component.

**Benefit:** Provides a way to store and update dynamic values, such as user input, loading indicators, and AI-generated recipe text, without relying on external state libraries or class components.

**Explanation:** The `Main` component is responsible for capturing the user's ingredients, sending them to the backend, and displaying the resulting recipe. To manage this interactive flow, `useState` is used to define reactive variables like `ingredients`, `loading`, and `recipeText`. These variables update automatically when the user types, submits a request, or receives a response. This hook is essential for maintaining a responsive and intuitive user experience, allowing the UI to reflect changes in real time as the user interacts with the app.<br><br>

```jsx
import { ClaudeRecipe } from "./ClaudeRecipe";
import { IngredientsList } from "./IngredientsList";
```

**Purpose:** Imports two child components, `ClaudeRecipe` and `IngredientsList`, to be used within the `Main` component.

**Benefit:** Promotes modularity and separation of concerns by delegating specific UI responsibilities to dedicated components, improving readability, maintainability, and scalability of the codebase.

**Explanation:** The `Main` component orchestrates the core user experience, but it delegates key visual and functional tasks to child components, `ClaudeRecipe` is responsible for rendering the AI-generated recipe, including formatting and presentation. `IngredientsList` manages the display of user-provided ingredients and controls the logic for triggering recipe generation (e.g., handling the "Get a recipe" button). By isolating these roles into separate files, the code remains clean and focused, making it easier to test, debug, and evolve each part of the interface independently.<br><br>

```jsx
function Main() {...}
```

**Purpose:** Declares the `Main` functional component.

**Benefit:** Encapsulates the app's core logic and main user interaction area.

**Explanation:** This component acts as the central hub for state management and UI flow.<br><br>

```jsx
const [ingredients, setIngredients] = useState([]);
const [recipeText, setRecipeText] = useState("");
const [loading, setLoading] = useState(false);
const [recipeShown, setRecipeShown] = useState(false);
```

**Purpose:** Declares and initializes four state variables using React's `useState` hook to manage the core interactive data within the `Main` component.

**Benefit:** Enables the UI to respond dynamically to user actions and backend responses by triggering re-renders whenever these values change.

**Explanation:** In the Chef Claude frontend, these state variables form the backbone of the user experience:
  - `ingredients`: Stores the list of ingredients typed by the user.
  - `recipeText`: Holds the recipe returned by the backend after AI inference.
  - `loading`: Tracks whether a request is in progress, allowing the UI to notify.
  - `recipeShown`: Controls whether the recipe section should be visible, helping toggle between input and output views.

Each `useState` call sets an initial value and returns a setter function (e.g., `setIngredients`) that updates the state. When any of these values change, React automatically re-renders the component to reflect the new state, ensuring a smooth and reactive interface.<br><br>

```jsx
function addIngredient(formData) { ... }
```

**Purpose:** Defines a reusable function named `addIngredient` that receives a `formData` object as its parameter, triggered by a form submission event.

**Benefit:** Acts as the centralized handler for capturing and validating new ingredient entries, ensuring that the application's state updates dynamically and consistently as users interact with the input form.

**Explanation:** The `addIngredient` function is designed to handle form submissions. It receives a `formData` object, which is an instance of the browser's `FormData` API. This object is created when the form is submitted and the associated handler is invoked. Crucially, this function is linked to the form via `action` attribute, which explicitly references the function by name (e.g., `action={addIngredient}` in JSX). This association ensures that when the form is submitted, React routes the submission event to the correct handler function. The form element itself is returned by the component and includes the necessary structure and attributes, such as `name` and `action`, to ensure proper behavior. Inside `addIngredient`, the function extracts the value of the input field (e.g., `formData.get("ingredient")`) and uptdates the `ingredients` state using its setter. This design keeps form-handling logic encapsulated, promotes reusability, and ensures that the form behaves predictably within the React component lifecycle.<br><br>

```jsx
const newIngredient = formData.get('ingredient');
```

**Purpose:** Extracts the value of the input named `ingredient` from the submitted form data.

**Benefit:** Retrieves the user's typed ingredient in a clean and declarative way, enabling validation and state updates without manual DOM access.

**Explanation:** This line is part of the `addIngredient` function, which handles form submissions. The `formData` parameter is an instance of the `FormData` API, automatically passed to the function because it is explicitly linked to the form via the `action` attribute. This attribute ensures that the form submission is routed to the correct handler function. The form itself is returned by the component and includes an input field with the `name="ingredient"` attribute. When the form is submitted, `formData.get('ingredient')` accesses the value of that specific input field. The result is stored in the `newIngredient` variable, which can then be validated and added to the `ingredients` state. This approach keeps the data flow declarative and avoids manual DOM querying, aligning with React's component-driven architecture.<br><br>

```jsx
if (newIngredient) {
  setIngredients(prevIngredients =>
    [...prevIngredients, newIngredient]);
}
```

**Purpose:** Updates the `ingredients` state by appending a new item, but only if the input value is not empty.

**Benefit:** Prevents invalid or blank entries from being added to the list while preserving all previously submitted ingredients, ensuring data integrity and a smooth user experience.

**Explanation:** This conditional block is part of the `addIngredient` function, which is linked to the form via the `action` attribute. After extracting the input value using `formData.get('ingredient')`, the code checks whether `newIngredient` contains a non-empty string. If the value is valid, the `setIngredients` function is called using its functional (updater) form: `prevIngredients => [...prevIngredients, newIngredient]`. This syntax uses the *spread operator* (`...`) to unpack all items from the previous `ingredients` array and create a new array that includes the new item at the end. This approach ensures immutability—React requires state updates to produce new objects rather than modifying existing ones—and avoids overwriting the previous state. The updater form also guarantees that the most recent state is used, preventing race conditions when multiple updates occur in rapid succession. As a result, the ingredient list remains reactive, consistent, and accurately reflects user input.<br><br>

```jsx
async function fetchRecipe() { ... }
```

**Purpose:** Declares an asynchronous function named `fetchRecipe` that handles the process of requesting a recipe from the backend.

**Benefit:** Enables the frontend to communicate with the backend using asynchronous HTTP requests, allowing the application to handle network delays without freezing the interface. This ensures that the UI remains responsive while waiting for the AI-generated recipe.

**Explanation:** This function is responsible for sending the current list of ingredients to the backend and retrieving the corresponding recipe. The `async` keyword indicates that the function will perform asynchronous operations, specifically using `await` to pause execution until the backend responds. This function is triggered when the user clicks the "Get a recipe" button, which is rendered by the `IngredientsList` component. The function encapsulates the entire request-response cycle: preparing the payload, sending it via `fetch`, handling loading states, and updating the `recipeText` and `recipeShown` state variables with the result. By isolating this logic in a named function, the code remains modular, readable, and easy to maintain.<br><br>

```jsx
if (ingredients.length === 0) return;
```

**Purpose:** Prevents the execution of the recipe-fetching logic when the ingredients list is empty.

**Benefit:** Avoids unnecessary backend requests and ensures that the application only attempts to generate a recipe when there is valid input from the user.

**Explanation:** This conditional check appears at the beginning of the `fetchRecipe` function. It verifies whether the `ingredients` array contains any items by checking its `.length` property. If the array is empty (`length === 0`), the function exits early using `return`, skipping the rest of the logic. This **guard clause** protects the backend from receiving invalid or incomplete requests and improves performance by eliminating redundant operations. It also contributes to a better user experience by silently ignoring recipe requests that lack ingredients, ensuring that only meaningful submissions trigger a response.<br><br>

```jsx
setLoading(true);
try {
  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: `You are an assistant that receives a list of ingredients          that a user has and suggests a recipe.\nUser ingredients:
      ${ingredients.join(", ")}`
    })
  });
```

**Purpose:** Sends a POST request to the backend API with the user's ingredient list formatted as a prompt.

**Benefit:** Connects the frontend to the AI-powered backend, enabling dynamic recipe generation based on user input. By using asynchronous communication, the UI remains responsive while the request is processed.

**Explanation:** This block initiates the recipe-fetching process within the `fetchRecipe` function. The following steps outline how the request is handled:
 - **Set loading state:** `setLoading(true)` activates the loading indicator, indicating that a request is currently in progress and enabling the UI to display a feedback message to the user.
 - **Initiate fetch request:** The `fetch` function is called with the backend endpoint `http://localhost:3000/api` using the `POST` method.
 - **Configure headers:** The request includes a `Content-Type` header set to `"application/json"` to inform the server that the payload is in JSON format.
 - **Build the payload:** A ``prompt` string is constructed using `ingredients.join(", ")`, which converts the array of ingredients into a comma-separated list.
 - **Send the prompt:** The prompt is embedded in the request body using `JSON.stringify`, guiding the backend assistant to generate a recipe based on the provided ingredients.
 - **Await the response:** The `await` keyword pauses execution until the backend responds, ensuring the UI remains non-blocking. Once the response arrives, `response.json()` is called to parse the JSON-formatted body into a JavaScript object. This parsed object (`data`) contains the recipe generated by the backend and is used to update the application state. This step is essential for converting raw network data into a usable format for rendering in the UI.
 - **Maintain responsiveness:** Because the request is asynchronous, the interface remains interactive during the process, users can still engage with the page while waiting for the recipe.
 - **Ensure clean architecture:** This structure separates data-fetching logic from rendering, promoting modularity and seamless integration between the React frontend and the backend service.<br><br>

```jsx
const data = await response.json();
```

**Purpose:** Updates the `recipeText` state with the recipe returned by the backend, or show a fallback message if no recipe was generated.

**Benefit:** Ensures that the UI displays meaningful feedback to the user, whether or not the backend returns a valid recipe.

**Explanation:** After the backend response is parsed with `const data = await response.json();`, this line sets the `recipeText` state using the value of `data.text`. The `text` property is created in the backend, inside the `POST /api` route defined in `backend/server.js`. There, the AI-generated recipe is extracted from the Hugging Face response using:

```jsx
const text =
  response?.choices?.[0]?.message?.content ??
  response?.generated_text ??
  JSON.stringify(response);
```

This value is then returned to the frontend with:

```jsx
res.json({ text });
```

On the frontend, `data.text` is expected to contain the recipe. If it's falsy (e.g., `undefined`, `null`, or an empty string), the fallback string `"No recipe generated."` is used instead. This is achieved using the logical OR operator (`||`), which ensures that `recipeText` always receives a valid string. The updated state is then rendered in the UI, allowing the user to view the recipe or an appropriate message.<br><br>

```jsx
setRecipeShown(true);
```

**Purpose:** Updates the `recipeShown` state to `true`, signaling that the recipe should now be displayed in the UI.

**Benefit:** Controls the visibility of the recipe section, allowing the interface to conditionally render the result only after a successful response is received.

**Explanation:** This line is called after the recipe is fetched and parsed from the backend. By setting `recipeShown` to `true`, the component triggers a re-render that reveals the recipe display area, hidden by default. This boolean flag acts as a visibility toggle, ensuring that the recipe content is only shown when available. It helps maintain a clean user experience by preventing premature rendering or layout shifts before the data is ready.<br><br>

```jsx
   } catch (err) {
     console.error(err);
     setRecipeText("An error occurred while generating the recipe.");
     setRecipeShown(true);
   } finally {
     setLoading(false);
   }
};
```

**Purpose:** Handles unexpected errors during the recipe-fetching process and ensures that the loading indicator is always reset, regardless of success or failure.

**Benefit:** Prevents the application from freezing or becoming unresponsive in case of backend or network failures, while providing clear feedback to the user and restoring interactivity.

**Explanation:** This block appears at the end of the `fetchRecipe` function, which performs an asynchronous request to the backend to generate a recipe using Hugging Face's Mixtral model. If any error occurs during the request, such as a failed network call, invalid response, or internal exception, the `catch` clause captures it and logs the error using `console.error(err)` for debugging purposes. The UI is then updated with a fallback message via `setRecipeText("An error occurred while generating the recipe.");`, ensuring the user is informed that something went wrong. The recipe section is revealed using `setRecipeShown(true)` so that the error message is visible in the expected layout. Finally, the `finally` block executes regardless of the outcome and calls `setLoading(false);` to reset the loading state, avoiding stuck messages.<br><br>

```jsx
function resetApp() {
  setIngredients([]);
  setRecipeText("");
  setRecipeShown(false);
};
```

**Purpose:** Resets the application state to its initial configuration by clearing the ingredients list, removing any generated recipe text, and hiding the recipe display area.

**Benefit:** Allows users to start fresh without residual data from previous interactions. This improves usability by offering a clean slate for each new recipe request and avoids confusion caused by leftover content.

**Explanation:** The `resetApp` function is used to restore the interface to its default state. It sets the ingredients array to an empty list using `setIngredients([])`, effectively removing all user-provided inputs. Then, it clears the recipe output by calling `setRecipeText("")`, ensuring that no previous recipe remains visible. Finally, `setRecipeShown(false)` hides the recipe section from the UI, returning the layout to its pre-submission state. This function is conditionally assigned to the `"Get a recipe"` button only when the recipe section is visible, that is, when `recipeShown` is `true`. In this case, the button's label is also dynamically changed to `"New Recipe"` to reflect its new role. This dual behavior ensures that the same button serves two distinct purposes depending on the application state: triggering a recipe request when no recipe is shown, and resetting the interface when a recipe is already displayed.<br><br>

```jsx
return (
  <main role="main">
    <section className="form-container">
      ...
    </section>
  </main>
)
```

**Purpose:** Defines the main layout structure of the Chef Claude interface, wrapping the form section inside semantic HTML elements for accessibility and clarity.

**Benefit:** Improves semantic markup and accessibility by clearly indicating the primary content area of the page. It also provides a clean container for styling and layout control vi the `form-container` class.

**Explanation:** This JSX block represents the top-level return statement of the component responsible for rendering the recipe input interface. The `<main>` tag is used with the `role="main"` attribute to explicitly declare the central content region of the page, which helps screen readers and accessibility tools identify the core functionality. Inside it, the `<section>` element with the class `form-container` serves as a styled wrapper for the form elements, such as the ingredients input and the action button.<br><br>

```jsx
<form className="add-ingredient-form" action={addIngredient}> ... </form>
```

**Purpose:** Declares the semantic structure for the ingredient submission interface and assign the form’s submission behavior to a specific handler via the action attribute.

**Benefit:** Enables users to input ingredients dynamically, triggering controlled state updates that feed into the recipe generation logic. This keeps the interface interactive and responsive to user input.

**Explanation:** This line defines the form element responsible for collecting individual ingredients from the user. The `<form>` tag is used to group related input elements in a semantically meaningful way, signaling to both the browser and assistive technologies that this section handles user-submitted data. The `className="add-ingredient-form"` applies scoped styling to control layout and spacing. The `action={addIngredient}` attribute assigns a custom submission handler to the form, allowing the application to intercept and process the input programmatically. This approach bypasses the default HTML form behavior (which would reload the page) and instead routes the submission through the designated function, enabling controlled state updates and dynamic interaction.<br><br>

```jsx
<fieldset>
  <legend className="sr-only">Form to add ingredients for AI-generated recipes</legend>
    ...
</fieldset>
```

**Purpose:** Groups related form elements into a single semantic unit and provide provides an accessible label for screen readers via the `<legend>` element.

**Benefit:** Enhances accessibility and semantic clarity by explicitly defining the purpose of the form section, allowing assistive technologies to interpret and navigate the interface more effectively.

**Explanation:** This block wraps the input field and button used to submit ingredients. The `<fieldset>` element is a semantic HTML tag used to group related controls within a form, signaling that they belong to a common function, in this case, ingredient submission. The `<legend>` element provides a textual description of the fieldset's purpose. It uses the `className="sr-only"` to visually hide the label while keeping it accessible to screen readers. This ensures that users relying on assistive technologies receive contextual information about the form's intent, even though the label is not visible on screen.<br><br>

```jsx
<div className="input-container">
  <input
    className="input-field"
    type="text"
    aria-label="Add ingredient"
    placeholder="e.g. oregano"
    name="ingredient"
  />
  <button type="submit" className="btn search">Add ingredient</button
</div>
```

**Purpose:** Groups the ingredient input field and submit button visually and semantically within a styled container.

**Benefit:** Provides a clean and accessible interface for users to input ingredients, with clear labeling and layout control that enhances usability and responsiveness.

**Explanation:** This block defines the core input mechanism for adding ingredients. The `<div className="input-container">` serves as a wrapper to apply layout and spacing styles to the input and button elements. The `<input>` element is configured with `type="text"` to accept textual input, and includes `aria-label="Add ingredient"` to ensure screen readers can identify its purpose. The placeholder="e.g. oregano" guides users by showing an example value, and the name="ingredient" attribute links the input’s content to formData.get('ingredient') when the form is submitted. The `<button>` element with `type="submit"` triggers the form submission, and its `className="btn search"` applies styling consistent with the application's visual language.<br><br>

```jsx
{ingredients.length > 0 && (
  <IngredientsList
    ingredients={ingredients}
    fetchRecipe={fetchRecipe}
    resetApp={resetApp}
    recipeShown={recipeShown}
  />
)}
```

**Purpose:** Conditionally renders the `<IngredientsList />` component only when the `ingredients` array contains at least one item.

**Benefit:** Prevents unnecessary rendering of the ingredient list section when there are no ingredients to display, keeping the interface clean and focused.

**Explanation:** This JSX expression uses a *short-circuit* conditional (`ingredients.length > 0 && (...)`) to determine whether the `<IngredientsList />` component should be rendered. The condition checks if the `ingredients` array has one or more elements. If true, the component is rendered and receives four props: `ingredients`, `fetchRecipe`, `resetApp`, and `recipeShown`. This ensures that the ingredient list and its associated controls (such as the button that conditionally triggers either `fetchRecipe` or `resetApp`) are only visible when relevant data exists. By hiding the component when the list is empty, the interface avoids displaying empty or misleading sections, maintaining a streamlined and intuitive user experience.<br><br>

```jsx
{loading && <p className="loading">Loading recipe...</p>}
```

**Purpose:** Conditionally renders a loading message while the recipe is being fetched, using the `loading` boolean as the trigger.

**Benefit:** Provides immediate visual feedback to the user during asynchronous operations, reinforcing that the application is actively processing the request.

**Explanation:** This JSX expression uses *shor-circuit* evaluation to display a `<p>` element only when the `loading` state is `true`. This mechanism ensures that users are informed of background activity during recipe generation, improving perceived responsiveness and reducing uncertainty during wait times. The message disappears automatically once `loading` becomes `false`, keeping the interface clean and focused.<br><br>

```jsx
{recipeShown && <ClaudeRecipe recipe={recipeText} />}
```

**Purpose:** Conditionally renders the `<ClaudeRecipe />` component based on the visibility state of the recipe section.

**Benefit:** Ensures that the recipe output is only displayed when appropriate, maintaining a clean and context-sensitive interface that responds to user actions.

**Explanation:** This JSX expression uses *short-circuit* evaluation to determine whether the `<ClaudeRecipe />` component should be rendered. The condition `recipeShown` acts as a boolean flag that reflects whether a recipe has been successfully generated and should be displayed. If `recipeShown` is `true`, the component is rendered and receives the `recipeText` string as a prop. This structure guarantees that the recipe sectino remains hidden until a valid recipe is available, preserving the logical flow of the interface and preventing premature or empty rendering.<br><br>

```jsx
export { Main }
```

**Purpose:** Exports the `Main` component.

**Benefit:** Makes the component reusable and importable in other files like `App.jsx`.

**Explanantion:** Named export keeps module structure clear and explicit.<br><br>


### `IngredientsList.jsx` file

```jsx
function IngredientsList({ ingredients, fetchRecipe, resetApp, recipeShown }) {...}
```

**Purpose:** Defines a functional React component named `IngredientsList`, which receives external data and behavior handlers via props.

**Benefit:** Enables the parent component (`Main.jsx`) to delegate both the rendering of the ingredient list and the control logic for recipe generation and reset, promoting modularity and separation of concerns.

**Explanation:** This line declares the `IngredientsList` component and uses destructuring to extract four props passed from its parent (`Main.jsx`). These props provide both data and control logic, allowing the component to remain *stateless* and fully governed by external inputs. Each prop plays a specific role in defining the component's behavior and rendering.
 - **`ingredients`:** An array containing the current list of user-submitted ingredients. It is used to render the visible list inside the component.
 - **`fetchRecipe`:** A function passed down to trigger the recipe generation process when the user requests it.
 - **`resetApp`:** A function used to reset the application state, clearing ingredients and hiding the recipe section.
 - **`recipeShown`:** A boolean flag that indicates whether a recipe is currently displayed. It is used to conditionally control the button behavior and visibility logic within the component.<br><br>

```jsx
const ingredientsListItems = ingredients.map((ingredient, index) => (
  <li key={index}>{ingredient}</li>
));
```

**Purpose:** Creates a list of `<li>` elements representing each ingredient provided by the user.

**Benefit:** Dynamically renders all submitted ingredients in a readable, accessible list format without hardcoding items. Each entry is added explicitly through user interaction with the `"Add ingredient"` button in `Main.jsx`, ensuring controlled and intentional updates to the list.

**Explanation:** This line uses the `.map()` method to transform the `ingredients` array into a new array of JSX `<li>` elements. Each iteration extracts the `ingredient` value and its corresponding `index`. The `ingredient` is rendered as the content of the list item, while the `index` is used as the `key` prop — a requirement in React to help differentiate elements during re-rendering. Although using the index as a key is acceptable in static or append-only lists like this one, it's generally discouraged in dynamic lists where items might be reordered or removed. In the context of Chef Claude, this approach ensures that the list of ingredients updates in response to explicit user actions, specifically when the `"Add ingredient"` button is clicked. This guarantees that each entry is intentional and the rendered list reflects only confirmed additions.<br><br>

```jsx
const buttonLabel = recipeShown ? "New recipe" : "Get a recipe";
```

**Purpose:** Defines the text label for the button based on whether a recipe has already been generated.

**Benefit:** Improves the user experience by updating the button message to reflect the current app state, guiding the user's next action clearly and contextually.

**Explanation:** This line uses a *ternary operator* to assign a value to the `buttonLabel` constant. It evaluates the `recipeShown` boolean to determine which label should be displayed:
 - If `recipeShown` is `true`, the label becomes `"New recipe"`, signaling that a recipe is already visible and the user can initiate a new one.
 - If `recipeShown` is `false`, the label becomes `"Get a recipe"`, prompting the user to generate a recipe based on the current list of ingredients.

This dynamic labeling ensures that the button's purpose is always clear, adapting to the application's state without requiring additional logic or manual updates.<br><br>

```jsx
const handleClick = recipeShown ? resetApp : fetchRecipe;
```

**Purpose:** Determines which function should be executed when the button is clicked.

**Benefit:** Keeps the logic clean and avoids creating two separate buttons for similar actions, streamlining the interface and reducing redundancy.

**Explanation:** This line uses a *ternary operator* to assign a function to the `handleClick` constant based on the value of `recipeShown`:
 - If `recipeShown` is `true`, `handleClick` is set to `resetApp`, meaning the button will reset the application state when clicked.
 - If `recipeShown` is `false`, `handleClick` is set to `fetchRecipe`, meaning the button will initiate recipe generation.

This conditional assignment allows a single button to serve dual purposes depending on the current state of the app, maintaining a simple and intuitive user experience within the Chef Claude interface.<br><br>

```jsx
return (
  <section className="recipe-container">
    ...
  </section>
);
```

**Purpose:** Begins the JSX returned by the component, rendering a semantic `<section>` element as the main container for the recipe-related interface.

**Benefit:** Provides a logical and accessible structure for grouping related UI elements, helping both developers and assistive technologies understand the role and boundaries of this region.

**Explanation:** This line initiates the return statement of the component, wrapping its visual output in a `<section>` tag, a semantic HTML element used to define standalone blocks of related content. The `className="recipe-container"` applies scoped CSS styles that visually organize and format the section, ensuring consistency with the Chef Claude design system. This structural choice improves readability, accessibility, and maintainability across the interface.<br><br>

```jsx
<h2>Ingredients on hand:</h2>
```

**Purpose:** Displays a section heading that introduces the list of added ingredients.

**Benefit:** Enhances accessibility and structural clarity, allowing users and assistive technologies to immediately recognize the role of the section within the interface.

**Explanation:** The `<h2>` tag is a semantic HTML element that denotes a second-level heading in the document hierarchy. It signals that this section is a distinct and meaningful part of the page, specifically the area where submitted ingredients are listed. By using `<h2>`, the Chef Claude interface maintains a logical heading structure, which benefits screen readers, improves SEO, and reinforces visual organization for all users.<br><br>

```jsx
<ul className="ingredients-list" aria-live="polite">
  {ingredientsListItems}
</ul>
```

**Purpose:** Displays all submitted ingredients as a list, updating its contents whenever a new item is added via user interaction.

**Benefit:** The `aria-live="polite"` attribute ensures assistive technologies (like screen readers) are notified of changes to the list without disrupting the user's current activity, maintaining a smooth and accessible experience.

**Explanation:** This `<ul>` element serves as the container for the dynamically generated `<li>` items stored in `ingredientsListItems`. These items reflect the current state of the `ingredients` array, which is updated each time the user clicks the `"Add ingredient"` button. The `className="ingredients-list"` links the list to specific CSS styles that control its appearence. The `aria-live="polite"` attribute plays a key accessibility role by allowing screen readers to announce updates to the list in a non-intrusive manner, ensuring that users with assistive needs are kept informed without interrupting their workflow.<br><br>

```jsx
{ingredients.length > 3 && (
  <div className="get-recipe-container">
    ...
  </div>
)}
```

**Purpose:** Conditionally renders a section that prompts the user to generate a recipe, but only after more than three ingredients have been submitted.

**Benefit:** Prevents premature access to the recipe generation feature, encouraging users to input a sufficient number of ingredients to ensure the AI has meaningful data to work with.

**Explanation:** The JSX block uses the logical `&&` operator to evaluate whether `ingredients.length > 3`. If the condition is true, the `<div>` with class `"get-recipe-container"` is rendered; otherwise, it's omitted. This ensures that the recipe generation interface only appears when the user has submitted at least four ingredients, a threshold that helps maintain the quality and relevance of the generated output in Chef Claude.<br><br>

```jsx
<div>
  <h3>Ready for a recipe?</h3>
  <p>Generate a recipe from your list of ingredients.</p>
</div>
```

**Purpose:** Provides context and instructions to the user before generating a recipe.

**Benefit:** Improves usability by clearly indicating what the next action does.

**Explanation:** The inner `<div>` groups the heading and descriptive text. The `<h3>` and `<p>` tags semantically separate the title and explanatory content.<br><br>

```jsx
<button onClick={handleClick}>{buttonLabel}</button>
```

**Purpose:** Renders a button that either triggers recipe generation or resets the app, depending on the current state of the interface.

**Benefit:** Provides a single, adaptive control element that simplifies user interaction by consolidating two related actions into one intuitive button.

**Explanation:** This `<button>` element uses the `onClick` attribute to bind its behavior to the `handleClick` function, which was conditionally assigned earlier based on the `recipeShown` flag. If a recipe is currently displayed, clicking the button will reset the app via `resetApp`; otherwise, it will initiate recipe generation via `fetchRecipe`. The button's label is dynamically set by the `buttonLabel` variable, ensuring that the text always reflects the intended action.<br><br>

```jsx
export { IngredientsList };
```

**Purpose:** Exports the `IngredientsList` component for use in other files, such as `Main.jsx`.

**Benefit:** Makes the component reusable and modular, following React's component-based architecture.

**Explanation:** The named export syntax allows multiple exports per file and must be imported using the same name elsewhere.<br><br>

### `ClaudeRecipe.jsx` file

```jsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
```

**Purpose:** Imports the necessary dependencies to render markdown content within React components.

**Benefit:** Enables markdown-formatted recipe text (returned by the AI) to be displayed as styled and structured HTML elements, improving readability and presentation.

**Explanation:** To properly render the recipe content returned by the AI, the app relies on markdown formatting. The combination of `ReactMarkdown` and the `remarkGfm` plugin allows this markdown to be converted into structured, style HTML elements within the React interface.
  - **ReactMarkdown:** A React component that parses markdown syntax and transforms it into corresponding JSX elements such as `<strong>`, `<em>`, `<ul>`, `<h1>`, and others.
 - **remarkGfm:** A plugin that extends markdown capabilities to support GitHub Flavored Markdown (GFM), enabling features like:
   
   - Tables
   - Strikethrough (`~~text~~`)
   - Task lists (`- [x]`), (`- [ ]`)
   - Autolinks and other GFM-specific enhancements
     
  - **Combined effect:** These imports allow the app to render rich, readable recipe content directly from markdown strings, preserving both structure and style without requring manual HTML markup.<br><br>

```jsx
function ClaudeRecipe({ recipe }) {...}
```

**Purpose:** Defines a React functional component named `ClaudeRecipe`, which receives a single prop called `recipe`.

**Benefit:** Keeps the component modular and reusable, with focused responsability: rendering formatted recipe content without handling logic or state.

**Explanation:** The `recipe` prop contains a markdown-formatted string representing the full recipe text. This component is designed to parse and render that markdown using tools like `ReactMarkdown` and `remarkGfm`, converting it into styled HTML elements. By isolating this functionality, `ClaudeRecipe` ensures clean separation of concerns and makes it easy to plug into different parts of the app interface.<br><br>

```jsx
return (
  <section className="suggestion-container">
    ...
  </section>
);
```

**Purpose:** Creates a semantic `<section>` element to serve as the container for the recipe suggestion content.

**Benefit:** Enhances accessibility and structural clarity by clearly defining the beginning of the recipe display area, making it easier for users and assistive technologies to navigate te interface.

**Explanation:** This line initiates the JSX returned by the `ClaudeRecipe` component, wrapping all recipe-related content inside a `<section>` tag. The semantic use of `<section>` signals that this block represents a distinct part of the page, in this case, the recipe suggestion.<br><br>

```jsx
<h2 className='suggestion-container-title'>Chef Claude Recommends:</h2>
```

**Purpose:** Introduces the section with a descriptive title.

**Benefit:** Provides visual hierarchy and informs users that the displayed recipe was generated by "Chef Claude".

**Explanation:** The heading improves readability and accessibility by serving as a navigational landmark for screen readers.<br><br>

```jsx
<article className="suggested-recipe-container" aria-live="polite">
```

**Purpose:** Creates a self-contained article for the generated recipe content.

**Benefit:** Semantically identifies the recipe as a distinct piece of content that can be dynamically updated.

**Explanation:** The `aria-live="polite"` attribute ensures that screen readers announce recipe updates without abruptly interrupting other ongoing speech, enhancing accessibility for visually impaired users.<br><br>

```jsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({ node, ...props }) => <h2 className="recipe-title" {...props} />,
    p: ({ node, ...props }) => <p className="recipe-paragraph" {...props} />,
    li: ({ node, ...props }) => <li className="recipe-item" {...props} />
  }}
>
  {recipe}
</ReactMarkdown>
```

**Purpose:** Renders the `recipe` string as markdown-formatted content using the `ReactMarkdown` component, with extended syntax support via `remarkGfm` and customized rendering for specific markdown elements through the `components` prop.

**Benefit:** Allows markdown content to be displayed with consistent styling and layout, while preserving semantic structure. The use of `components` ensures that key elements such as headings, paragraphs, and list items conform to the visual design of the application. The spread syntax guarantees that all relevant attributes and children are retained during rendering. 

**Explanation:**

`ReactMarkdown`
A React component that parses markdow input and transforms it into JSX elements. It serves as the core renderer for markdown-based content in the interface.

`remarkPlugins={[remarkGfm]}`
Extends the markdown parser with GitHub Flavored Markdown (GFM) support. This enables additional syntax features such as tables, strikethrough, autolinks, and task lists.

`components={{ ... }}`
Defines custom rendering behavior for specific markdown elements. Each key in the object corresponds to a markdown tag (e.g., `h1`, `p`, `li`), and each value is a function that returns a JSX element with desired styling and structure.

**Function Signature: `({ node, ...props }) => <Element {...props} />`**

- `node`: Represents the abstract syntax tree (AST) node for the markdown element. It contains metadata such as the element type, position, and children. Although not used in this configuration, it's included to provide access to low-level structural data if needed.
- `...props`: Uses JavaScript's rest syntax to collect all remaining properties passed to the component, excluding `node`. These typically include:
  - `children`: the content inside the element
  - `key`: React's internal identifier for list rendering
  - `className`, `style`, `ref`, and other HTML attributes.
- `{...props}`: Applies the collected properties to the returned JSX element using the *spread operator*. This ensures that the custom-rendered element retains all expected behavior and content, including accessibility attributes and nested children.

**Element Overrides**

- `h1`: Rendered as `<h2>` with the class `recipe-title`. This maintains visual hierarchy while avoiding multiple top-level headings in the DOM.
- `p`: Rendered as `<p>` with the class `recipe-paragraph`, ensuring consistent spacing and typography.
- `li`: Rendered as `<li>` with the class `recipe-item`, allowing uniform styling of ingredient and instruction lists.

`{recipe}`
Injects the dynamic markdown string received as a prop. This string is parsed and rendered according to the rules defined above.

This configuration ensures that markdown content is rendered with full control over structure and style, while preserving semantic integrity and React compatibility.<br><br>

```jsx
export { ClaudeRecipe };
```

**Purpose:** Exports the component for reuse in other parts of the application.

**Benefit:** Makes the `ClaudeRecipe` component available for import in `Main.jsx` or other modules.

**Explanation:** Using named exports keeps code organization modular, allowing for cleaner imports and easier testing.<br><br>
