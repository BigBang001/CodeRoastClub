import { useQuery } from "@tanstack/react-query";
import { Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublicRoastItem {
  id: number;
  language: string;
  roastLines: string[];
  createdAt: string | Date;
  roastMode: string;
}

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    javascript: "from-yellow-500 to-orange-500",
    python: "from-blue-500 to-cyan-500",
    java: "from-red-500 to-orange-500",
    cpp: "from-blue-600 to-purple-600",
    go: "from-cyan-500 to-blue-500",
    rust: "from-orange-600 to-red-600",
    typescript: "from-blue-500 to-blue-600",
    php: "from-purple-500 to-indigo-500",
  };
  return colors[language.toLowerCase()] || "from-gray-500 to-gray-600";
};

const getLanguageAbbr = (language: string) => {
  const abbrs: Record<string, string> = {
    javascript: "JS",
    python: "PY",
    java: "JV",
    cpp: "C++",
    go: "GO",
    rust: "RS",
    typescript: "TS",
    php: "PHP",
  };
  return abbrs[language.toLowerCase()] || language.slice(0, 2).toUpperCase();
};

export default function PublicRoastWall() {
  const { data: publicRoasts } = useQuery<PublicRoastItem[]>({
    queryKey: ["/api/roasts/public"],
  });

  const formatTimeAgo = (date: string | Date) => {
    const now = new Date();
    const roastDate = new Date(date);
    const diffMs = now.getTime() - roastDate.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Latest Community Roasts</h3>
        <Button variant="ghost" className="text-aqua-neon hover:text-cyan-400 font-medium" onClick={() => (window.location.href = "/roasts")}> 
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {publicRoasts && publicRoasts.length > 0 ? (
          publicRoasts.slice(0, 4).map((roast) => (
            <div
              key={roast.id}
              className="bg-editor-bg rounded-xl p-6 border border-gray-600 hover:border-gray-500 transition-all duration-200"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-br ${getLanguageColor(roast.language)} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">
                    {getLanguageAbbr(roast.language)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-gray mb-2">
                    {formatTimeAgo(roast.createdAt)} • {roast.language}
                  </p>
                  <p className="text-text-light leading-relaxed">
                    "{roast.roastLines[0]}"
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-xs text-muted-gray hover:text-roast-pink p-0 h-auto"
                    >
                      <Heart className="w-3 h-3" />
                      <span>{Math.floor(Math.random() * 50) + 5}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-xs text-muted-gray hover:text-aqua-neon p-0 h-auto"
                    >
                      <Share className="w-3 h-3" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-500">No public roasts yet. Be the first to get roasted!</p>
          </div>
        )}
      </div>
    </div>
  );
}
