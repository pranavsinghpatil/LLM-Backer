import { useState } from "react";
import { Menu, X, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  user?: { email: string; avatar_url?: string } | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

const Header = ({ user, onSignIn, onSignOut }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/10">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>Mesh<span className="text-primary">Cards</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Features
          </a>
          <a href="#who" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Who's it for
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Pricing
          </a>
        </nav>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/studio">
                <Button className="bg-foreground text-background hover:bg-foreground/90">
                  Open Studio
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={onSignIn} className="bg-foreground text-background hover:bg-foreground/90">
              Sign in
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border/10">
          <nav className="container py-4 flex flex-col gap-4">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#who" className="text-muted-foreground hover:text-foreground transition-colors">
              Who's it for
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            {user ? (
              <>
                <Link to="/studio">
                  <Button className="w-full bg-foreground text-background">Open Studio</Button>
                </Link>
                <Button variant="ghost" onClick={onSignOut} className="justify-start">
                  <LogOut className="w-4 h-4 mr-2" /> Sign out
                </Button>
              </>
            ) : (
              <Button onClick={onSignIn} className="bg-foreground text-background">Sign in</Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
