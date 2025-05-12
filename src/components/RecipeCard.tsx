
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Clock, ChefHat } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { currentUser, toggleFavoriteRecipe, isRecipeFavorite } = useApp();
  const isFavorite = currentUser ? isRecipeFavorite(recipe.id) : false;
  
  // Handle image error by using a fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800";
    e.currentTarget.onerror = null; // Prevent infinite loops
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      toast({
        title: "Save recipes without login",
        description: "Your favorites are saved in your browser. Create an account to sync across devices.",
      });
    }
    toggleFavoriteRecipe(recipe.id);
  };
  
  return (
    <Card className="overflow-hidden h-full recipe-card-shadow recipe-card-transition">
      <Link to={`/recipe/${recipe.id}`} className="flex flex-col h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute top-2 right-2 bg-white rounded-full",
              isFavorite && "text-red-500"
            )}
            onClick={handleFavoriteClick}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isFavorite && "fill-current"
              )}
            />
          </Button>
        </div>
        
        <CardContent className="py-4 flex-grow">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {recipe.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{recipe.prepTime + recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-3 w-3" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4">
          <div className="flex flex-wrap gap-2">
            {recipe.category.slice(0, 2).map((category) => (
              <span
                key={category}
                className="px-2 py-1 bg-recipe-secondary text-xs rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default RecipeCard;
