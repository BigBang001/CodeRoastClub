import { useEffect, useState } from "react";
import { Shuffle, Zap, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRoast } from "@/hooks/use-roast";
import { usePersonaStore } from "@/components/persona-selector";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "typescript", label: "TypeScript" },
  { value: "php", label: "PHP" },
];

const roastModes = [
  { value: "mild", label: "Mild", emoji: "🧂" },
  { value: "brutal", label: "Brutal", emoji: "🔥" },
  { value: "dadJoke", label: "Dad Joke", emoji: "😆" },
];

interface CodeEditorProps {
  onRoastSuccess: () => void;
}

export default function CodeEditor({ onRoastSuccess }: CodeEditorProps) {
  const [code, setCode] = useState(`// Paste your code here and prepare for the roast...
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`);
  const [language, setLanguage] = useState("javascript");
  const [roastMode, setRoastMode] = useState("mild");
  const { selectedPersona, setSelectedPersona } = usePersonaStore();

  const { mutate: generateRoast, isPending } = useRoast({
    onSuccess: onRoastSuccess,
  });

  const personas = [
    { id: "linus", name: "Linus Mode" },
    { id: "hrSafe", name: "HR-Safe Dev" },
    { id: "genZ", name: "Gen Z Intern" },
    { id: "boomer", name: "Boomercoder" },
  ];

  const handleSurpriseMe = () => {
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    const randomMode = roastModes[Math.floor(Math.random() * roastModes.length)];
    const randomPersona = personas[Math.floor(Math.random() * personas.length)];
    
    setLanguage(randomLanguage.value);
    setRoastMode(randomMode.value);
    setSelectedPersona(randomPersona.id);
  };

  const isRoastSeed = (text: string): boolean => {
    // Detect if this looks like a "roast seed" (non-code text)
    const codePatterns = [
      /function\s+\w+\s*\(/,
      /class\s+\w+/,
      /import\s+.*from/,
      /def\s+\w+\s*\(/,
      /public\s+.*\s+\w+\s*\(/,
      /\w+\s*=\s*\w+/,
      /if\s*\(/,
      /for\s*\(/,
      /while\s*\(/,
      /\{|\}|;|\(\)|\.|\w+\(/
    ];
    
    const hasCodePatterns = codePatterns.some(pattern => pattern.test(text));
    const isShortPhrase = text.length < 100 && !text.includes('\n');
    const isLifePhrase = /life|decision|startup|career|relationship|job|dream|goal/i.test(text);
    
    return !hasCodePatterns && (isShortPhrase || isLifePhrase);
  };

  const handleRoast = () => {
    if (!code.trim()) {
      return;
    }

    // Easter egg: treat non-code as "roast seed"
    const finalLanguage = isRoastSeed(code.trim()) ? "life_decisions" : language;

    generateRoast({
      code: code.trim(),
      language: finalLanguage,
      roastMode: roastMode as "mild" | "brutal" | "dadJoke",
      persona: selectedPersona as "linus" | "hrSafe" | "genZ" | "boomer",
    });
  };

  // Apply-fixed-code integration
  useEffect(() => {
    const handler = (e: any) => {
      if (e?.detail?.code) setCode(e.detail.code);
    };
    window.addEventListener("apply-fixed-code", handler as EventListener);
    return () => window.removeEventListener("apply-fixed-code", handler as EventListener);
  }, []);

  return (
    <div className="space-y-6">
      {/* Language & Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Language</label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full bg-editor-bg border-gray-600 font-mono text-sm focus:ring-2 focus:ring-roast-pink">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleSurpriseMe}
            variant="outline"
            className="bg-aqua-neon hover:bg-cyan-400 text-gray-900 border-aqua-neon"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Surprise Me
          </Button>
        </div>
      </div>

      {/* Roast Mode Selector */}
      <div>
        <label className="block text-sm font-medium mb-3">Roast Level</label>
        <div className="flex rounded-xl border border-gray-600 bg-editor-bg p-1">
          {roastModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => setRoastMode(mode.value)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                roastMode === mode.value
                  ? "bg-roast-pink text-white"
                  : "hover:bg-gray-700 text-muted-gray"
              }`}
            >
              <span className="text-lg">{mode.emoji}</span>
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <div className="code-editor rounded-xl border border-gray-600 focus-within:ring-2 focus-within:ring-roast-pink focus-within:border-transparent transition-all duration-200">
          <div className="flex items-center justify-between p-3 border-b border-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-xs text-muted-gray font-mono flex items-center">
              <Terminal className="w-4 h-4 mr-1" />
              Ready for roasting
            </div>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-transparent border-0 font-mono text-sm resize-none focus:outline-none focus:ring-0 rounded-none"
            placeholder="// Paste your code here and prepare for the roast..."
          />
        </div>
      </div>

      {/* Roast Button */}
      <Button
        onClick={handleRoast}
        disabled={isPending || !code.trim()}
        className="w-full bg-gradient-to-r from-roast-pink to-[#ff4757] hover:from-[#ff4757] hover:to-roast-pink text-white py-4 h-auto text-lg font-bold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {isPending ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            Roasting...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 mr-2" />
            Roast My Code
          </>
        )}
      </Button>
    </div>
  );
}
