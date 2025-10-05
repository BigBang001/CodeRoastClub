import { Heart, Users, Zap, Target, Code, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            About <span className="text-roast-pink">Code Roast Club</span>
          </h2>
          <p className="text-xl text-muted-gray max-w-3xl mx-auto">
            We believe that the best code reviews come with a side of humor. 
            Our AI doesn't just find bugs—it roasts them with style.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-8 h-8 text-roast-pink" />
              <h3 className="text-3xl font-bold">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              To make code reviews fun, educational, and brutally honest. We're building a world 
              where developers can laugh at their mistakes while learning from them. Because 
              sometimes you need a good roast to cook up better code.
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-8 h-8 text-aqua-neon" />
              <h3 className="text-3xl font-bold">Why We Started</h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              Born from countless late-night debugging sessions and the realization that 
              code reviews don't have to be boring. We wanted to create something that 
              combines the precision of AI with the personality of your favorite sarcastic coworker.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">What Makes Us Different</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-editor-bg rounded-xl p-6 border border-gray-600 text-center">
              <div className="w-12 h-12 bg-roast-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Flame className="w-6 h-6 text-roast-pink" />
              </div>
              <h4 className="text-xl font-bold mb-3">AI-Powered Humor</h4>
              <p className="text-muted-gray">
                Our AI doesn't just analyze code—it roasts it with personality, 
                using different personas from Linus Torvalds to Gen Z interns.
              </p>
            </div>
            
            <div className="bg-editor-bg rounded-xl p-6 border border-gray-600 text-center">
              <div className="w-12 h-12 bg-aqua-neon/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-aqua-neon" />
              </div>
              <h4 className="text-xl font-bold mb-3">Educational Value</h4>
              <p className="text-muted-gray">
                Every roast comes with an explanation. Learn why your code 
                is being roasted and how to improve it.
              </p>
            </div>
            
            <div className="bg-editor-bg rounded-xl p-6 border border-gray-600 text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-yellow-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">Community Driven</h4>
              <p className="text-muted-gray">
                Share your roasts, learn from others, and participate in 
                our roast battles. Because coding is better together.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">The Team Behind the Roasts</h3>
          <div className="bg-editor-bg rounded-xl p-8 border border-gray-600 text-center">
            <p className="text-lg text-gray-300 mb-6">
              We're a small team of developers who've been on both sides of brutal code reviews. 
              We know the pain, we know the gain, and we know that a little humor makes everything better.
            </p>
            <p className="text-muted-gray">
              Built with ❤️ by developers, for developers, with just the right amount of sass.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-roast-pink mb-2">10K+</div>
            <div className="text-muted-gray">Code Roasts Generated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-aqua-neon mb-2">25+</div>
            <div className="text-muted-gray">Programming Languages</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">95%</div>
            <div className="text-muted-gray">Developer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">24/7</div>
            <div className="text-muted-gray">AI Roasting Available</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-roast-pink/10 to-aqua-neon/10 rounded-xl p-12 border border-roast-pink/20">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Roasted?</h3>
          <p className="text-lg text-muted-gray mb-8">
            Join thousands of developers who've discovered that code reviews can be fun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-roast-pink to-[#ff4757] hover:from-[#ff4757] hover:to-roast-pink text-white font-bold px-8 py-3"
            >
              Start Roasting Code
            </Button>
            <Button 
              onClick={() => window.location.href = '/pricing'}
              variant="outline" 
              className="border-aqua-neon text-aqua-neon hover:bg-aqua-neon hover:text-gray-900 px-8 py-3"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}