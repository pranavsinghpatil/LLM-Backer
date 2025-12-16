import { useState } from "react";
import { Menu, X, Sparkles, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme, themes } from "@/hooks/useTheme";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span>Anki<span className="text-primary">Gen</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/studio" className="text-muted-foreground hover:text-foreground transition-colors">
              Studio
            </Link>
            <Link to="/feedback" className="text-muted-foreground hover:text-foreground transition-colors">
              Feedback
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher */}
            <div className="relative group">
              <button className="btn-ghost p-2" title="Change theme">
                <Palette className="w-5 h-5" />
              </button>
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[140px]">
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setTheme(t.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      theme === t.name ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: t.color }}
                    />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <Link to="/studio" className="hidden md:flex btn-primary text-sm py-2">
              Open Studio
            </Link>

            <button
              className="md:hidden btn-ghost p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              <Link to="/" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/studio" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Studio
              </Link>
              <Link to="/feedback" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Feedback
              </Link>
              <Link to="/studio" className="btn-primary mx-4 mt-2" onClick={() => setMobileMenuOpen(false)}>
                Open Studio
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
