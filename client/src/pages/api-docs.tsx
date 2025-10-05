import { Code, Key, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApiDocs() {
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
                <span className="text-muted-gray ml-2">API</span>
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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Code Roast Club API</h2>
          <p className="text-xl text-muted-gray">Integrate AI-powered code roasting into your applications</p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-aqua-neon/10 border border-aqua-neon/30 rounded-xl p-6 mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <Key className="w-6 h-6 text-aqua-neon" />
            <h3 className="text-xl font-bold text-aqua-neon">API Coming Soon!</h3>
          </div>
          <p className="text-gray-300">
            We're working on a developer-friendly API that will let you integrate our roasting capabilities 
            into your own applications. Get notified when it launches!
          </p>
          <Button className="mt-4 bg-aqua-neon hover:bg-cyan-400 text-gray-900">
            Join API Waitlist
          </Button>
        </div>

        {/* Planned API Endpoints */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Code className="w-5 h-5 text-roast-pink" />
              <span>Planned Endpoints</span>
            </h3>
            <div className="space-y-4">
              <div>
                <code className="text-aqua-neon font-mono text-sm">POST /api/v1/roast</code>
                <p className="text-sm text-muted-gray mt-1">Generate AI roasts for code snippets</p>
              </div>
              <div>
                <code className="text-aqua-neon font-mono text-sm">POST /api/v1/roast/github</code>
                <p className="text-sm text-muted-gray mt-1">Roast entire GitHub repositories</p>
              </div>
              <div>
                <code className="text-aqua-neon font-mono text-sm">POST /api/v1/roast/image</code>
                <p className="text-sm text-muted-gray mt-1">OCR + roast code from images</p>
              </div>
              <div>
                <code className="text-aqua-neon font-mono text-sm">GET /api/v1/roasts/public</code>
                <p className="text-sm text-muted-gray mt-1">Access public roast feed</p>
              </div>
            </div>
          </div>

          <div className="bg-editor-bg rounded-xl p-6 border border-gray-600">
            <h3 className="text-xl font-bold mb-4">Planned Features</h3>
            <ul className="space-y-2 text-muted-gray">
              <li>• RESTful API with JSON responses</li>
              <li>• Rate limiting and usage analytics</li>
              <li>• Webhook support for async processing</li>
              <li>• Multiple programming language support</li>
              <li>• Custom roast persona configuration</li>
              <li>• Batch processing for large codebases</li>
            </ul>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-editor-bg rounded-xl p-6 border border-gray-600 mb-12">
          <h3 className="text-xl font-bold mb-4">Example Usage (Coming Soon)</h3>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
{`// Example API call (future implementation)
curl -X POST https://api.coderoastclub.com/v1/roast \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "code": "function add(a, b) { return a + b; }",
    "language": "javascript",
    "mode": "brutal",
    "persona": "linus"
  }'

// Response
{
  "roasts": [
    "This function is so basic, it makes Hello World look sophisticated...",
    "You wrote a function that does what the + operator already does..."
  ],
  "metadata": {
    "language": "javascript",
    "mode": "brutal",
    "persona": "linus"
  }
}`}
            </pre>
          </div>
        </div>

        {/* SDK Notice */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">SDKs & Libraries</h3>
          <p className="text-muted-gray mb-6">
            We'll provide official SDKs for popular programming languages once the API launches.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-muted-gray">
            <span>• JavaScript/Node.js</span>
            <span>• Python</span>
            <span>• Go</span>
            <span>• PHP</span>
            <span>• More coming soon</span>
          </div>
        </div>

        {/* TODO: When API is ready, replace with actual documentation */}
        {/* TODO: Add authentication docs when API keys system is implemented */}
        {/* TODO: Add rate limiting information */}
        {/* TODO: Add code examples for different languages */}
      </main>
    </div>
  );
}