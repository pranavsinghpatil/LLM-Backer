import { ArrowRight, FileText, Brain, Download, GraduationCap, Microscope, BookOpen, Briefcase, Zap, Heart, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container relative">
        {/* Decorative elements */}
        <SparkleDecor className="absolute top-0 left-10 w-8 h-8 animate-float hidden md:block" color="text-accent" />
        <StarDecor className="absolute top-20 right-20 w-6 h-6 animate-bounce-subtle hidden md:block" color="text-primary" />
        <SparkleDecor className="absolute bottom-40 right-10 w-10 h-10 animate-float hidden md:block [animation-delay:1s]" color="text-primary" />

        <div className="max-w-3xl mx-auto text-center py-16 md:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Turn <span className="text-primary">Anything</span> into
            <br />Anki Decks
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto font-body">
            Upload PDFs, paste notes, or drop any text. AI generates high-quality flashcards so you can study smarter, not harder.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/studio">
              <Button 
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-6 rounded-xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/feedback" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Give Feedback →
            </Link>
          </div>
        </div>

        {/* Main Card Preview */}
        <div className="max-w-2xl mx-auto">
          <div className="card-bordered p-6 relative">
            {/* Badge */}
            <span className="badge-new absolute -top-3 left-6">NEW</span>
            
            <div className="flex items-center gap-3 mb-4">
              <input 
                type="text" 
                placeholder="Paste your notes or upload a PDF..."
                className="flex-1 bg-secondary/50 border-2 border-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                readOnly
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                Generate
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Try:</span>
              {["Biology Notes", "History Chapter", "Medical Terms", "Law Cases"].map((item) => (
                <button key={item} className="px-3 py-1 rounded-full border border-foreground/20 text-sm hover:bg-secondary transition-colors">
                  {item}
                </button>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Supports PDF, TXT, DOCX • Max 50MB
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-body">
            Three simple steps to transform your study materials into effective flashcards
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: FileText,
              title: "1. Upload Content",
              description: "Drop a PDF, paste text, or upload any document. We handle the parsing."
            },
            {
              icon: Brain,
              title: "2. AI Generates Cards",
              description: "Our AI analyzes content and creates question-answer pairs optimized for retention."
            },
            {
              icon: Download,
              title: "3. Export to Anki",
              description: "Download your deck as .apkg and import directly into Anki. Ready to study!"
            }
          ].map((feature, index) => (
            <div key={index} className="card-soft p-8 hover-lift">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground font-body">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who's it for Section */}
      <section id="who" className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Learners</h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-body">
            Whether you're studying for exams or mastering new skills, MeshCards helps you learn faster
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Microscope,
              title: "Med Students",
              description: "Master anatomy, pharmacology, and pathology with AI-generated flashcards from your textbooks."
            },
            {
              icon: GraduationCap,
              title: "Bio Students", 
              description: "Turn complex biology concepts into memorable Q&A pairs for better exam prep."
            },
            {
              icon: BookOpen,
              title: "Law Students",
              description: "Convert case briefs and statutes into study-ready flashcards automatically."
            },
            {
              icon: Briefcase,
              title: "Professionals",
              description: "Stay sharp with certifications, new skills, and continuous learning materials."
            }
          ].map((item, index) => (
            <div key={index} className="p-6 rounded-2xl border border-border/20 hover:border-primary/50 transition-colors bg-card/50">
              <item.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-bordered p-12 relative">
            <SparkleDecor className="absolute -top-4 -left-4 w-8 h-8" color="text-primary" />
            <SparkleDecor className="absolute -bottom-4 -right-4 w-6 h-6" color="text-accent" />
            
            <div className="inline-flex items-center gap-2 bg-secondary/80 px-4 py-2 rounded-full text-sm font-medium text-secondary-foreground mb-6">
              <Zap className="w-4 h-4" />
              Coming Soon
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h2>
            <p className="text-muted-foreground mb-8 font-body">
              We're working on making MeshCards accessible to everyone. Right now, it's completely free to use while we build and improve the platform.
            </p>
            
            <div className="bg-secondary/50 rounded-xl p-6 mb-8">
              <div className="text-4xl font-bold text-primary mb-2">Free</div>
              <p className="text-sm text-muted-foreground">During early access</p>
            </div>
            
            <p className="text-sm text-muted-foreground font-body">
              Love MeshCards? Support development through{" "}
              <a 
                href="https://buymeacoffee.com/htclodkzgo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Buy Me a Coffee
              </a>{" "}
              ☕
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
