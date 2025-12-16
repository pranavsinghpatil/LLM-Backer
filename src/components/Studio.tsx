import { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, Download, RefreshCw, ChevronDown, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Sparkle decoration component
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

interface GeneratedCard {
  id: string;
  front: string;
  back: string;
}

const Studio = () => {
  const [text, setText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<GeneratedCard[]>([]);
  const [cardCount, setCardCount] = useState(10);
  const [aiModel, setAiModel] = useState("gpt-4");
  const [focusArea, setFocusArea] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [".pdf", ".txt", ".docx"];
      const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
      if (!validTypes.includes(fileExt)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, TXT, or DOCX file.",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      toast({ title: "File uploaded", description: `${file.name} ready.` });
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      toast({ title: "File uploaded", description: `${file.name} ready.` });
    }
  }, []);

  const handleGenerate = async () => {
    if (!text && !uploadedFile) {
      toast({
        title: "No content",
        description: "Please paste text or upload a file first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const mockCards: GeneratedCard[] = Array.from({ length: cardCount }, (_, i) => ({
      id: `card-${i + 1}`,
      front: `Question ${i + 1}: What is the key concept from your ${uploadedFile ? "document" : "notes"}?`,
      back: `Answer ${i + 1}: This is a sample answer. Real AI would generate meaningful Q&A pairs from your content.`,
    }));

    setGeneratedCards(mockCards);
    setIsGenerating(false);
    toast({ title: "Done!", description: `${mockCards.length} cards generated.` });
  };

  const handleExport = () => {
    toast({ title: "Exporting...", description: "Your .apkg file will download shortly." });
  };

  const copyCard = (card: GeneratedCard) => {
    navigator.clipboard.writeText(`Q: ${card.front}\nA: ${card.back}`);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearAll = () => {
    setText("");
    setUploadedFile(null);
    setGeneratedCards([]);
  };

  const hasContent = text.length > 0 || uploadedFile !== null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          {/* Title */}
          <div className="max-w-3xl mx-auto text-center mb-8 relative">
            <SparkleDecor className="absolute -top-2 left-10 w-6 h-6 hidden md:block" color="red" />
            <SparkleDecor className="absolute top-0 right-16 w-4 h-4 hidden md:block" color="green" />
            
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Flashcard <span className="text-primary">Studio</span>
            </h1>
            <p className="text-muted-foreground font-body">
              Paste your content below and let AI generate study cards
            </p>
          </div>

          {/* Main Input Card - gitingest style */}
          <div className="max-w-3xl mx-auto relative mb-8">
            <SparkleDecor className="absolute -bottom-6 -left-6 w-10 h-10 hidden md:block" color="green" />
            
            <div className="bg-secondary/80 rounded-2xl border-2 border-foreground p-6 shadow-[4px_4px_0_0_hsl(var(--foreground))]">
              {/* File Upload / Text Input Area */}
              <div
                className={`
                  relative rounded-xl border-2 border-dashed transition-all mb-4
                  ${isDragging ? "border-primary bg-primary/10" : "border-foreground/30"}
                  ${uploadedFile ? "border-primary bg-primary/5" : ""}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 border-2 border-foreground flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="p-6 text-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-12 h-12 rounded-xl bg-background border-2 border-foreground flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="font-medium text-sm mb-1">Drop your file here or click to upload</p>
                    <p className="text-xs text-muted-foreground">PDF, TXT, DOCX • Max 50MB</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.txt,.docx"
                  className="hidden"
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-foreground/20" />
                <span className="text-xs font-medium text-muted-foreground">or paste text</span>
                <div className="flex-1 h-px bg-foreground/20" />
              </div>

              {/* Text Area */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your notes, lecture content, or any text here..."
                className="w-full h-40 resize-none rounded-xl border-2 border-foreground bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all mb-4"
              />

              {/* Controls Row */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {/* Model Select */}
                <div className="relative">
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="appearance-none bg-background border-2 border-foreground rounded-lg px-3 py-2 pr-8 text-sm font-medium cursor-pointer focus:outline-none"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5">GPT-3.5</option>
                    <option value="claude">Claude</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                {/* Focus Input */}
                <input
                  type="text"
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  placeholder="Focus: definitions, concepts..."
                  className="bg-background border-2 border-foreground rounded-lg px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {/* Card Count */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Cards:</span>
                  <span className="font-bold text-primary w-6">{cardCount}</span>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={cardCount}
                    onChange={(e) => setCardCount(Number(e.target.value))}
                    className="w-20 accent-primary"
                  />
                </div>

                {/* Character count */}
                <span className="text-xs text-muted-foreground ml-auto">
                  {text.length} chars
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !hasContent}
                  className="flex-1 bg-foreground text-background hover:bg-foreground/90 py-3 rounded-lg font-medium"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Cards"
                  )}
                </Button>
                
                {hasContent && (
                  <Button
                    onClick={clearAll}
                    variant="outline"
                    className="border-2 border-foreground rounded-lg px-4"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Tip */}
            <p className="text-center text-xs text-muted-foreground mt-3">
              💡 Tip: More specific content = better flashcards
            </p>
          </div>

          {/* Generated Cards Section */}
          {generatedCards.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-secondary/80 rounded-2xl border-2 border-foreground p-6 shadow-[4px_4px_0_0_hsl(var(--foreground))]">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg">
                    Generated Cards ({generatedCards.length})
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const all = generatedCards.map(c => `Q: ${c.front}\nA: ${c.back}`).join("\n\n");
                        navigator.clipboard.writeText(all);
                        toast({ title: "Copied all cards!" });
                      }}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border-2 border-foreground/30 hover:bg-foreground hover:text-background transition-colors"
                    >
                      Copy All
                    </button>
                    <button
                      onClick={handleExport}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Export .apkg
                    </button>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {generatedCards.map((card, i) => (
                    <div
                      key={card.id}
                      className="bg-background border-2 border-foreground rounded-xl p-4 hover:-translate-y-0.5 transition-transform"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-primary mb-1">Q{i + 1}</div>
                          <p className="text-sm font-medium mb-2">{card.front}</p>
                          <p className="text-sm text-muted-foreground">{card.back}</p>
                        </div>
                        <button
                          onClick={() => copyCard(card)}
                          className="p-2 hover:bg-foreground/10 rounded-lg transition-colors shrink-0"
                        >
                          {copiedId === card.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Studio;