import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ClaudeRecipe({ recipe }) {
  return (
    <section className="suggestion-container">
      <h2 className='suggestion-container-title'>Chef Claude Recommends:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
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
      </article>
    </section>
  );
};

export { ClaudeRecipe };