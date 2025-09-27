import { useState } from "react";
import { ClaudeRecipe } from "./ClaudeRecipe";
import { IngredientsList } from "./IngredientsList";

function Main() {
  /*
  Challenge: clean up our code!
  
  Let's make a couple new components to make things a 
  little cleaner. (Notice: I'm not suggesting what we 
  have now is bad or wrong. I'm mostly finding an excuse 
  to get in some hands-on practice 🙂)
  
  1. Move the entire recipe <section> into its own 
  ClaudeRecipe component
  
  2. Move the list of ingredients <section> into its 
  own IngredientsList component.
  
  While you're considering how to structure things, consider 
  where state is, think about if it makes sense or not to 
  move it somewhere else, how you'll communicate between 
  the parent/child components, etc.
  
  The app should function as it currently does when you're 
  done, so there will likely be some extra work to be done 
  beyond what I've listed above.
  */

  const [ingredients, setIngredients] = useState([]);

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient');
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  };

  const [recipeShown, setRecipeShown] = useState(false);

  function toggleRecipeShown() {
    setRecipeShown(prevShown => !prevShown);
  };

  return (
    <main role="main">
      <section className="form-container">
        <form action={addIngredient} className="add-ingredient-form">
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
      {ingredients.length > 0 ? <IngredientsList
        ingredients={ingredients}
        toggleRecipeShown={toggleRecipeShown}
      /> : null}
      {recipeShown && <ClaudeRecipe />}
    </main>
  )
}

export { Main }