export async function getRecipeFromHF(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  
  try {
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: `${SYSTEM_PROMPT}\nUser ingredients: ${ingredientsString}` })
    });

    if (!response.ok) {
      throw new Error(`Error generating recipe: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (err) {
    console.error(err);
    return "An error occurred while generating the recipe.";
  };
};