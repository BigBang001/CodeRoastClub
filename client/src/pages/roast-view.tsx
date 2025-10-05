import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Flame, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoastDetail {
  id: number;
  language: string;
  roastLines: string[];
  createdAt: string | Date;
  roastMode: string;
  persona: string;
}

export default function RoastView() {
  const [, params] = useRoute("/roast/:id");
  const roastId = params?.id;
  const { toast } = useToast();

  const { data, isLoading } = useQuery<RoastDetail>({
    queryKey: ["/api/roasts", roastId],
    queryFn: async () => {
      const res = await fetch(`/api/roasts/${roastId}`);
      if (!res.ok) throw new Error("Failed to load roast");
      return res.json();
    },
    enabled: Boolean(roastId),
  });

  const handleCopy = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(data.roastLines.join("\n\n"));
    toast({ title: "Copied!", description: "Roast copied to clipboard." });
  };

  const handleShare = async () => {
    if (!data) return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Code Roast", text: data.roastLines[0], url });
      } else {
        await navigator.clipboard.writeText(url);
        toast({ title: "Link copied", description: "Share URL copied to clipboard." });
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-github-dark text-text-light">
      <header className="border-b border-gray-800 bg-github-dark/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-roast-pink to-[#ff4757] rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">Roast #{roastId}</h1>
            </div>
            <Button onClick={() => (window.location.href = "/roasts")} variant="ghost" className="text-aqua-neon hover:text-cyan-400">
              All Roasts
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading || !data ? (
          <div className="flex items-center justify-center py-20 text-muted-gray">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading roast...
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
              <div className="text-sm text-muted-gray mb-4">
                {new Date(data.createdAt).toLocaleString()} • {data.language} • {data.roastMode}
              </div>
              {data.roastLines.map((line, i) => (
                <p key={i} className="text-lg leading-relaxed mb-4">“{line}”</p>
              ))}

              <div className="flex items-center gap-2">
                <Button onClick={handleCopy} variant="secondary" className="bg-gray-700 border-gray-600">
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
                <Button onClick={handleShare} className="bg-roast-pink hover:bg-[#ff4757]">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
