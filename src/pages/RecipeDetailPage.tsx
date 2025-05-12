
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Clock, ChefHat, Users, ArrowLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getRecipeById } from "@/utils/recipeUtils";
import { Recipe } from "@/types/recipe";
import { cn } from "@/lib/utils";

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, toggleFavoriteRecipe, isRecipeFavorite } = useApp();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const foundRecipe = getRecipeById(id);
      setRecipe(foundRecipe || null);
      setLoading(false);
    }
  }, [id]);
  
  const isFavorite = currentUser && recipe && isRecipeFavorite(recipe.id);
  
  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recipe-primary"></div>
        </div>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {recipe.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
              <Clock className="h-4 w-4 text-recipe-primary" />
              <div>
                <span className="block text-xs text-muted-foreground">Total Time</span>
                <span>{recipe.prepTime + recipe.cookTime} mins</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
              <ChefHat className="h-4 w-4 text-recipe-primary" />
              <div>
                <span className="block text-xs text-muted-foreground">Difficulty</span>
                <span>{recipe.difficulty}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
              <Users className="h-4 w-4 text-recipe-primary" />
              <div>
                <span className="block text-xs text-muted-foreground">Servings</span>
                <span>{recipe.servings}</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              className={cn(
                "flex items-center gap-2",
                isFavorite && "text-red-500"
              )}
              onClick={() => toggleFavoriteRecipe(recipe.id)}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isFavorite && "fill-current"
                )}
              />
              <span>{isFavorite ? "Saved to Favorites" : "Save to Favorites"}</span>
            </Button>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <Separator className="mb-4" />
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-recipe-primary mt-2"></span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <Separator className="mb-4" />
            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-recipe-primary flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                  <p className="mt-1">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Categories</h2>
            <Separator className="mb-4" />
            <div className="flex flex-wrap gap-2">
              {recipe.category.map((cat) => (
                <div
                  key={cat}
                  className="px-3 py-1 bg-recipe-secondary rounded-full text-sm"
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
          
          {recipe.tags.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Tags</h2>
              <Separator className="mb-4" />
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
