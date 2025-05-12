
import { Recipe } from "../types/recipe";

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    description: "A traditional Italian pizza topped with tomato sauce, fresh mozzarella, basil, and extra virgin olive oil. Simple yet delicious!",
    imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1047&q=80",
    prepTime: 20,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      "1 pizza dough",
      "3 tbsp tomato sauce",
      "125g fresh mozzarella",
      "Fresh basil leaves",
      "2 tbsp extra virgin olive oil",
      "Salt to taste"
    ],
    instructions: [
      "Preheat oven to 500°F (260°C) with a pizza stone inside if available.",
      "Roll out the pizza dough on a floured surface.",
      "Spread tomato sauce evenly over the dough, leaving a small border.",
      "Tear mozzarella into pieces and distribute evenly.",
      "Bake for 8-10 minutes until crust is golden.",
      "Remove from oven, add fresh basil leaves and drizzle with olive oil.",
      "Season with salt and serve immediately."
    ],
    category: ["Italian", "Pizza"],
    tags: ["vegetarian", "quick", "classic"],
    createdAt: new Date("2023-01-15")
  },
  {
    id: "2",
    title: "Chocolate Chip Cookies",
    description: "Soft and chewy chocolate chip cookies with a perfect balance of sweet and salty flavors. The ultimate comfort treat!",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    prepTime: 15,
    cookTime: 10,
    servings: 24,
    difficulty: "Easy",
    ingredients: [
      "1 cup (2 sticks) butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "2 cups chocolate chips"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a large bowl, cream together butter and sugars until light and fluffy.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "Combine flour, baking soda, and salt; gradually add to the creamed mixture.",
      "Fold in chocolate chips.",
      "Drop by rounded tablespoons onto ungreased cookie sheets.",
      "Bake for 9-11 minutes or until golden brown.",
      "Let stand on cookie sheet for 2 minutes before removing to cool on wire racks."
    ],
    category: ["Dessert", "Cookies"],
    tags: ["sweet", "baking", "kid-friendly"],
    createdAt: new Date("2023-02-10")
  },
  {
    id: "3",
    title: "Classic Caesar Salad",
    description: "A refreshing salad with crisp romaine lettuce, homemade croutons, parmesan cheese, and a creamy Caesar dressing that's both tangy and savory.",
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    prepTime: 20,
    cookTime: 10,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      "2 heads romaine lettuce, chopped",
      "1 cup croutons",
      "1/2 cup freshly grated Parmesan cheese",
      "2 cloves garlic, minced",
      "1 tsp Dijon mustard",
      "1/2 tsp Worcestershire sauce",
      "1/4 cup fresh lemon juice",
      "1/2 cup olive oil",
      "Salt and black pepper to taste"
    ],
    instructions: [
      "For the dressing, whisk together minced garlic, mustard, Worcestershire sauce, and lemon juice.",
      "Slowly whisk in olive oil until emulsified, then season with salt and pepper.",
      "Wash and dry romaine lettuce, then tear into bite-sized pieces.",
      "Place lettuce in a large bowl, add dressing and toss well to coat.",
      "Add croutons and half the Parmesan cheese, toss again.",
      "Serve on chilled plates and top with remaining Parmesan."
    ],
    category: ["Salad", "Appetizer"],
    tags: ["quick", "healthy", "classic"],
    createdAt: new Date("2023-03-05")
  },
  {
    id: "4",
    title: "Beef Stroganoff",
    description: "Tender strips of beef and mushrooms in a rich, creamy sauce served over egg noodles. A comforting Russian classic that's perfect for dinner.",
    imageUrl: "https://images.unsplash.com/photo-1675256263090-71dc4c323ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "1 lb beef sirloin, thinly sliced",
      "2 tbsp butter",
      "1 onion, diced",
      "8 oz mushrooms, sliced",
      "1 cup beef broth",
      "1 tbsp Worcestershire sauce",
      "1 cup sour cream",
      "2 tbsp all-purpose flour",
      "8 oz egg noodles",
      "Salt and pepper to taste",
      "Chopped parsley for garnish"
    ],
    instructions: [
      "Cook egg noodles according to package directions.",
      "Season beef with salt and pepper.",
      "In a large skillet, melt butter over medium-high heat and brown beef pieces quickly, about 2 minutes per side. Remove and set aside.",
      "In the same pan, add onions and mushrooms, cooking until softened, about 5 minutes.",
      "Sprinkle flour over the vegetables and stir for 1 minute.",
      "Add beef broth and Worcestershire sauce, bring to a simmer while scraping up browned bits.",
      "Reduce heat, stir in sour cream until smooth.",
      "Return beef to the pan, heat through but don't boil.",
      "Serve over egg noodles and garnish with parsley."
    ],
    category: ["Russian", "Main Course"],
    tags: ["beef", "comfort food", "dinner"],
    createdAt: new Date("2023-04-20")
  },
  {
    id: "5",
    title: "Fresh Guacamole",
    description: "Creamy avocados mixed with lime juice, onions, tomatoes, cilantro, and jalapeños for a perfect dip or topping. Ready in just minutes!",
    imageUrl: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    prepTime: 15,
    cookTime: 0,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      "3 ripe avocados",
      "1 lime, juiced",
      "1/2 red onion, finely diced",
      "2 Roma tomatoes, diced",
      "2 tbsp chopped cilantro",
      "1 jalapeño, seeded and minced",
      "1 clove garlic, minced",
      "1/2 tsp salt",
      "1/4 tsp ground cumin"
    ],
    instructions: [
      "Cut avocados in half, remove pits, and scoop out flesh into a bowl.",
      "Add lime juice and mash with a fork to desired consistency.",
      "Mix in onion, tomatoes, cilantro, jalapeño, and garlic.",
      "Season with salt and cumin, stir to combine.",
      "Taste and adjust seasonings as needed.",
      "Serve immediately or cover tightly with plastic wrap (pressed directly on surface to prevent browning) and refrigerate."
    ],
    category: ["Mexican", "Appetizer"],
    tags: ["vegetarian", "quick", "no-cook"],
    createdAt: new Date("2023-05-02")
  },
  {
    id: "6",
    title: "Honey Glazed Salmon",
    description: "Perfectly cooked salmon fillets with a sweet and savory honey glaze. A quick and healthy dinner option that's full of flavor.",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "3 tbsp honey",
      "2 tbsp soy sauce",
      "1 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 tbsp fresh ginger, grated",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
      "Green onions, sliced for garnish",
      "Sesame seeds for garnish"
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "In a small bowl, mix honey, soy sauce, olive oil, garlic, ginger, and lemon juice.",
      "Season salmon fillets with salt and pepper.",
      "Place salmon on a lined baking sheet, skin side down.",
      "Brush half of the glaze over salmon fillets.",
      "Bake for 15-18 minutes, or until salmon is cooked through.",
      "Brush remaining glaze over salmon in the last 5 minutes of cooking.",
      "Garnish with sliced green onions and sesame seeds before serving."
    ],
    category: ["Seafood", "Main Course"],
    tags: ["healthy", "quick", "dinner"],
    createdAt: new Date("2023-05-15")
  },
  {
    id: "7",
    title: "Homemade Tomato Soup",
    description: "A comforting bowl of rich, creamy tomato soup made from scratch. Perfect with a grilled cheese sandwich on a cold day.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    prepTime: 15,
    cookTime: 40,
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      "2 tbsp olive oil",
      "1 onion, diced",
      "3 garlic cloves, minced",
      "2 tbsp tomato paste",
      "2 (28 oz) cans whole peeled tomatoes",
      "2 cups vegetable broth",
      "1 tsp sugar",
      "1/4 cup fresh basil, plus more for garnish",
      "1/2 cup heavy cream",
      "Salt and pepper to taste",
      "Croutons for serving (optional)"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat.",
      "Add onions and cook until softened, about 5 minutes.",
      "Add garlic and cook for 30 seconds until fragrant.",
      "Stir in tomato paste and cook for 1-2 minutes.",
      "Add canned tomatoes with their juices, vegetable broth, and sugar. Bring to a simmer.",
      "Reduce heat to low and simmer for 30 minutes.",
      "Add basil, then use an immersion blender to purée until smooth.",
      "Stir in heavy cream and season with salt and pepper.",
      "Heat through without boiling.",
      "Serve garnished with additional basil and croutons if desired."
    ],
    category: ["Soup", "Appetizer"],
    tags: ["vegetarian", "comfort food", "winter"],
    createdAt: new Date("2023-06-10")
  },
  {
    id: "8",
    title: "Chicken Teriyaki Stir-Fry",
    description: "A quick and flavorful stir-fry with chicken, colorful vegetables, and a homemade teriyaki sauce. Serve over rice for a complete meal.",
    imageUrl: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "1.5 lbs boneless chicken breasts, cut into bite-sized pieces",
      "2 tbsp vegetable oil",
      "1 bell pepper, sliced",
      "1 cup broccoli florets",
      "1 carrot, julienned",
      "1 cup snow peas",
      "2 cloves garlic, minced",
      "1/2 cup teriyaki sauce",
      "2 tbsp soy sauce",
      "2 tbsp honey",
      "1 tbsp cornstarch mixed with 2 tbsp water",
      "2 green onions, sliced",
      "1 tbsp sesame seeds",
      "Cooked rice for serving"
    ],
    instructions: [
      "Heat 1 tablespoon oil in a large wok or skillet over high heat.",
      "Add chicken and cook until browned and cooked through, about 5-7 minutes. Remove from pan.",
      "Add remaining oil to the pan, then add vegetables and garlic. Stir-fry for 3-4 minutes until vegetables are crisp-tender.",
      "In a small bowl, whisk together teriyaki sauce, soy sauce, and honey.",
      "Return chicken to the pan, add the sauce mixture, and bring to a simmer.",
      "Stir in cornstarch mixture and cook for 1-2 minutes until sauce thickens.",
      "Garnish with green onions and sesame seeds.",
      "Serve hot over cooked rice."
    ],
    category: ["Asian", "Main Course"],
    tags: ["chicken", "quick", "stir-fry"],
    createdAt: new Date("2023-07-05")
  },
  {
    id: "9",
    title: "Tiramisu",
    description: "A classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder. The perfect finale to any meal!",
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    prepTime: 30,
    cookTime: 0,
    servings: 8,
    difficulty: "Medium",
    ingredients: [
      "6 egg yolks",
      "3/4 cup white sugar",
      "2/3 cup milk",
      "1 1/4 cups heavy cream",
      "1/2 tsp vanilla extract",
      "1 lb mascarpone cheese",
      "1/2 cup strong coffee, cooled",
      "2 tbsp rum (optional)",
      "2 (3 oz) packages ladyfinger cookies",
      "1 tbsp cocoa powder"
    ],
    instructions: [
      "In a medium saucepan, whisk together egg yolks and sugar until well blended.",
      "Whisk in milk and cook over medium heat, stirring constantly, until mixture boils.",
      "Boil gently for 1 minute, then remove from heat and allow to cool slightly.",
      "Cover and chill in refrigerator for 1 hour.",
      "In a medium bowl, beat cream with vanilla until stiff peaks form.",
      "Whisk mascarpone into the yolk mixture until smooth.",
      "Gently fold in whipped cream.",
      "Combine coffee and rum in a small bowl.",
      "Split ladyfingers in half and line the bottom of a 9x9 inch dish.",
      "Brush with coffee mixture, then spread half the mascarpone mixture over the ladyfingers.",
      "Repeat layers and sprinkle with cocoa powder.",
      "Cover and refrigerate for at least 6 hours, or overnight."
    ],
    category: ["Italian", "Dessert"],
    tags: ["no-bake", "classic", "make-ahead"],
    createdAt: new Date("2023-07-20")
  },
  {
    id: "10",
    title: "Spicy Thai Green Curry",
    description: "A fragrant and spicy Thai curry with coconut milk, vegetables, and your choice of protein. Adjust the heat level to your preference!",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "2-3 tbsp green curry paste",
      "2 (14 oz) cans coconut milk",
      "1 lb chicken, tofu, or shrimp",
      "1 bell pepper, sliced",
      "1 zucchini, sliced",
      "1 cup snap peas",
      "1 cup Thai eggplant (or regular eggplant)",
      "3 tbsp fish sauce",
      "1 tbsp palm sugar or brown sugar",
      "4 kaffir lime leaves",
      "1 cup Thai basil leaves",
      "2 red chili peppers, sliced (optional)",
      "Cooked jasmine rice for serving",
      "Lime wedges for serving"
    ],
    instructions: [
      "In a large pot, heat 2 tablespoons of coconut milk over medium-high heat until it begins to bubble.",
      "Add curry paste and cook for 1 minute until fragrant.",
      "Add protein of choice and cook until nearly done (about 3 minutes for chicken or shrimp).",
      "Pour in remaining coconut milk and bring to a simmer.",
      "Add vegetables and kaffir lime leaves, simmer until vegetables are tender-crisp (about 5-7 minutes).",
      "Stir in fish sauce and sugar, adjust to taste.",
      "Remove from heat and stir in Thai basil leaves.",
      "Serve hot over jasmine rice, garnished with sliced chili peppers if desired and lime wedges on the side."
    ],
    category: ["Thai", "Main Course"],
    tags: ["spicy", "coconut", "curry"],
    createdAt: new Date("2023-08-05")
  }
];

// Adding 40 more simplified recipes to reach 50+ total recipes
for (let i = 11; i <= 50; i++) {
  const categories = ["Italian", "Mexican", "Asian", "American", "Indian", "Mediterranean", "French"];
  const difficulties = ["Easy", "Medium", "Hard"];
  
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  
  recipes.push({
    id: i.toString(),
    title: `${randomCategory} Recipe #${i}`,
    description: `A delicious ${randomCategory.toLowerCase()} dish that's perfect for any occasion. Try this ${randomDifficulty.toLowerCase()}-to-make recipe today!`,
    imageUrl: `https://source.unsplash.com/random/300x200?${randomCategory.toLowerCase()},food`,
    prepTime: Math.floor(Math.random() * 30) + 10,
    cookTime: Math.floor(Math.random() * 60) + 15,
    servings: Math.floor(Math.random() * 6) + 2,
    difficulty: randomDifficulty as "Easy" | "Medium" | "Hard",
    ingredients: [
      "Ingredient 1",
      "Ingredient 2",
      "Ingredient 3",
      "Ingredient 4",
      "Ingredient 5"
    ],
    instructions: [
      "Step 1: Prepare ingredients",
      "Step 2: Mix ingredients together",
      "Step 3: Cook according to instructions",
      "Step 4: Serve and enjoy"
    ],
    category: [randomCategory],
    tags: ["quick", "flavorful", "family-friendly"],
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
  });
}

export default recipes;
