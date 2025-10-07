function IngredientsList({ ingredients, fetchRecipe, resetApp, recipeShown }) {
  const ingredientsListItems = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  const buttonLabel = recipeShown ? "New recipe" : "Get a recipe";

  const handleClick = recipeShown ? resetApp : fetchRecipe

  return (
    <section className="recipe-container">
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>

      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={handleClick}>{buttonLabel}</button>
        </div>
      )}
    </section>
  );
};

export { IngredientsList };