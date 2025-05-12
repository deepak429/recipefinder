
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "@/components/RecipeCard";
import { useApp } from "@/context/AppContext";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Heart, UserCircle } from "lucide-react";

const FavoritesPage = () => {
  const { recipes, currentUser, loading, isRecipeFavorite } = useApp();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get favorites for all recipes regardless of auth status
    const userFavorites = recipes.filter((recipe) => 
      isRecipeFavorite(recipe.id)
    );
    setFavoriteRecipes(userFavorites);
  }, [recipes, currentUser, isRecipeFavorite]);
  
  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recipe-primary"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Favorite Recipes</h1>
        {!currentUser && (
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
            <UserCircle className="h-4 w-4" />
            <span>Guest Mode</span>
          </div>
        )}
      </div>
      
      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6">
            Start exploring recipes and add them to your favorites
          </p>
          <Button onClick={() => navigate("/")}>
            Explore Recipes
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
      
      {!currentUser && favoriteRecipes.length > 0 && (
        <div className="mt-8 bg-muted p-4 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            Your favorites are saved in your browser. 
            <Button variant="link" onClick={() => navigate("/")}>
              Create an account
            </Button> 
            to save favorites across devices.
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
