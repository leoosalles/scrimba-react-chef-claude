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
