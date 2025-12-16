import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  FileText,
  Settings,
  Sparkles,
  Download,
  Trash2,
  RefreshCw,
  Brain,
  Target,
  Layers,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const Studio = () => {
  const [inputText, setInputText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardCount, setCardCount] = useState([20]);
  const [aiModel, setAiModel] = useState("gpt-4");
  const [focusArea, setFocusArea] = useState("balanced");
  const [generatedCards, setGeneratedCards] = useState<
    { front: string; back: string }[]
  >([]);

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

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (
        file.type === "application/pdf" ||
        file.type === "text/plain"
      ) {
        setUploadedFile(file);
        toast({
          title: "File uploaded",
          description: `${file.name} is ready for processing`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or TXT file",
          variant: "destructive",
        });
      }
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        setUploadedFile(files[0]);
        toast({
          title: "File uploaded",
          description: `${files[0].name} is ready for processing`,
        });
      }
    },
    []
  );

  const handleGenerate = async () => {
    if (!inputText && !uploadedFile) {
      toast({
        title: "No input provided",
        description: "Please paste text or upload a file first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate generation (replace with actual API call)
    setTimeout(() => {
      setGeneratedCards([
        {
          front: "What is the capital of France?",
          back: "Paris is the capital of France.",
        },
        {
          front: "What year did World War II end?",
          back: "1945",
        },
        {
          front: "What is photosynthesis?",
          back: "The process by which plants convert light energy into chemical energy.",
        },
        {
          front: "Who wrote Romeo and Juliet?",
          back: "William Shakespeare",
        },
        {
          front: "What is the chemical formula for water?",
          back: "H₂O",
        },
      ]);
      setIsGenerating(false);
      toast({
        title: "Cards generated!",
        description: `Successfully created ${cardCount[0]} flashcards`,
      });
    }, 2000);
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your Anki deck is being prepared for download",
    });
  };

  const clearAll = () => {
    setInputText("");
    setUploadedFile(null);
    setGeneratedCards([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">MeshCards Studio</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {generatedCards.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
              <Button
                variant="gradient"
                size="sm"
                onClick={handleExport}
                disabled={generatedCards.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export to Anki
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {/* Input Section - 60% */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Input</h2>
              </div>

              {/* File Upload Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "drop-zone p-8 mb-4 cursor-pointer transition-all duration-300",
                  isDragging && "dragging"
                )}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.txt"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="font-medium mb-1">
                      Drop your file here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF and TXT files
                    </p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">or paste text</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Text Input */}
              <Textarea
                placeholder="Paste your study material here..."
                className="min-h-[200px] bg-muted/30 border-border/50 resize-none focus:border-primary/50"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            {/* Generated Cards Preview */}
            {generatedCards.length > 0 && (
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold">
                      Generated Cards ({generatedCards.length})
                    </h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleGenerate}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {generatedCards.map((card, index) => (
                    <div
                      key={index}
                      className="bg-muted/30 rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm mb-2 group-hover:text-primary transition-colors">
                            {card.front}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {card.back}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Configuration Panel - 40% */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Configuration</h2>
              </div>

              <div className="space-y-6">
                {/* AI Model */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-muted-foreground" />
                    <label className="text-sm font-medium">AI Model</label>
                  </div>
                  <Select value={aiModel} onValueChange={setAiModel}>
                    <SelectTrigger className="bg-muted/30 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (Best Quality)</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5 (Faster)</SelectItem>
                      <SelectItem value="claude">Claude 3 (Creative)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Card Count */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-muted-foreground" />
                      <label className="text-sm font-medium">Card Count</label>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {cardCount[0]}
                    </span>
                  </div>
                  <Slider
                    value={cardCount}
                    onValueChange={setCardCount}
                    min={5}
                    max={50}
                    step={5}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Focus Area */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <label className="text-sm font-medium">Focus Area</label>
                  </div>
                  <Select value={focusArea} onValueChange={setFocusArea}>
                    <SelectTrigger className="bg-muted/30 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="definitions">Definitions & Terms</SelectItem>
                      <SelectItem value="concepts">Key Concepts</SelectItem>
                      <SelectItem value="facts">Facts & Dates</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button
                  variant="glow"
                  size="lg"
                  className="w-full mt-4"
                  onClick={handleGenerate}
                  disabled={isGenerating || (!inputText && !uploadedFile)}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Flashcards
                    </>
                  )}
                </Button>

                {/* Info Card */}
                <div className="bg-muted/20 rounded-xl p-4 border border-border/30">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Tip:</strong> For best results,
                    use well-structured content with clear headings and organized
                    information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Studio;
