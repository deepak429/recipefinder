
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import { useApp } from "@/context/AppContext";
import { ChefHat, Search, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

const RECIPES_PER_PAGE = 12;

const HomePage = () => {
  const { filteredRecipes, loading } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    let filtered;
    if (activeCategory === "All") {
      filtered = filteredRecipes;
    } else {
      filtered = filteredRecipes.filter(recipe => 
        recipe.category.some(cat => cat === activeCategory)
      );
    }
    
    // Calculate total pages
    const total = Math.ceil(filtered.length / RECIPES_PER_PAGE);
    setTotalPages(total);
    
    // Reset to first page when changing categories
    setCurrentPage(1);
    
    // Get paginated recipes
    const startIndex = 0;
    const endIndex = Math.min(RECIPES_PER_PAGE, filtered.length);
    setDisplayedRecipes(filtered.slice(startIndex, endIndex));
  }, [activeCategory, filteredRecipes]);
  
  // Handle page change
  useEffect(() => {
    let filtered;
    if (activeCategory === "All") {
      filtered = filteredRecipes;
    } else {
      filtered = filteredRecipes.filter(recipe => 
        recipe.category.some(cat => cat === activeCategory)
      );
    }
    
    const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
    const endIndex = Math.min(startIndex + RECIPES_PER_PAGE, filtered.length);
    setDisplayedRecipes(filtered.slice(startIndex, endIndex));
  }, [currentPage, activeCategory, filteredRecipes]);
  
  const featuredRecipes = filteredRecipes.slice(0, 3); // Use top 3 recipes for featured section
  
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show current page and neighbors
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 3) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
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
      {/* Enhanced Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-12 bg-gradient-to-r from-recipe-primary/10 to-recipe-secondary/30">
        <div className="py-16 px-8 md:px-16 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Utensils className="h-6 w-6 text-recipe-primary" />
            <span className="uppercase tracking-wider text-sm font-medium text-recipe-primary">Delicious Recipes</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover & Share <br />Amazing Recipes</h1>
          <p className="text-lg max-w-xl mb-8">Find thousands of recipes from around the world or share your own creations with our community.</p>
          <div className="flex flex-wrap gap-4">
            <Button 
              asChild 
              size="lg"
              className="bg-recipe-primary hover:bg-recipe-primary/90 text-white"
            >
              <Link to="/create-recipe">Create Recipe</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-recipe-primary text-recipe-primary hover:bg-recipe-primary/10"
            >
              <a href="#browse">Browse Recipes</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured Recipes Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Recipes</h2>
          <Button variant="outline" asChild>
            <Link to="/">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      
      {/* Category Filter */}
      <div id="browse" className="mb-8 overflow-x-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Browse by Category</h2>
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
      
      {/* Recipe Grid with Pagination */}
      {displayedRecipes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No recipes found</h3>
          <p className="text-muted-foreground mt-2">
            Try changing your search or category filter
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {displayedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="my-8">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                    </PaginationItem>
                  )}
                  
                  {renderPaginationItems()}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
