import { useQuery } from "@tanstack/react-query";
import { Code, TrendingUp, Flame } from "lucide-react";

interface StatsResponse {
  totalRoasts: number;
  topLanguage: string;
  averageBrutality: string; // e.g., "2.1/3"
}

export default function StatsSection() {
  const { data: stats } = useQuery<StatsResponse>({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-roast-pink/20 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-roast-pink" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats?.totalRoasts || 0}</p>
            <p className="text-sm text-muted-gray">Total Code Roasts</p>
          </div>
        </div>
      </div>
      
      <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-aqua-neon/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-aqua-neon" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats?.topLanguage || "JavaScript"}</p>
            <p className="text-sm text-muted-gray">Most Roasted Today</p>
          </div>
        </div>
      </div>
      
      <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats?.averageBrutality || "0/3"}</p>
            <p className="text-sm text-muted-gray">Avg Brutality Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
