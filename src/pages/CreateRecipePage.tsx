
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { addRecipe } from "@/utils/recipeUtils";
import { addCreatedRecipe } from "@/utils/userUtils";
import { toast } from "@/components/ui/use-toast";

const difficulties = ["Easy", "Medium", "Hard"];
const categories = ["Italian", "Mexican", "Asian", "American", "Indian", "Mediterranean", "French", "Dessert", "Breakfast", "Lunch", "Dinner", "Appetizer", "Salad", "Soup", "Vegetarian", "Vegan", "Seafood"];

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const { currentUser, refreshRecipes } = useApp();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [category, setCategory] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Redirect if not logged in
  if (!currentUser) {
    navigate("/");
    return null;
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    if (!prepTime.trim()) newErrors.prepTime = "Prep time is required";
    if (!cookTime.trim()) newErrors.cookTime = "Cook time is required";
    if (!servings.trim()) newErrors.servings = "Servings is required";
    if (!ingredients[0].trim()) newErrors.ingredients = "At least one ingredient is required";
    if (!instructions[0].trim()) newErrors.instructions = "At least one instruction is required";
    if (category.length === 0) newErrors.category = "At least one category is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };
  
  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients.length ? newIngredients : [""]); // Always keep at least one
  };
  
  const handleUpdateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  
  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };
  
  const handleRemoveInstruction = (index: number) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions.length ? newInstructions : [""]); // Always keep at least one
  };
  
  const handleUpdateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };
  
  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };
  
  const handleAddCategory = (value: string) => {
    if (!category.includes(value)) {
      setCategory([...category, value]);
    }
  };
  
  const handleRemoveCategory = (cat: string) => {
    setCategory(category.filter((c) => c !== cat));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // Filter out any empty fields
      const filteredIngredients = ingredients.filter(i => i.trim());
      const filteredInstructions = instructions.filter(i => i.trim());
      
      const newRecipe = addRecipe({
        title,
        description,
        imageUrl,
        prepTime: parseInt(prepTime),
        cookTime: parseInt(cookTime),
        servings: parseInt(servings),
        difficulty,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
        category,
        tags,
        createdBy: currentUser.id
      });
      
      if (newRecipe.id) {
        addCreatedRecipe(currentUser.id, newRecipe.id);
        refreshRecipes();
        toast({ title: "Success", description: "Your recipe has been created!" });
        navigate(`/recipe/${newRecipe.id}`);
      }
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "There was a problem creating your recipe.", 
        variant: "destructive" 
      });
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Recipe Title*</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Homemade Margherita Pizza"
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL*</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && <p className="text-sm text-destructive">{errors.imageUrl}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description*</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your recipe in a few sentences..."
            rows={3}
          />
          {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
        </div>
        
        {/* Recipe Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="prepTime">Prep Time (minutes)*</Label>
            <Input
              id="prepTime"
              type="number"
              min="0"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
            {errors.prepTime && <p className="text-sm text-destructive">{errors.prepTime}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cookTime">Cook Time (minutes)*</Label>
            <Input
              id="cookTime"
              type="number"
              min="0"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
            />
            {errors.cookTime && <p className="text-sm text-destructive">{errors.cookTime}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="servings">Servings*</Label>
            <Input
              id="servings"
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
            {errors.servings && <p className="text-sm text-destructive">{errors.servings}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty*</Label>
            <Select
              value={difficulty}
              onValueChange={(value) => setDifficulty(value as "Easy" | "Medium" | "Hard")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((diff) => (
                  <SelectItem key={diff} value={diff}>
                    {diff}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Ingredients */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Ingredients*</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddIngredient}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Ingredient
            </Button>
          </div>
          
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={ingredient}
                onChange={(e) => handleUpdateIngredient(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}, e.g., 2 cups flour`}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleRemoveIngredient(index)}
                disabled={ingredients.length === 1 && index === 0}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {errors.ingredients && <p className="text-sm text-destructive">{errors.ingredients}</p>}
        </div>
        
        {/* Instructions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Instructions*</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddInstruction}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Instruction
            </Button>
          </div>
          
          {instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={instruction}
                onChange={(e) => handleUpdateInstruction(index, e.target.value)}
                placeholder={`Step ${index + 1}, e.g., Preheat the oven to 350°F`}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleRemoveInstruction(index)}
                disabled={instructions.length === 1 && index === 0}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {errors.instructions && <p className="text-sm text-destructive">{errors.instructions}</p>}
        </div>
        
        {/* Categories and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Categories*</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {category.map((cat) => (
                <div
                  key={cat}
                  className="px-3 py-1 bg-recipe-secondary rounded-full text-sm flex items-center gap-1"
                >
                  <span>{cat}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0"
                    onClick={() => handleRemoveCategory(cat)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <Select onValueChange={handleAddCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((cat) => !category.includes(cat))
                  .map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (optional)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((t) => (
                <div
                  key={t}
                  className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-1"
                >
                  <span>#{t}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0"
                    onClick={() => handleRemoveTag(t)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Enter a tag e.g., quick, vegan"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit">
            Create Recipe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipePage;
