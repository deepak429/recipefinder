
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import { useApp } from "@/context/AppContext";
import { ChefHat } from "lucide-react";

const categories = [
  "All",
  "Italian",
  "Mexican",
  "Asian",
  "American",
  "Indian",
  "Mediterranean",
  "Dessert",
  "Vegetarian"
];

const HomePage = () => {
  const { filteredRecipes, loading } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayedRecipes, setDisplayedRecipes] = useState(filteredRecipes);
  
  useEffect(() => {
    if (activeCategory === "All") {
      setDisplayedRecipes(filteredRecipes);
    } else {
      const filtered = filteredRecipes.filter(recipe => 
        recipe.category.some(cat => cat === activeCategory)
      );
      setDisplayedRecipes(filtered);
    }
  }, [activeCategory, filteredRecipes]);
  
  const featuredRecipe = filteredRecipes[0]; // Just use the first recipe as featured
  
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
      {/* Hero Section */}
      {featuredRecipe && (
        <div className="relative rounded-xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-10"></div>
          <img 
            src={featuredRecipe.imageUrl} 
            alt={featuredRecipe.title}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white">
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="h-5 w-5" />
              <span className="uppercase tracking-wider text-xs">Featured Recipe</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{featuredRecipe.title}</h1>
            <p className="text-lg max-w-xl mb-6">{featuredRecipe.description}</p>
            <Button 
              asChild 
              className="bg-recipe-primary hover:bg-recipe-primary/90 text-white w-fit"
            >
              <a href={`/recipe/${featuredRecipe.id}`}>View Recipe</a>
            </Button>
          </div>
        </div>
      )}
      
      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap ${
                activeCategory === category ? "bg-recipe-primary text-white" : ""
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Recipe Grid */}
      {displayedRecipes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No recipes found</h3>
          <p className="text-muted-foreground mt-2">
            Try changing your search or category filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
