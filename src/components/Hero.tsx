import { ArrowRight, FileText, Brain, Download, GraduationCap, Microscope, BookOpen, Briefcase, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sparkle decoration component matching gitingest style
const SparkleDecor = ({ className, color = "primary" }: { className?: string; color?: "primary" | "accent" | "red" | "green" }) => {
  const colors = {
    primary: "text-primary",
    accent: "text-accent", 
    red: "text-red-400",
    green: "text-green-400"
  };
  return (
    <svg className={`${colors[color]} ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
};

const Hero = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container relative">
        <div className="max-w-3xl mx-auto text-center py-12 md:py-20 relative">
          {/* Decorative sparkles like gitingest */}
          <SparkleDecor className="absolute -top-4 left-0 md:left-20 w-8 h-8 hidden md:block" color="red" />
          <SparkleDecor className="absolute top-8 left-8 md:left-32 w-4 h-4 hidden md:block" color="green" />
          <SparkleDecor className="absolute top-0 right-0 md:right-16 w-6 h-6 hidden md:block" color="green" />
          <SparkleDecor className="absolute top-12 right-4 md:right-24 w-3 h-3 hidden md:block" color="primary" />
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-primary">AI-Powered</span>
            <br />Flashcard Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto font-body">
            Turn any PDF, notes, or text into Anki-ready flashcards.
            <br className="hidden sm:block" />
            This is useful for studying smarter, not harder.
          </p>
        </div>

        {/* Main Card - gitingest style */}
        <div className="max-w-3xl mx-auto relative">
          {/* Decorative sparkle */}
          <SparkleDecor className="absolute -bottom-8 -left-8 w-12 h-12 hidden md:block" color="green" />
          
          <div className="bg-secondary/80 rounded-2xl border-2 border-foreground p-6 md:p-8 shadow-[4px_4px_0_0_hsl(var(--foreground))]">
            {/* Input row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              <input 
                type="text" 
                placeholder="Paste your notes or drop a PDF..."
                className="flex-1 bg-accent/30 border-2 border-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                readOnly
              />
              <Link to="/studio">
                <Button className="bg-foreground text-background hover:bg-foreground/90 px-6 py-3 rounded-lg font-medium w-full sm:w-auto">
                  Generate
                </Button>
              </Link>
            </div>
            
            {/* Controls row */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <select className="bg-background border-2 border-foreground rounded-md px-3 py-1.5 text-sm font-medium cursor-pointer focus:outline-none">
                  <option>GPT-4</option>
                  <option>Claude</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Focus: definitions, concepts..."
                  className="bg-background border-2 border-foreground rounded-md px-3 py-1.5 text-sm w-40 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Cards:</span>
                <span className="font-bold">10</span>
                <input type="range" min="5" max="50" defaultValue="10" className="w-24 accent-primary" />
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <input type="checkbox" id="advanced" className="w-4 h-4 accent-primary border-2 border-foreground rounded" />
                <label htmlFor="advanced" className="text-sm font-medium flex items-center gap-1">
                  Advanced
                  <span className="badge-new text-[10px] px-1.5 py-0.5">NEW</span>
                </label>
              </div>
            </div>
            
            {/* Example tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Try these:</span>
              {["Biology Notes", "Medical Terms", "History Chapter", "Law Cases", "Vocab List"].map((item) => (
                <Link to="/studio" key={item}>
                  <button className="px-3 py-1.5 rounded-full border-2 border-foreground/30 text-sm font-medium hover:bg-foreground hover:text-background transition-colors">
                    {item}
                  </button>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Tip below card */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Supports PDF, TXT, DOCX • Max 50MB • Export to .apkg
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-body">
            Three simple steps to transform your study materials
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: FileText,
              title: "1. Upload",
              description: "Drop a PDF, paste text, or upload any document."
            },
            {
              icon: Brain,
              title: "2. Generate",
              description: "AI creates Q&A pairs optimized for spaced repetition."
            },
            {
              icon: Download,
              title: "3. Export",
              description: "Download as .apkg and import directly into Anki."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-secondary/50 border-2 border-foreground rounded-2xl p-6 shadow-[3px_3px_0_0_hsl(var(--foreground))] hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-background border-2 border-foreground flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm font-body">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who's it for Section */}
      <section id="who" className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Learners</h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-body">
            Perfect for anyone using spaced repetition to learn
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { icon: Microscope, title: "Med Students", description: "Anatomy, pharmacology, pathology" },
            { icon: GraduationCap, title: "Students", description: "Exam prep, lectures, textbooks" },
            { icon: BookOpen, title: "Law Students", description: "Case briefs, statutes, terms" },
            { icon: Briefcase, title: "Professionals", description: "Certifications, skills, training" }
          ].map((item, index) => (
            <div key={index} className="p-5 rounded-xl border-2 border-foreground/20 hover:border-foreground transition-colors bg-card">
              <item.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground font-body">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container py-24">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-secondary/80 border-2 border-foreground rounded-2xl p-8 md:p-12 shadow-[4px_4px_0_0_hsl(var(--foreground))] relative">
            <SparkleDecor className="absolute -top-4 -left-4 w-8 h-8" color="red" />
            <SparkleDecor className="absolute -bottom-4 -right-4 w-6 h-6" color="green" />
            
            <div className="inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 rounded-full text-sm font-bold mb-6">
              <Zap className="w-4 h-4" />
              Coming Soon
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Pricing</h2>
            <p className="text-muted-foreground mb-6 font-body text-sm">
              Free during early access. Support development if you find it useful!
            </p>
            
            <div className="bg-background border-2 border-foreground rounded-xl p-6 mb-6">
              <div className="text-4xl font-bold text-primary mb-1">$0</div>
              <p className="text-sm text-muted-foreground">Early Access</p>
            </div>
            
            <a 
              href="https://buymeacoffee.com/htclodkzgo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
            >
              ☕ Buy Me a Coffee
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;