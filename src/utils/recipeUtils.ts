
import recipes from "../data/recipes";
import { Recipe } from "../types/recipe";

// Get all recipes
export const getAllRecipes = (): Recipe[] => {
  const storedRecipes = localStorage.getItem("recipes");
  if (storedRecipes) {
    const parsedRecipes = JSON.parse(storedRecipes);
    // Parse dates
    return parsedRecipes.map((recipe: any) => ({
      ...recipe,
      createdAt: new Date(recipe.createdAt)
    }));
  }
  
  // Initialize with default recipes on first load
  localStorage.setItem("recipes", JSON.stringify(recipes));
  return recipes;
};

// Get recipe by ID
export const getRecipeById = (id: string): Recipe | undefined => {
  const allRecipes = getAllRecipes();
  return allRecipes.find(recipe => recipe.id === id);
};

// Add new recipe
export const addRecipe = (recipe: Omit<Recipe, "id" | "createdAt">): Recipe => {
  const allRecipes = getAllRecipes();
  
  const newRecipe: Recipe = {
    ...recipe,
    id: Date.now().toString(),
    createdAt: new Date()
  };
  
  const updatedRecipes = [newRecipe, ...allRecipes];
  localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  
  return newRecipe;
};

// Update recipe
export const updateRecipe = (updatedRecipe: Recipe): Recipe => {
  const allRecipes = getAllRecipes();
  
  const updatedRecipes = allRecipes.map(recipe => 
    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
  );
  
  localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  return updatedRecipe;
};

// Delete recipe
export const deleteRecipe = (id: string): boolean => {
  const allRecipes = getAllRecipes();
  const filteredRecipes = allRecipes.filter(recipe => recipe.id !== id);
  
  if (filteredRecipes.length < allRecipes.length) {
    localStorage.setItem("recipes", JSON.stringify(filteredRecipes));
    return true;
  }
  
  return false;
};

// Filter recipes by search term
export const searchRecipes = (term: string): Recipe[] => {
  if (!term.trim()) return getAllRecipes();
  
  const searchTerm = term.toLowerCase();
  return getAllRecipes().filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm) ||
    recipe.description.toLowerCase().includes(searchTerm) ||
    recipe.category.some(cat => cat.toLowerCase().includes(searchTerm)) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Get recipes by category
export const getRecipesByCategory = (category: string): Recipe[] => {
  return getAllRecipes().filter(recipe => 
    recipe.category.some(cat => cat.toLowerCase() === category.toLowerCase())
  );
};
