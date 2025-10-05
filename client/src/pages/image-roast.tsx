import { useState, useRef } from "react";
import { Upload, Camera, Zap, Crown, FileImage, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { extractTextFromImage, type OcrProgress } from "@/lib/ocr";
import { useRoast } from "@/hooks/use-roast";
import RoastOutput from "@/components/roast-output";

export default function ImageRoast() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState<OcrProgress | null>(null);
  const [extractedCode, setExtractedCode] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { mutate: generateRoast, isPending } = useRoast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const detectLanguage = (text: string): string => {
    const samples = text.slice(0, 1000);
    const score: Record<string, number> = {
      javascript: 0,
      typescript: 0,
      python: 0,
      java: 0,
      cpp: 0,
      php: 0,
      go: 0,
      rust: 0,
    };
    const bump = (k: keyof typeof score, n = 1) => (score[k] += n);
    // crude heuristics
    if (/\bconsole\./.test(samples)) bump("javascript", 2);
    if (/\bimport\s+type\b|:\s*\w+\b|interface\b/.test(samples)) bump("typescript", 2);
    if (/\bdef\s+\w+\(|:\n\s+/.test(samples)) bump("python", 2);
    if (/\bpublic\s+(class|static|void|int)\b/.test(samples)) bump("java", 2);
    if (/#include\b|std::/.test(samples)) bump("cpp", 2);
    if (/function\s+\w+\(|\$\w+\s*=/.test(samples)) bump("php", 2);
    if (/\bpackage\s+main\b|fmt\./.test(samples)) bump("go", 2);
    if (/fn\s+\w+\(|let\s+mut\b/.test(samples)) bump("rust", 2);
    // fallbacks for braces/semicolons favoring JS/TS/C-like
    if (/[{};]\s*\n/.test(samples)) bump("javascript");
    const best = Object.entries(score).sort((a, b) => b[1] - a[1])[0];
    return (best?.[0] as string) || "javascript";
  };

  const handleRoastImage = async () => {
    if (!selectedFile) {
      toast({
        title: "No Image Selected",
        description: "Please select an image containing code to roast",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setOcrProgress({ status: "initializing", progress: 0 });
    try {
      const text = await extractTextFromImage(selectedFile, (p) => setOcrProgress(p));
      setExtractedCode(text);
      if (!text || text.trim().length < 5) {
        toast({ title: "No code found", description: "OCR couldn't find readable code in the image.", variant: "destructive" });
        setIsLoading(false);
        setOcrProgress(null);
        return;
      }
      const language = detectLanguage(text);
      generateRoast({
        code: text.slice(0, 10000),
        language,
        roastMode: "brutal",
        persona: "linus",
      });
      // Scroll to results after a short delay to ensure render
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
      toast({ title: "Extracted!", description: `Detected ${language.toUpperCase()} code. Roasting now...` });
    } catch (e: any) {
      toast({ title: "OCR Failed", description: e?.message || "Unable to extract text from image.", variant: "destructive" });
    } finally {
      setIsLoading(false);
      setOcrProgress(null);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-github-dark text-text-light">
      {/* Header */}
      <header className="border-b border-gray-800 bg-github-dark/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-roast-pink to-[#ff4757] rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">
                <span className="text-white">Image</span>
                <span className="text-roast-pink">Roast</span>
              </h1>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="ghost" 
              className="text-aqua-neon hover:text-cyan-400"
            >
              Back to App
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Roast Code from <span className="text-roast-pink">Screenshots</span>
          </h2>
          <p className="text-xl text-muted-gray mb-8">
            Upload screenshots of code and let our AI extract and roast it with OCR magic
          </p>
        </div>

        {/* Info Notice */}
        <div className="bg-gradient-to-r from-roast-pink/10 to-aqua-neon/10 border border-roast-pink/30 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <FileImage className="w-6 h-6 text-roast-pink" />
            <h3 className="text-xl font-bold text-roast-pink">Image Roast</h3>
          </div>
          <p className="text-gray-300">
            Extract code from screenshots with built-in OCR, then roast it like any other snippet. No subscription required.
          </p>
        </div>

        {/* Image Upload Area */}
        <div className="bg-editor-bg rounded-xl p-8 border border-gray-600 mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <FileImage className="w-6 h-6" />
            <span>Upload Code Screenshot</span>
          </h3>
          
          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center hover:border-roast-pink/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-muted-gray mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Drop your code screenshot here</h4>
              <p className="text-muted-gray mb-4">
                or click to browse your files
              </p>
              <p className="text-sm text-muted-gray">
                Supports PNG, JPG, GIF up to 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Code screenshot preview"
                  className="max-w-full h-auto rounded-lg border border-gray-600 mx-auto"
                  style={{ maxHeight: '400px' }}
                />
                <Button
                  onClick={clearImage}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* File Info */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{selectedFile.name}</h4>
                    <p className="text-sm text-muted-gray">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                    </p>
                  </div>
                  <FileImage className="w-8 h-8 text-aqua-neon" />
                </div>
              </div>

              {/* Extracted preview */}
              {extractedCode && (
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 font-mono text-sm overflow-auto max-h-48">
                  <pre className="whitespace-pre-wrap">{extractedCode.slice(0, 800)}{extractedCode.length > 800 ? "\n..." : ""}</pre>
                </div>
              )}

              {/* Roast Button */}
              <Button
                onClick={handleRoastImage}
                disabled={isLoading || isPending}
                className="w-full bg-gradient-to-r from-roast-pink to-[#ff4757] hover:from-[#ff4757] hover:to-roast-pink text-white font-bold py-3"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    {ocrProgress ? `OCR: ${Math.round((ocrProgress.progress || 0) * 100)}%` : "Extracting & Roasting Code..."}
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5 mr-2" />
                    Extract & Roast Code
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

  {/* How It Works */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Camera className="w-5 h-5 text-aqua-neon" />
              <span>OCR Technology</span>
            </h3>
            <ul className="space-y-2 text-muted-gray">
              <li>• Advanced text recognition from images</li>
              <li>• Supports multiple programming languages</li>
              <li>• Handles syntax highlighting and formatting</li>
              <li>• Works with screenshots from any editor</li>
              <li>• Preserves code structure and indentation</li>
              <li>• High accuracy even with low-quality images</li>
            </ul>
          </div>

          <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-roast-pink" />
              <span>What You Get</span>
            </h3>
            <ul className="space-y-2 text-muted-gray">
              <li>• Extracted code with proper formatting</li>
              <li>• AI-powered roast of the detected code</li>
              <li>• Language detection and analysis</li>
              <li>• Constructive feedback and suggestions</li>
              <li>• Side-by-side image and roast view</li>
              <li>• Shareable roast results</li>
            </ul>
          </div>
        </div>

        {/* Roast Results */}
        <div ref={resultsRef} className="max-w-4xl mx-auto">
          <div className="bg-editor-bg rounded-xl p-8 border border-gray-600">
            <h3 className="text-2xl font-bold mb-6">Roast Results</h3>
            <RoastOutput />
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-editor-bg rounded-xl p-8 border border-gray-600 mb-8">
          <h3 className="text-2xl font-bold mb-6">Perfect For</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-roast-pink/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                📱
              </div>
              <h4 className="font-bold mb-2">Social Media Code</h4>
              <p className="text-sm text-muted-gray">
                Roast code snippets from Twitter, Reddit, or Discord screenshots
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-aqua-neon/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                📖
              </div>
              <h4 className="font-bold mb-2">Tutorial Screenshots</h4>
              <p className="text-sm text-muted-gray">
                Analyze and critique code examples from tutorials and courses
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                💻
              </div>
              <h4 className="font-bold mb-2">Legacy Code Photos</h4>
              <p className="text-sm text-muted-gray">
                Digitize and roast old code from books or printed materials
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Coming Soon</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-editor-bg rounded-lg p-4 border border-gray-600">
              <strong>Batch Processing</strong>
              <p className="text-muted-gray mt-1">Upload multiple images at once</p>
            </div>
            <div className="bg-editor-bg rounded-lg p-4 border border-gray-600">
              <strong>PDF Support</strong>
              <p className="text-muted-gray mt-1">Extract code from PDF documents</p>
            </div>
            <div className="bg-editor-bg rounded-lg p-4 border border-gray-600">
              <strong>Video Frames</strong>
              <p className="text-muted-gray mt-1">Extract code from video tutorials</p>
            </div>
          </div>
        </div>

        {/* TODO: Implement OCR service integration (Google Vision API, Tesseract.js, etc.) */}
        {/* TODO: Add image preprocessing for better OCR accuracy */}
        {/* TODO: Implement code language detection from extracted text */}
        {/* TODO: Add support for multiple image formats */}
        {/* TODO: Add image cropping tools for better targeting */}
      </main>
    </div>
  );
}