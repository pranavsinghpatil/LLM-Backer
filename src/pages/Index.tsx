import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<{ email: string; avatar_url?: string } | null>(null);

  const handleSignIn = () => {
    // Placeholder for Supabase Google auth
    toast({
      title: "Sign In",
      description: "Google authentication will be configured with Supabase",
    });
  };

  const handleSignOut = () => {
    setUser(null);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
      <Hero user={user} onSignIn={handleSignIn} />
      <Footer />
    </div>
  );
};

export default Index;
