import { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, Sparkles, Download, RefreshCw, ChevronDown, ChevronLeft, Settings, Layers } from "lucide-react";
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

  const hasContent = text.length > 0 || uploadedFile !== null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sm">MeshCards Studio</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
          {/* Left Panel - Input */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">Input</h2>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
              {/* File Upload Area */}
              <div
                className={`
                  relative rounded-xl border-2 border-dashed transition-all cursor-pointer
                  ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
                  ${uploadedFile ? "border-primary bg-primary/5" : ""}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !uploadedFile && fileInputRef.current?.click()}
              >
                {uploadedFile ? (
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
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
                      onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                      className="p-1.5 hover:bg-muted rounded-md transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm mb-1">Drop your file here</p>
                    <p className="text-xs text-muted-foreground">PDF, TXT, or DOCX • Max 50MB</p>
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
              <div className="flex items-center gap-3 px-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or paste text</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Text Area */}
              <div className="flex-1 min-h-0">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your notes, lecture content, or any text you want to convert into flashcards..."
                  className="w-full h-full resize-none rounded-xl border border-border bg-card p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* Character count */}
              <div className="text-xs text-muted-foreground text-right">
                {text.length} characters
              </div>
            </div>
          </div>

          {/* Right Panel - Config & Output */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-4">
            {/* Config Section */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-sm">Configuration</h2>
              </div>

              <div className="space-y-4">
                {/* AI Model */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">AI Model</label>
                  <div className="relative">
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="gpt-4">GPT-4 (Best)</option>
                      <option value="gpt-3.5">GPT-3.5 (Fast)</option>
                      <option value="claude">Claude</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Card Count */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Cards: <span className="text-primary font-semibold">{cardCount}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={cardCount}
                    onChange={(e) => setCardCount(Number(e.target.value))}
                    className="w-full accent-primary h-1.5"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                    <span>5</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Focus Area */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Focus</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {["balanced", "definitions", "concepts", "details"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFocusArea(option)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                          focusArea === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !hasContent}
                className="w-full mt-5 h-10"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Cards
                  </>
                )}
              </Button>
            </div>

            {/* Generated Cards Preview */}
            {generatedCards.length > 0 && (
              <div className="flex-1 rounded-xl border border-border bg-card p-5 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">
                    {generatedCards.length} Cards
                  </h3>
                  <button
                    onClick={clearContent}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                  {generatedCards.slice(0, 5).map((card, i) => (
                    <div key={card.id} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                      <div className="text-[10px] font-medium text-primary uppercase mb-1">Q{i + 1}</div>
                      <p className="text-xs line-clamp-2">{card.front}</p>
                    </div>
                  ))}
                  {generatedCards.length > 5 && (
                    <p className="text-xs text-center text-muted-foreground py-2">
                      +{generatedCards.length - 5} more
                    </p>
                  )}
                </div>

                <Button onClick={handleExport} className="w-full h-9" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export .apkg
                </Button>
              </div>
            )}

            {/* Tips - only show when no cards */}
            {generatedCards.length === 0 && (
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-xs font-medium mb-2">💡 Tips</p>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• More specific content = better cards</li>
                  <li>• Use "Definitions" for vocabulary</li>
                  <li>• Longer docs may take more time</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Studio;