import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ClaudeRecipe({ recipe }) {
  return (
    <section className="suggestion-container">
      <h2>Chef Claude Recommends:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{recipe}</ReactMarkdown>
      </article>
    </section>
  );
};

export { ClaudeRecipe };