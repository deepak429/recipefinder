
export type Recipe = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  category: string[];
  tags: string[];
  createdBy?: string;
  createdAt: Date;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  favorites: string[];
  createdRecipes: string[];
};
