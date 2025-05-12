
import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-recipe-primary/5 border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-recipe-primary">
              <Utensils className="h-5 w-5" />
              <span>RecipeFinder</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Discover delicious recipes from around the world. Save your favorites 
              and create your own recipes to share with the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-recipe-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-muted-foreground hover:text-recipe-primary transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/create-recipe" className="text-muted-foreground hover:text-recipe-primary transition-colors">
                  Create Recipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=Italian" className="text-muted-foreground hover:text-recipe-primary transition-colors">
                  Italian
                </Link>
              </li>
              <li>
                <Link to="/?category=Mexican" className="text-muted-foreground hover:text-recipe-primary transition-colors">
                  Mexican
                </Link>
              </li>
              <li>
                <Link to="/?category=Asian" className="text-muted-foreground hover:text-recipe-primary transition-colors">
                  Asian
                </Link>
              </li>
              <li>
                <Link to="/?category=Vegetarian" className="text-muted-foreground hover:text-recipe-primary transition-colors">
                  Vegetarian
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} RecipeFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
