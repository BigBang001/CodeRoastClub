import { useState } from "react";
import { Github, Zap, Lock, Crown, ExternalLink, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import RoastOutput from "@/components/roast-output";
import { useRoastStore } from "@/hooks/use-roast";

export default function GitHubRoast() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setCurrentRoast } = useRoastStore.getState();

  const handleRoastRepo = async () => {
    if (!repoUrl.trim()) {
      toast({
        title: "Repository URL Required",
        description: "Please enter a GitHub repository URL to roast",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/github-roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl, roastMode: "mild", persona: "hrSafe" }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setCurrentRoast(data.roast);
      toast({ title: "Repository Roasted", description: "Check out the results below." });
      // scroll into view
      document.getElementById("gh-roast-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e: any) {
      toast({ title: "Roast Failed", description: e?.message || "Could not roast repository.", variant: "destructive" });
    } finally {
      setIsLoading(false);
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
                <Github className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">
                <span className="text-white">GitHub</span>
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
            Roast Entire <span className="text-roast-pink">GitHub Repositories</span>
          </h2>
          <p className="text-xl text-muted-gray mb-8">
            Let our AI analyze and roast entire codebases, not just snippets
          </p>
        </div>

        {/* Info Notice (non-Pro) */}
        <div className="bg-editor-bg rounded-xl p-6 border border-gray-600 mb-8">
          <h3 className="text-xl font-bold mb-2">About GitHub Roast</h3>
          <p className="text-gray-300">
            Paste a public GitHub repository URL and we’ll generate a quick roast based on detected patterns.
            This feature works without any API keys using a local analyzer.
          </p>
        </div>

        {/* GitHub URL Input */}
        <div className="bg-editor-bg rounded-xl p-8 border border-gray-600 mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Github className="w-6 h-6" />
            <span>Repository URL</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">GitHub Repository URL</label>
              <Input
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="w-full bg-gray-800 border-gray-600 text-white font-mono"
              />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-gray">
              <Lock className="w-4 h-4" />
              <span>We only analyze public repositories for security</span>
            </div>

            <Button
              onClick={handleRoastRepo}
              disabled={isLoading || !repoUrl.trim()}
              className="w-full bg-gradient-to-r from-roast-pink to-[#ff4757] hover:from-[#ff4757] hover:to-roast-pink text-white font-bold py-3"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Analyzing Repository...
                </>
              ) : (
                <>
                  <Github className="w-5 h-5 mr-2" />
                  Roast This Repository
                </>
              )}
            </Button>
          </div>
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-aqua-neon" />
              <span>What We Analyze</span>
            </h3>
            <ul className="space-y-2 text-muted-gray">
              <li>• Code structure and architecture</li>
              <li>• Naming conventions and patterns</li>
              <li>• Documentation quality</li>
              <li>• Test coverage and quality</li>
              <li>• Dependencies and package.json</li>
              <li>• README and project setup</li>
            </ul>
          </div>

          <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-roast-pink" />
              <span>What You Get</span>
            </h3>
            <ul className="space-y-2 text-muted-gray">
              <li>• Overall repository roast summary</li>
              <li>• File-by-file analysis and roasts</li>
              <li>• Architecture improvement suggestions</li>
              <li>• Funniest code snippets highlighted</li>
              <li>• Shareable roast report</li>
              <li>• Downloadable PDF summary</li>
            </ul>
          </div>
        </div>

        {/* Live Results */}
        <div id="gh-roast-results" className="bg-editor-bg rounded-xl p-8 border border-gray-600 mb-8">
          <h3 className="text-2xl font-bold mb-6">Roast Results</h3>
          <RoastOutput />
        </div>

        {/* Coming Soon Features */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Coming Soon</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-editor-bg rounded-lg p-4 border border-gray-600">
              <strong>Private Repo Support</strong>
              <p className="text-muted-gray mt-1">Securely analyze private repositories</p>
            </div>
            <div className="bg-editor-bg rounded-lg p-4 border border-gray-600">
              <strong>Team Comparisons</strong>
              <p className="text-muted-gray mt-1">Compare repos across your organization</p>
            </div>
            <div className="bg-editor-bg rounded-lg p-4 border border-gray-600">
              <strong>CI/CD Integration</strong>
              <p className="text-muted-gray mt-1">Automatic roasts on every commit</p>
            </div>
          </div>
        </div>

        {/* TODO: Implement GitHub API integration */}
        {/* TODO: Add authentication for private repos */}
        {/* TODO: Implement file analysis with OpenAI */}
        {/* TODO: Add PDF report generation */}
        {/* TODO: Add caching for analyzed repositories */}
      </main>
    </div>
  );
}