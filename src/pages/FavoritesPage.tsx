
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "@/components/RecipeCard";
import { useApp } from "@/context/AppContext";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const FavoritesPage = () => {
  const { recipes, currentUser, loading } = useApp();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser) {
      const userFavorites = recipes.filter((recipe) => 
        currentUser.favorites.includes(recipe.id)
      );
      setFavoriteRecipes(userFavorites);
    } else {
      setFavoriteRecipes([]);
    }
  }, [recipes, currentUser]);
  
  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recipe-primary"></div>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="max-w-md mx-auto bg-muted p-8 rounded-lg shadow-sm">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Login to view your favorites</h1>
          <p className="text-muted-foreground mb-6">
            Create an account or log in to save your favorite recipes and access them anytime.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate("/")}>
              Browse Recipes
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Recipes</h1>
      
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
    </div>
  );
};

export default FavoritesPage;
