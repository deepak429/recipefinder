
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Recipe, User } from '../types/recipe';
import { getAllRecipes, searchRecipes } from '../utils/recipeUtils';
import { getCurrentUser, loginUser, logoutUser, registerUser, toggleFavorite } from '../utils/userUtils';
import { toast } from '../components/ui/use-toast';

interface AppContextType {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  toggleFavoriteRecipe: (recipeId: string) => void;
  isRecipeFavorite: (recipeId: string) => boolean;
  loading: boolean;
  refreshRecipes: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize recipes and current user
  useEffect(() => {
    const loadData = async () => {
      // Load recipes
      const allRecipes = getAllRecipes();
      setRecipes(allRecipes);
      setFilteredRecipes(allRecipes);
      
      // Load current user
      const user = getCurrentUser();
      setCurrentUser(user);
      
      setLoading(false);
    };
    
    loadData();
  }, []);
  
  // Filter recipes whenever search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = searchRecipes(searchTerm);
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, recipes]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    const user = loginUser(email, password);
    
    if (user) {
      setCurrentUser(user);
      toast({ title: "Login successful", description: `Welcome back, ${user.username}!` });
      return true;
    } 
    
    toast({ 
      title: "Login failed", 
      description: "Invalid email or password", 
      variant: "destructive" 
    });
    return false;
  };
  
  // Logout function
  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    toast({ title: "Logged out", description: "You have been logged out successfully" });
  };
  
  // Register function
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    const user = registerUser(username, email, password);
    
    if (user) {
      setCurrentUser(user);
      toast({ title: "Registration successful", description: "Your account has been created" });
      return true;
    }
    
    toast({ 
      title: "Registration failed", 
      description: "Email already exists", 
      variant: "destructive" 
    });
    return false;
  };
  
  // Toggle favorite recipe
  const toggleFavoriteRecipe = (recipeId: string) => {
    if (!currentUser) {
      toast({ 
        title: "Authentication required", 
        description: "Please login to save favorites", 
        variant: "destructive" 
      });
      return;
    }
    
    const success = toggleFavorite(currentUser.id, recipeId);
    if (success) {
      const updatedUser = getCurrentUser();
      setCurrentUser(updatedUser);
      
      const isFav = updatedUser?.favorites.includes(recipeId);
      toast({ 
        title: isFav ? "Added to favorites" : "Removed from favorites",
        description: isFav ? "Recipe saved to your favorites" : "Recipe removed from your favorites"
      });
    }
  };
  
  // Check if recipe is in favorites
  const isRecipeFavorite = (recipeId: string): boolean => {
    return currentUser ? currentUser.favorites.includes(recipeId) : false;
  };
  
  // Refresh recipes
  const refreshRecipes = () => {
    const updatedRecipes = getAllRecipes();
    setRecipes(updatedRecipes);
    
    // Reapply search filter if exists
    if (searchTerm.trim() !== '') {
      setFilteredRecipes(searchRecipes(searchTerm));
    } else {
      setFilteredRecipes(updatedRecipes);
    }
  };
  
  const value = {
    recipes,
    filteredRecipes,
    searchTerm,
    setSearchTerm,
    currentUser,
    login,
    logout,
    register,
    toggleFavoriteRecipe,
    isRecipeFavorite,
    loading,
    refreshRecipes
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
