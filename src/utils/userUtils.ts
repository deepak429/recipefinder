
import { User } from "../types/recipe";

// Check if user exists
export const userExists = (email: string): boolean => {
  const users = getUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Register user
export const registerUser = (username: string, email: string, password: string): User | null => {
  if (userExists(email)) {
    return null;
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    username,
    email,
    password, // In a real app, this should be hashed
    favorites: [],
    createdRecipes: []
  };
  
  const users = getUsers();
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  
  // Set current user
  setCurrentUser(newUser);
  
  return newUser;
};

// Login user
export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(
    user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );
  
  if (user) {
    setCurrentUser(user);
  }
  
  return user || null;
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem("currentUser");
};

// Get current user
export const getCurrentUser = (): User | null => {
  const currentUserStr = localStorage.getItem("currentUser");
  return currentUserStr ? JSON.parse(currentUserStr) : null;
};

// Set current user
export const setCurrentUser = (user: User): void => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

// Get users
export const getUsers = (): User[] => {
  const usersStr = localStorage.getItem("users");
  return usersStr ? JSON.parse(usersStr) : [];
};

// Add recipe to favorites
export const toggleFavorite = (userId: string, recipeId: string): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return false;
  
  const user = users[userIndex];
  const favoriteIndex = user.favorites.indexOf(recipeId);
  
  if (favoriteIndex === -1) {
    // Add to favorites
    user.favorites.push(recipeId);
  } else {
    // Remove from favorites
    user.favorites.splice(favoriteIndex, 1);
  }
  
  // Update users and current user
  users[userIndex] = user;
  localStorage.setItem("users", JSON.stringify(users));
  setCurrentUser(user);
  
  return true;
};

// Check if recipe is in favorites
export const isFavorite = (userId: string, recipeId: string): boolean => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.id !== userId) return false;
  
  return currentUser.favorites.includes(recipeId);
};

// Get favorite recipes
export const getFavoriteRecipes = (userId: string): string[] => {
  const users = getUsers();
  const user = users.find(user => user.id === userId);
  
  return user ? user.favorites : [];
};

// Add created recipe to user
export const addCreatedRecipe = (userId: string, recipeId: string): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return false;
  
  const user = users[userIndex];
  user.createdRecipes.push(recipeId);
  
  // Update users and current user
  users[userIndex] = user;
  localStorage.setItem("users", JSON.stringify(users));
  setCurrentUser(user);
  
  return true;
};
