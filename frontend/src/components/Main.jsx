import { useState } from "react";
import { ClaudeRecipe } from "./ClaudeRecipe";
import { IngredientsList } from "./IngredientsList";

function Main() {

  const [ingredients, setIngredients] = useState([]);
  const [recipeText, setRecipeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeShown, setRecipeShown] = useState(false);

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient');

    if (newIngredient) {
      setIngredients(prevIngredients => 
        [...prevIngredients, newIngredient]);
    }
  };

  async function fetchRecipe() {
    if (ingredients.length === 0) return;

    setLoading(true);
    try {
      // const response = await fetch("http://localhost:3000/api", {
      const response = await fetch("netlify/functions/generateRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an assistant that receives a list of ingredients that a user has and suggests a recipe.\nUser ingredients: ${ingredients.join(", ")}`
        })
      });

      const data = await response.json();

      console.log("API returne:", data);

      setRecipeText(data.text || "No recipe generated.");
      setRecipeShown(true);
    } catch (err) {
      console.error(err);
      setRecipeText("An error occurred while generating the recipe.");
      setRecipeShown(true);
    } finally {
      setLoading(false);
    }
  };

  function resetApp() {
    setIngredients([]);
    setRecipeText("");
    setRecipeShown(false);
  };

  return (
    <main role="main">
      <section className="form-container">
        <form
          className="add-ingredient-form"
          action={addIngredient}
        >
          <fieldset>
            <legend className="sr-only">Form to add ingredients for AI-generated recipes</legend>
            <div className="input-container">
              <input
                className="input-field"
                type="text"
                aria-label="Add ingredient"
                placeholder="e.g. oregano"
                name="ingredient"
              />
              <button type="submit" className="btn search">Add ingredient</button>
            </div>
          </fieldset>
        </form>
      </section>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          fetchRecipe={fetchRecipe}
          resetApp={resetApp}
          recipeShown={recipeShown}
        />
      )}

      {loading && <p className="loading">Loading recipe...</p>}

      {recipeShown && <ClaudeRecipe recipe={recipeText} />}
    </main>
  )
}

export { Main }