import { useRef, useState } from "react";
import { Copy, Camera, HelpCircle, Flame, Image as ImageIcon, QrCode, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRoastStore } from "@/hooks/use-roast";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { autoFix } from "@/lib/autofix";
import QRModal from "@/components/qr-modal";

export default function RoastOutput() {
  const { toast } = useToast();
  const { currentRoast, isLoading } = useRoastStore();
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set());
  const [showFix, setShowFix] = useState(false);
  const [fixResult, setFixResult] = useState<{ fixed: string; suggestions: any[] } | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [qrOpen, setQrOpen] = useState(false);

  const handleCopy = async () => {
    if (!currentRoast?.roastLines) return;
    
    const roastText = currentRoast.roastLines.join('\n\n');
    await navigator.clipboard.writeText(roastText);
    toast({
      title: "Copied!",
      description: "Roast copied to clipboard! 📋",
    });
  };

  const handleScreenshot = async () => {
    if (!currentRoast?.roastLines || !captureRef.current) return;
    try {
      const canvas = await html2canvas(captureRef.current, { backgroundColor: "#0d1117", scale: 2 });
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `code-roast-${currentRoast.id || "share"}.png`;
      a.click();
    } catch (error) {
      toast({ title: "Image export failed", description: "Could not render image.", variant: "destructive" });
    }
  };

  const handleGenerateQr = async () => {
    if (!currentRoast?.id) return;
    const url = `${window.location.origin}/roast/${currentRoast.id}`;
    const dataUrl = await QRCode.toDataURL(url);
    setQrDataUrl(dataUrl);
    setQrOpen(true);
  };

  const handleAutoFix = () => {
    // We need original code; for now, embed code in suggestions header if available
    // The server stores code in roasts; if not available on client, we’ll ask the user to paste code below
    const code = (window as any).__lastSubmittedCode || "";
    if (!code) {
      toast({ title: "Code required", description: "Paste your code again to auto-fix.", variant: "destructive" });
      setShowFix(true);
      return;
    }
    const res = autoFix(code, currentRoast?.language || "javascript");
    setFixResult(res);
    setShowFix(true);
  };

  const toggleExplanation = (index: number) => {
    const newExpanded = new Set(expandedExplanations);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedExplanations(newExpanded);
  };

  const getExplanationForRoast = (roastLine: string, mode: string, persona: string): string => {
    // Generate contextual explanations based on the roast content and settings
    if (roastLine.includes("var") || roastLine.includes("variable")) {
      return "This roast targets the use of 'var' keyword, which has function scope and can lead to hoisting issues. Modern JavaScript prefers 'let' and 'const' for block scope and better code clarity.";
    }
    if (roastLine.includes("loop") || roastLine.includes("for")) {
      return "This roast points out inefficient loop patterns. Consider using array methods like reduce(), map(), or forEach() for more readable and functional programming approaches.";
    }
    if (roastLine.includes("naming") || roastLine.includes("name")) {
      return "This roast highlights poor naming conventions. Good variable and function names should be descriptive, follow camelCase, and clearly indicate their purpose.";
    }
    if (roastLine.includes("performance") || roastLine.includes("slow")) {
      return "This roast identifies potential performance issues. The code could be optimized for better time or space complexity.";
    }
    
    // Default explanations based on persona and mode
    const modeContext = mode === "brutal" ? "harshly critiques" : mode === "mild" ? "gently suggests" : "humorously points out";
    const personaContext = persona === "linus" ? "like a kernel maintainer" : persona === "genZ" ? "using modern slang" : persona === "boomer" ? "with old-school wisdom" : "professionally";
    
    return `This roast ${modeContext} a code improvement ${personaContext}. The AI identified patterns that could be refactored for better maintainability, readability, or performance.`;
  };

  const getBrutalityLevel = (mode: string): number => {
    switch (mode) {
      case "brutal": return 3;
      case "mild": return 1;
      default: return 2;
    }
  };

  return (
    <div className="space-y-6">
      {/* Output Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Your Roast Results</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!currentRoast?.roastLines}
            title="Copy roast"
          >
            <Copy className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleScreenshot}
            disabled={!currentRoast?.roastLines}
            title="Generate screenshot"
          >
            <ImageIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGenerateQr}
            disabled={!currentRoast?.roastLines}
            title="Generate QR"
          >
            <QrCode className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAutoFix}
            disabled={!currentRoast?.roastLines}
            title="Auto-fix code"
          >
            <Wrench className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="roast-card rounded-xl p-6 animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Roast Cards */}
      {currentRoast?.roastLines && !isLoading && (
        <div ref={captureRef} className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-[#0d1117] to-[#121826] border border-gray-700">
          {/* Watermark / header */}
          <div className="flex items-center justify-between text-xs text-muted-gray">
            <span>Code Roast Club • {currentRoast.language} • {currentRoast.roastMode}</span>
            <span>#{currentRoast.id ?? "share"}</span>
          </div>
          {currentRoast.roastLines.map((roastLine: string, index: number) => (
            <div key={index} className="roast-card rounded-xl p-6 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-roast-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-text-light font-medium leading-relaxed">
                    "{roastLine}"
                  </p>
                  
                  {/* Explanation Toggle */}
                  {expandedExplanations.has(index) && (
                    <div className="mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-300">
                        {getExplanationForRoast(roastLine, currentRoast.roastMode, currentRoast.persona)}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExplanation(index)}
                      className="text-aqua-neon hover:text-cyan-400 text-sm font-medium p-0 h-auto"
                    >
                      <HelpCircle className="w-4 h-4 mr-1" />
                      {expandedExplanations.has(index) ? "Hide explanation" : "Explain this roast"}
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-gray">Brutality: </span>
                      <div className="flex space-x-1">
                        {Array.from({ length: 3 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < getBrutalityLevel(currentRoast.roastMode)
                                ? "bg-roast-pink"
                                : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* QR preview */}
          {qrDataUrl && (
            <div className="flex items-center justify-end pt-2">
              <img src={qrDataUrl} alt="QR to roast" className="w-16 h-16 opacity-80" />
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!currentRoast && !isLoading && (
        <div className="text-center py-12">
          <Flame className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No roasts yet</h3>
          <p className="text-gray-500">
            Paste your code and hit the roast button to get started!
          </p>
        </div>
      )}

      {/* Auto-fix Panel */}
      {showFix && (
        <div className="bg-editor-bg rounded-xl p-6 border border-gray-600 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Auto-fix Suggestions</h4>
            <Button variant="ghost" size="sm" onClick={() => setShowFix(false)}>Close</Button>
          </div>
          {!fixResult ? (
            <div className="text-sm text-muted-gray">Paste your code in the editor and run a roast to enable auto-fix.</div>
          ) : (
            <>
              <div className="text-sm text-muted-gray">Applied {fixResult.suggestions.length} changes.</div>
              <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
                <div className="bg-gray-800/50 p-3 rounded border border-gray-700 overflow-auto">
                  <div className="text-xs text-muted-gray mb-2">Fixed Code</div>
                  <pre>{fixResult.fixed}</pre>
                </div>
                <div className="bg-gray-800/50 p-3 rounded border border-gray-700 overflow-auto">
                  <div className="text-xs text-muted-gray mb-2">Changes</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {fixResult.suggestions.map((s, i) => (
                      <li key={i}>{s.description}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={async () => { await navigator.clipboard.writeText(fixResult.fixed); toast({ title: "Copied", description: "Fixed code copied." }); }}>Copy Fixed</Button>
                <Button variant="outline" onClick={() => {
                  const evt = new CustomEvent("apply-fixed-code", { detail: { code: fixResult.fixed } });
                  window.dispatchEvent(evt);
                  toast({ title: "Applied to editor", description: "Fixed code inserted." });
                }}>Apply to Editor</Button>
              </div>
            </>
          )}
        </div>
      )}
      <QRModal open={qrOpen} onOpenChange={setQrOpen} dataUrl={qrDataUrl} />
    </div>
  );
}
