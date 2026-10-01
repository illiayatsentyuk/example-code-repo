export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeCard {
  title: string;
  servings: number;
  ingredients: Ingredient[];
}

export function scaleRecipe(recipe: RecipeCard, servings: number): RecipeCard {
  if (servings <= 0 || recipe.servings <= 0) {
    throw new Error("servings must be positive");
  }
  const factor = servings / recipe.servings;
  return {
    title: recipe.title,
    servings,
    ingredients: recipe.ingredients.map((item) => ({
      ...item,
      amount: roundTo(item.amount * factor, 2),
    })),
  };
}

function roundTo(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export const samplePancakes: RecipeCard = {
  title: "pancakes",
  servings: 4,
  ingredients: [
    { name: "flour", amount: 200, unit: "g" },
    { name: "milk", amount: 300, unit: "ml" },
    { name: "egg", amount: 2, unit: "pcs" },
  ],
};
