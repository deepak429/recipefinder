
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, Heart, User } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, recipes, loading } = useApp();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [createdRecipes, setCreatedRecipes] = useState<Recipe[]>([]);
  
  useEffect(() => {
    if (currentUser) {
      const userFavorites = recipes.filter((recipe) => 
        currentUser.favorites.includes(recipe.id)
      );
      setFavoriteRecipes(userFavorites);
      
      const userCreations = recipes.filter((recipe) => 
        currentUser.createdRecipes.includes(recipe.id) || recipe.createdBy === currentUser.id
      );
      setCreatedRecipes(userCreations);
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
    navigate("/");
    return null;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-recipe-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold">{currentUser.username}</h1>
        <p className="text-muted-foreground">{currentUser.email}</p>
      </div>
      
      <Tabs defaultValue="favorites" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
              {favoriteRecipes.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="created" className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            <span>My Recipes</span>
            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
              {createdRecipes.length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="favorites" className="pt-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="created" className="pt-6">
          {createdRecipes.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <ChefHat className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No recipes created yet</h2>
              <p className="text-muted-foreground mb-6">
                Start creating your own delicious recipes
              </p>
              <Button onClick={() => navigate("/create-recipe")}>
                Create Recipe
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {createdRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
