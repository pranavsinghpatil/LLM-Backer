import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Brain, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  user?: { email: string } | null;
  onSignIn?: () => void;
}

const Hero = ({ user, onSignIn }: HeroProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-gradient" />
      <div className="absolute inset-0 bg-radial-gradient-bottom" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] float-animation" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] float-animation-delayed" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/15 rounded-full blur-[80px] float-animation-slow" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Learning Revolution
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in [animation-delay:100ms] opacity-0">
            Turn Anything into{" "}
            <span className="gradient-text">Anki Decks</span>{" "}
            in Seconds
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in [animation-delay:200ms] opacity-0">
            Upload PDFs or paste text. Let AI generate high-quality flashcards for you to study smarter, not harder.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in [animation-delay:300ms] opacity-0">
            {user ? (
              <Link to="/studio">
                <Button variant="glow" size="xl" className="group">
                  Open Studio
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Button variant="glow" size="xl" className="group" onClick={onSignIn}>
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            <a href="#features">
              <Button variant="glass" size="xl">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Preview Cards */}
          <div className="relative max-w-4xl mx-auto animate-fade-in-up [animation-delay:400ms] opacity-0">
            {/* Main Preview Card */}
            <div className="glass-card p-6 sm:p-8 glow-effect">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Input Preview */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                    <Upload className="w-4 h-4" />
                    Input
                  </div>
                  <div className="drop-zone p-6 min-h-[140px] flex flex-col items-center justify-center text-center">
                    <FileText className="w-10 h-10 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop your PDF or paste text
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Supports PDF, TXT, and direct text input
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex items-center justify-center px-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center pulse-glow">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Output Preview */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                    <Brain className="w-4 h-4" />
                    Output
                  </div>
                  <div className="space-y-3">
                    <FlashcardPreview
                      front="What is the powerhouse of the cell?"
                      back="Mitochondria"
                    />
                    <FlashcardPreview
                      front="Define photosynthesis"
                      back="The process by which plants convert light energy..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <div className="absolute -top-8 -left-4 lg:-left-12 glass-card p-4 float-animation hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Lightning Fast</p>
                  <p className="text-xs text-muted-foreground">Generate in seconds</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-4 lg:-right-12 glass-card p-4 float-animation-delayed hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Powered</p>
                  <p className="text-xs text-muted-foreground">Smart card generation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="pt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">study smarter</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powered by advanced AI to transform your learning materials into effective flashcards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={Upload}
              title="Multiple Input Formats"
              description="Upload PDFs, paste text, or import from URLs. We handle any format you throw at us."
            />
            <FeatureCard
              icon={Brain}
              title="Smart AI Processing"
              description="Our AI understands context, extracts key concepts, and creates meaningful Q&A pairs."
            />
            <FeatureCard
              icon={FileText}
              title="Anki-Ready Export"
              description="Export directly to .apkg format ready to import into Anki. No manual formatting needed."
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="pt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, transparent{" "}
              <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start free and upgrade when you need more power
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <PricingCard
              title="Free"
              price="$0"
              description="Perfect for trying out MeshCards"
              features={[
                "10 cards per generation",
                "Basic AI model",
                "Standard export formats",
                "Community support",
              ]}
            />
            <PricingCard
              title="Pro"
              price="$9"
              description="For serious learners"
              features={[
                "Unlimited cards per generation",
                "Advanced AI models",
                "Priority processing",
                "Custom card templates",
                "Email support",
              ]}
              highlighted
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const FlashcardPreview = ({ front, back }: { front: string; back: string }) => (
  <div className="bg-muted/30 rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group">
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
          {front}
        </p>
        <p className="text-xs text-muted-foreground truncate">{back}</p>
      </div>
      <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <span className="text-xs font-bold text-primary">Q</span>
      </div>
    </div>
  </div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="glass-card p-6 group hover:border-primary/30 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-primary-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const PricingCard = ({
  title,
  price,
  description,
  features,
  highlighted,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) => (
  <div
    className={`glass-card p-8 relative ${
      highlighted ? "border-primary/50 glow-effect" : ""
    }`}
  >
    {highlighted && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-bold mb-1">{title}</h3>
    <p className="text-muted-foreground text-sm mb-4">{description}</p>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-extrabold">{price}</span>
      <span className="text-muted-foreground">/month</span>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 text-sm">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <svg
              className="w-3 h-3 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          {feature}
        </li>
      ))}
    </ul>
    <Button
      variant={highlighted ? "gradient" : "outline"}
      className="w-full"
    >
      Get Started
    </Button>
  </div>
);

export default Hero;
