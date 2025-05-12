
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Utensils, Search, User, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import AuthModal from "./AuthModal";

const Header = () => {
  const { searchTerm, setSearchTerm, currentUser, logout } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  
  const openLoginModal = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };
  
  const openRegisterModal = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center py-4 gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-recipe-primary mr-auto">
            <Utensils className="h-6 w-6" />
            <span>RecipeFinder</span>
          </Link>
          
          <div className="w-full md:w-auto flex-1 max-w-md relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search recipes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <nav className="flex items-center gap-2 md:gap-4">
            <Link to="/favorites">
              <Button variant="ghost">Favorites</Button>
            </Link>
            
            {currentUser ? (
              <>
                <Link to="/create-recipe">
                  <Button variant="ghost" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    <span className="hidden md:inline">Create Recipe</span>
                  </Button>
                </Link>
                
                <div className="flex items-center gap-2">
                  <Link to="/profile">
                    <Button variant="ghost" className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span className="hidden md:inline">{currentUser.username}</span>
                    </Button>
                  </Link>
                  
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={openLoginModal}>
                  Login
                </Button>
                <Button onClick={openRegisterModal}>
                  Register
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        defaultMode={authMode}
      />
    </header>
  );
};

export default Header;
