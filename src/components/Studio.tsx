import { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, Sparkles, Download, RefreshCw, ChevronDown, Coffee, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

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
  const [focusArea, setFocusArea] = useState("balanced");
  const [isDragging, setIsDragging] = useState(false);
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
      toast({
        title: "File uploaded",
        description: `${file.name} is ready for processing.`,
      });
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
      toast({
        title: "File uploaded",
        description: `${file.name} is ready for processing.`,
      });
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
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const mockCards: GeneratedCard[] = Array.from({ length: cardCount }, (_, i) => ({
      id: `card-${i + 1}`,
      front: `Sample Question ${i + 1}: What is the key concept from your ${uploadedFile ? "document" : "notes"}?`,
      back: `This is the answer to question ${i + 1}. In a real implementation, AI would generate meaningful Q&A pairs based on your content.`,
    }));

    setGeneratedCards(mockCards);
    setIsGenerating(false);
    
    toast({
      title: "Cards generated!",
      description: `${mockCards.length} flashcards created successfully.`,
    });
  };

  const handleExport = () => {
    // TODO: Implement actual .apkg export
    toast({
      title: "Export started",
      description: "Your Anki deck will download shortly.",
    });
  };

  const clearContent = () => {
    setText("");
    setUploadedFile(null);
    setGeneratedCards([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="h-6 w-px bg-border/20" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">MeshCards Studio</span>
            </div>
          </div>
          
          <a
            href="https://buymeacoffee.com/htclodkzgo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFDD00] text-black font-medium text-sm hover:bg-[#FFDD00]/90 transition-colors"
          >
            <Coffee className="w-4 h-4" />
            Support
          </a>
        </div>
      </header>

      <main className="container py-8">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input Section - 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            {/* File Upload */}
            <div
              className={`card-bordered p-8 transition-all cursor-pointer ${
                isDragging ? "border-primary scale-[1.01]" : ""
              } ${uploadedFile ? "border-primary" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !uploadedFile && fileInputRef.current?.click()}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <FileText className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <p className="font-medium mb-1">Drop your file here</p>
                  <p className="text-sm text-muted-foreground mb-4">PDF, TXT, or DOCX up to 50MB</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.txt,.docx"
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="border-2 border-foreground"
                  >
                    Browse Files
                  </Button>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border/20" />
              <span className="text-sm text-muted-foreground">or paste text</span>
              <div className="flex-1 h-px bg-border/20" />
            </div>

            {/* Text Input */}
            <div className="card-soft p-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your notes, lecture content, or any text you want to convert into flashcards..."
                className="w-full h-64 bg-transparent resize-none p-4 focus:outline-none font-body text-sm"
              />
            </div>
          </div>

          {/* Config Section - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card-soft p-6 space-y-6">
              <h3 className="font-bold text-lg">Configuration</h3>
              
              {/* AI Model */}
              <div>
                <label className="text-sm font-medium mb-2 block">AI Model</label>
                <div className="relative">
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full bg-secondary/50 border border-border/20 rounded-lg px-4 py-3 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="gpt-4">GPT-4 (Best quality)</option>
                    <option value="gpt-3.5">GPT-3.5 (Faster)</option>
                    <option value="claude">Claude (Balanced)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Card Count */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Number of Cards: <span className="text-primary">{cardCount}</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={cardCount}
                  onChange={(e) => setCardCount(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>

              {/* Focus Area */}
              <div>
                <label className="text-sm font-medium mb-2 block">Focus Area</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "balanced", label: "Balanced" },
                    { value: "definitions", label: "Definitions" },
                    { value: "concepts", label: "Concepts" },
                    { value: "details", label: "Details" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFocusArea(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        focusArea === option.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 hover:bg-secondary"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || (!text && !uploadedFile)}
                className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 text-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Cards
                  </>
                )}
              </Button>
            </div>

            {/* Quick Tips */}
            <div className="bg-secondary/30 rounded-xl p-4">
              <p className="text-sm font-medium mb-2">💡 Tips</p>
              <ul className="text-xs text-muted-foreground space-y-1 font-body">
                <li>• More specific content = better cards</li>
                <li>• Use "Definitions" for vocabulary-heavy text</li>
                <li>• Longer documents may take more time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Generated Cards */}
        {generatedCards.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Generated Cards ({generatedCards.length})</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearContent} className="border-2">
                  Clear All
                </Button>
                <Button onClick={handleExport} className="bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Export to Anki
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedCards.slice(0, 9).map((card) => (
                <div key={card.id} className="card-soft p-4 space-y-3">
                  <div>
                    <span className="text-xs font-medium text-primary uppercase">Front</span>
                    <p className="text-sm font-body mt-1">{card.front}</p>
                  </div>
                  <div className="h-px bg-border/20" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Back</span>
                    <p className="text-sm text-muted-foreground font-body mt-1">{card.back}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {generatedCards.length > 9 && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                + {generatedCards.length - 9} more cards in your deck
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Studio;
