import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Zap, Crown, Info, Github, Camera, Menu, X, Download } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/code-editor";
import RoastOutput from "@/components/roast-output";
import PersonaSelector from "@/components/persona-selector";
import StatsSection from "@/components/stats-section";
import PublicRoastWall from "@/components/public-roast-wall";
// ProUpgradeCTA removed from home to avoid confusion about gating
import { useUserStore } from "@/hooks/use-user";

export default function Home() {
  const { toast } = useToast();
  const [showTerminalIntro, setShowTerminalIntro] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { username, isLoggedIn, logout, fetchMe } = useUserStore();
  const [pwaInstallAvailable, setPwaInstallAvailable] = useState(false);

  // Get usage data
  interface UsageResponse {
    roastCount: number;
    remainingRoasts: number;
    dailyLimit: number;
    isLimitReached: boolean;
  }

  const { data: usage, refetch: refetchUsage } = useQuery<UsageResponse>({
    queryKey: ["/api/usage"],
    refetchOnMount: true,
  });

  useEffect(() => {
    // Show terminal intro once per session
    const hasSeenIntro = sessionStorage.getItem("hasSeenTerminalIntro");
    if (!hasSeenIntro) {
      setShowTerminalIntro(true);
      sessionStorage.setItem("hasSeenTerminalIntro", "true");
      setTimeout(() => setShowTerminalIntro(false), 3000);
    }
  }, []);

  // initialize auth session
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);


  // Show usage warning at 80%
  useEffect(() => {
    if (usage && usage.roastCount >= Math.floor(usage.dailyLimit * 0.8) && !usage.isLimitReached) {
      toast({
        title: "Usage Warning",
        description: `You've used ${usage.roastCount}/${usage.dailyLimit} roasts today — Go Pro to unlock unlimited burns 🔥`,
        duration: 5000,
      });
    }
  }, [usage, toast]);

  const handleRoastSuccess = () => {
    refetchUsage();
  };

  return (
    <div className="min-h-screen bg-github-dark text-text-light">
      {/* Header */}
      <header className="border-b border-gray-800 bg-github-dark/95 backdrop-blur-sm sticky top-0 z-50">
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
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <Button 
                  variant="ghost" 
                  className="text-aqua-neon hover:text-cyan-400 hover:bg-aqua-neon/10"
                  onClick={() => window.location.href = '/github-roast'}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Roast
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-aqua-neon hover:text-cyan-400 hover:bg-aqua-neon/10"
                  onClick={() => window.location.href = '/image-roast'}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Image Roast
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-muted-gray hover:text-white"
                  onClick={() => window.location.href = '/pricing'}
                >
                  Pricing
                </Button>
              </nav>

              {usage && (
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-roast-pink rounded-full animate-pulse"></div>
                    <span className="text-muted-gray">
                      {usage.roastCount}/{usage.dailyLimit} roasts today
                    </span>
                  </div>
                </div>
              )}
              
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  onClick={() => window.location.href = '/pricing'}
                  className="bg-gradient-to-r from-roast-pink to-[#ff4757] hover:from-[#ff4757] hover:to-roast-pink text-white font-medium transition-all duration-200 transform hover:scale-105"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Go Pro
                </Button>
                {!isLoggedIn ? (
                  <>
                    <Button variant="outline" asChild className="border-gray-600">
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button variant="ghost" asChild className="text-muted-gray">
                      <Link href="/register">Create account</Link>
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-gray">{username}</div>
                    <Button variant="ghost" size="sm" onClick={logout} className="text-muted-gray hover:text-white">Logout</Button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-800 bg-github-dark">
            <div className="px-4 py-4 space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-aqua-neon hover:text-cyan-400 hover:bg-aqua-neon/10"
                onClick={() => {
                  window.location.href = '/github-roast';
                  setShowMobileMenu(false);
                }}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub Roast
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-aqua-neon hover:text-cyan-400 hover:bg-aqua-neon/10"
                onClick={() => {
                  window.location.href = '/image-roast';
                  setShowMobileMenu(false);
                }}
              >
                <Camera className="w-4 h-4 mr-2" />
                Image Roast
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-gray hover:text-white"
                onClick={() => {
                  window.location.href = '/pricing';
                  setShowMobileMenu(false);
                }}
              >
                Pricing
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-gray hover:text-white"
                onClick={() => {
                  window.location.href = '/about';
                  setShowMobileMenu(false);
                }}
              >
                About
              </Button>
              {!isLoggedIn ? (
                <>
                  <Button 
                    variant="outline" 
                    asChild
                    className="w-full justify-start border-gray-600"
                    onClick={() => {
                      setShowMobileMenu(false);
                    }}
                  >
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    asChild
                    className="w-full justify-start text-muted-gray hover:text-white"
                    onClick={() => {
                      setShowMobileMenu(false);
                    }}
                  >
                    <Link href="/register">Create account</Link>
                  </Button>
                </>
              ) : (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-gray hover:text-white"
                  onClick={() => {
                    logout();
                    setShowMobileMenu(false);
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </header>
  {/* Login modal removed in favor of dedicated pages */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {showTerminalIntro && (
            <div className="terminal-prompt text-aqua-neon font-mono text-sm mb-4 opacity-75">
              Initiating Roast Protocol...
            </div>
          )}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Get Your Code{" "}
            <span className="text-roast-pink animate-glow">Roasted</span>
          </h2>
          <p className="text-xl text-muted-gray mb-2">
            Paste your code, choose your pain level, and let our AI roast it
          </p>
          <p className="text-lg text-aqua-neon font-medium">
            like a sarcastic senior dev.{" "}
            <span className="text-muted-gray">No mercy. Just truth.</span>
          </p>
        </div>

        {/* Persona Selector */}
        <PersonaSelector />

        {/* Main Roast Interface */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <CodeEditor onRoastSuccess={handleRoastSuccess} />
          <RoastOutput />
        </div>

        {/* Usage limit warning */}
        {usage?.isLimitReached && (
          <div className="mb-8">
            {/* Support CTA or community link can go here in the future */}
          </div>
        )}

        {/* Stats Section */}
        <StatsSection />

        {/* Feature Showcase */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">More Ways to Get Roasted</h3>
            <p className="text-muted-gray">Explore extra roast modes like GitHub and Image OCR</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* GitHub Roast Feature (not Pro) */}
            <div className="bg-editor-bg rounded-xl p-8 border border-gray-600 hover:border-roast-pink/50 transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-roast-pink/20 group-hover:to-roast-pink/30 transition-all duration-300">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">GitHub Repository Roasting</h4>
                </div>
              </div>
              <p className="text-muted-gray mb-6">
                Let our AI analyze public GitHub repositories. Get quick roasts covering structure, naming, and docs.
              </p>
              <Button 
                onClick={() => window.location.href = '/github-roast'}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-roast-pink hover:to-[#ff4757] text-white transition-all duration-300"
              >
                <Github className="w-4 h-4 mr-2" />
                Try GitHub Roast
              </Button>
            </div>

            {/* Image Roast Feature */}
            <div className="bg-editor-bg rounded-xl p-8 border border-gray-600 hover:border-aqua-neon/50 transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-aqua-neon/20 group-hover:to-aqua-neon/30 transition-all duration-300">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Image Code Roasting</h4>
                  <div className="flex items-center space-x-2">
                  </div>
                </div>
              </div>
              <p className="text-muted-gray mb-6">
                Upload screenshots of code from social media, tutorials, or anywhere else. Our OCR technology 
                extracts the code and roasts it with the same brutal honesty as direct input.
              </p>
              <Button 
                onClick={() => window.location.href = '/image-roast'}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-aqua-neon hover:to-cyan-400 text-white transition-all duration-300"
              >
                <Camera className="w-4 h-4 mr-2" />
                Try Image Roast
              </Button>
            </div>
          </div>
        </div>

        {/* Public Roast Wall */}
        <PublicRoastWall />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-editor-bg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-roast-pink to-aqua-neon rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Code Roast Club</span>
              </div>
              <p className="text-muted-gray text-sm mb-4">
                The ultimate AI-powered code roasting platform. Get your code brutally honest feedback with a side of humor.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-gray">
                <li><a href="/pricing" className="hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="/api-docs" className="hover:text-white transition-colors duration-200">API</a></li>
                <li><a href="/changelog" className="hover:text-white transition-colors duration-200">Changelog</a></li>
                <li><a href="/github-roast" className="hover:text-white transition-colors duration-200">GitHub Roast</a></li>
                <li><a href="/image-roast" className="hover:text-white transition-colors duration-200">Image Roast</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-gray">
                <li><a href="/about" className="hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="https://twitter.com/coderoastclub" className="hover:text-white transition-colors duration-200">Twitter</a></li>
                <li><a href="mailto:hello@coderoastclub.com" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-gray">
              © 2025 Code Roast Club. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-sm text-muted-gray hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="text-sm text-muted-gray hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="text-sm text-muted-gray hover:text-white transition-colors duration-200">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
