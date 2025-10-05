import { Calendar, Zap, Plus, Bug, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Changelog() {
  const releases = [
    {
      version: "v1.0.0",
      date: "2024-01-15",
      type: "major",
      items: [
        { type: "feature", text: "🔥 Initial launch of Code Roast Club" },
        { type: "feature", text: "AI-powered code roasting with GPT-4o" },
        { type: "feature", text: "Four unique roast personas (Linus, HR-Safe, Gen Z, Boomer)" },
        { type: "feature", text: "Three roast intensity modes (Mild, Brutal, Dad Joke)" },
        { type: "feature", text: "Dark theme with GitHub-inspired design" },
        { type: "feature", text: "Public roast wall for community sharing" },
      ]
    },
    {
      version: "v1.1.0",
      date: "2024-01-10",
      type: "minor",
      items: [
        { type: "feature", text: "🎲 'Surprise Me' button for random roast configuration" },
        { type: "feature", text: "🧠 'Explain This Roast' feature with technical breakdowns" },
        { type: "feature", text: "🎭 Easter egg: Roast Seed mode for life decisions" },
        { type: "feature", text: "📸 Enhanced screenshot sharing functionality" },
        { type: "improvement", text: "Improved persona state management with Zustand" },
      ]
    },
    {
      version: "v1.2.0",
      date: "Coming Soon",
      type: "minor",
      items: [
  { type: "feature", text: "🔗 GitHub repository roasting" },
  { type: "feature", text: "📱 Image code roasting with OCR" },
        { type: "feature", text: "👥 User accounts and roast history" },
        { type: "feature", text: "🏆 Roast leaderboard and voting system" },
        { type: "feature", text: "⚔️ Roast battles between users" },
      ]
    },
    {
      version: "v2.0.0",
      date: "Coming Q2 2024",
      type: "major",
      items: [
        { type: "feature", text: "🔌 Public API for developers" },
        { type: "feature", text: "🎨 Custom roast persona creation" },
        { type: "feature", text: "🤖 AI Code Coach for constructive feedback" },
        { type: "feature", text: "🏢 Team/Enterprise features" },
        { type: "feature", text: "📊 Advanced analytics dashboard" },
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature": return <Plus className="w-4 h-4 text-green-500" />;
      case "improvement": return <Sparkles className="w-4 h-4 text-blue-500" />;
      case "fix": return <Bug className="w-4 h-4 text-red-500" />;
      default: return <Plus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getVersionBadge = (type: string) => {
    switch (type) {
      case "major": return "bg-roast-pink text-white";
      case "minor": return "bg-aqua-neon text-gray-900";
      default: return "bg-gray-600 text-white";
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
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">
                <span className="text-white">Code</span>
                <span className="text-roast-pink">Roast</span>
                <span className="text-aqua-neon">Club</span>
                <span className="text-muted-gray ml-2">Changelog</span>
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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What's New</h2>
          <p className="text-xl text-muted-gray">Track our journey to the ultimate code roasting experience</p>
        </div>

        <div className="space-y-12">
          {releases.map((release, index) => (
            <div key={release.version} className="relative">
              {/* Timeline line */}
              {index < releases.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-700"></div>
              )}
              
              <div className="flex items-start space-x-6">
                {/* Version badge */}
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getVersionBadge(release.type)} flex items-center space-x-2 min-w-fit`}>
                  <Calendar className="w-4 h-4" />
                  <span>{release.version}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{release.version}</h3>
                    <span className="text-muted-gray">{release.date}</span>
                  </div>
                  
                  <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
                    <ul className="space-y-3">
                      {release.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          {getTypeIcon(item.type)}
                          <span className="text-gray-300">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe to updates */}
        <div className="mt-16 text-center bg-editor-bg rounded-xl p-8 border border-gray-600">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-muted-gray mb-6">
            Get notified when we ship new features and improvements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-roast-pink"
            />
            <Button className="bg-roast-pink hover:bg-[#ff4757] text-white font-semibold">
              Subscribe
            </Button>
          </div>
        </div>

        {/* TODO: Connect to actual email subscription service when available */}
        {/* TODO: Add RSS feed for changelog updates */}
        {/* TODO: Integrate with GitHub releases API for automatic updates */}
      </main>
    </div>
  );
}