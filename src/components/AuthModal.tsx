
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "login" | "register";
}

const AuthModal = ({ isOpen, onOpenChange, defaultMode = "login" }: AuthModalProps) => {
  const { login, register } = useApp();
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultMode);
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Form errors
  const [errors, setErrors] = useState<{
    login?: { email?: string; password?: string };
    register?: { username?: string; email?: string; password?: string; confirmPassword?: string };
  }>({});
  
  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: { email?: string; password?: string } = {};
    
    if (!loginEmail.trim()) {
      newErrors.email = "Email is required";
    }
    
    if (!loginPassword) {
      newErrors.password = "Password is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors({ login: newErrors });
      return;
    }
    
    // Submit form
    setLoading(true);
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        onOpenChange(false);
        resetForms();
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Handle register submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!registerUsername.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!registerEmail.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!registerPassword) {
      newErrors.password = "Password is required";
    } else if (registerPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (registerPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors({ register: newErrors });
      return;
    }
    
    // Submit form
    setLoading(true);
    try {
      const success = await register(registerUsername, registerEmail, registerPassword);
      if (success) {
        onOpenChange(false);
        resetForms();
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Reset forms when modal is closed
  const resetForms = () => {
    setLoginEmail("");
    setLoginPassword("");
    setRegisterUsername("");
    setRegisterEmail("");
    setRegisterPassword("");
    setConfirmPassword("");
    setErrors({});
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) resetForms();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>
            Login to save your favorite recipes or create an account to get started.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                {errors.login?.email && (
                  <p className="text-sm text-destructive">{errors.login.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                {errors.login?.password && (
                  <p className="text-sm text-destructive">{errors.login.password}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input
                  id="register-username"
                  type="text"
                  placeholder="Your username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
                {errors.register?.username && (
                  <p className="text-sm text-destructive">{errors.register.username}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                {errors.register?.email && (
                  <p className="text-sm text-destructive">{errors.register.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                {errors.register?.password && (
                  <p className="text-sm text-destructive">{errors.register.password}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.register?.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.register.confirmPassword}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
