
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

// For guest users (non-authenticated)
const GUEST_FAVORITES_KEY = 'guest_favorites';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestFavorites, setGuestFavorites] = useState<string[]>([]);

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
      
      // Load guest favorites
      const storedGuestFavorites = localStorage.getItem(GUEST_FAVORITES_KEY);
      if (storedGuestFavorites) {
        setGuestFavorites(JSON.parse(storedGuestFavorites));
      }
      
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
      
      // Merge guest favorites with user favorites if there are any
      if (guestFavorites.length > 0) {
        const mergedFavorites = [...new Set([...user.favorites, ...guestFavorites])];
        user.favorites = mergedFavorites;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.removeItem(GUEST_FAVORITES_KEY);
        setGuestFavorites([]);
      }
      
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
      // Merge guest favorites with new user
      if (guestFavorites.length > 0) {
        user.favorites = [...guestFavorites];
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.removeItem(GUEST_FAVORITES_KEY);
        setGuestFavorites([]);
      }
      
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
    if (currentUser) {
      // Logged in user - use normal toggle
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
    } else {
      // Guest user - save to local storage
      let updatedFavorites: string[];
      
      if (guestFavorites.includes(recipeId)) {
        // Remove from favorites
        updatedFavorites = guestFavorites.filter(id => id !== recipeId);
        toast({
          title: "Removed from favorites",
          description: "Recipe removed from your favorites"
        });
      } else {
        // Add to favorites
        updatedFavorites = [...guestFavorites, recipeId];
        toast({
          title: "Added to favorites",
          description: "Recipe saved to your favorites"
        });
      }
      
      setGuestFavorites(updatedFavorites);
      localStorage.setItem(GUEST_FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  };
  
  // Check if recipe is in favorites
  const isRecipeFavorite = (recipeId: string): boolean => {
    if (currentUser) {
      return currentUser.favorites.includes(recipeId);
    } else {
      return guestFavorites.includes(recipeId);
    }
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
