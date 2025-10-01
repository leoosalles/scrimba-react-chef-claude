# 👨‍🍳 Chef Claude: AI-Powered Recipe Generator

**Chef Claude** is a React-based web application that allows users to input a list of ingredients they have on hand and receive AI-generated recipe suggestion. The project integrates a **Node.js + Express backend** with the **Hugging Face Inference API**, leveraging the `Mixtral-8x7B-Instruct` model to generate creative, markdown-formatted recipes.

On the frontend, built with **React and Vite**, users can:

- Add ingredients dynamically through a form.
- View their list of available ingredients.
- Request a recipe suggestion once enough ingredients have been provided.
- Render recipes with proper formatting using **React Markdown** and **remark-gfm**.

The backend handles API requests securely, using environment variables for the Hugging Face API key and applying **CORS** and JSON middleware for safe data handling.

Styling is implemented with **CSS** to ensure a clean, responsive, and user-friendly interface. Accessibility considerations such as `aria-live`, semantic HTML, and keyboard-friendly navigation were included to enhance usability.

This project was developed as a required activity for the **Learn React** module, part of the **Frontend Development Specialization** course offered by Scrimba. It combines essential frontend skills (state management, conditional rendering, component composition) with backend integration and external API usage, making it a pratical exercise in **full-stack React development**.
