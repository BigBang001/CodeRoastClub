import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Loader2 } from "lucide-react";

interface PublicRoastItem {
  id: number;
  language: string;
  roastLines: string[];
  createdAt: string | Date;
  roastMode: string;
}

export default function RoastFeed() {
  const { data, isLoading, refetch } = useQuery<PublicRoastItem[]>({
    queryKey: ["/api/roasts/public?limit=50"],
  });

  useEffect(() => {
    // Optionally auto-refresh
    const t = setInterval(() => refetch(), 30000);
    return () => clearInterval(t);
  }, [refetch]);

  return (
    <div className="min-h-screen bg-github-dark text-text-light">
      <header className="border-b border-gray-800 bg-github-dark/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-roast-pink to-[#ff4757] rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">Community Roasts</h1>
            </div>
            <Button onClick={() => (window.location.href = "/")} variant="ghost" className="text-aqua-neon hover:text-cyan-400">
              Back to App
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-muted-gray">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading roasts...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {data?.map((r) => (
              <a key={r.id} href={`/roast/${r.id}`} className="block bg-editor-bg rounded-xl p-6 border border-gray-600 hover:border-roast-pink/50 transition">
                <div className="text-sm text-muted-gray mb-2">
                  {new Date(r.createdAt).toLocaleString()} • {r.language}
                </div>
                <div className="text-text-light">"{r.roastLines[0]}"</div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
