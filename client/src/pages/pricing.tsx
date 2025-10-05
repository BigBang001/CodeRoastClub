import { Check, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Roast Level</h2>
          <p className="text-xl text-muted-gray">Get unlimited burns or stay with the free tier</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-editor-bg rounded-xl p-8 border border-gray-600">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Free Tier</h3>
              <div className="text-4xl font-bold mb-4">$0<span className="text-lg text-muted-gray">/month</span></div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>10 roasts per day</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>All roast modes (Mild, Brutal, Dad Joke)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>All roast personas</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>GitHub repository roasting</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Image code roasting (OCR)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Public roast wall access</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Copy & share roasts</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-600 hover:bg-gray-500"
            >
              Get Started Free
            </Button>
          </div>

          {/* Pro Tier */}
          <div className="bg-editor-bg rounded-xl p-8 border-2 border-roast-pink relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-roast-pink text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center space-x-2">
                <Crown className="w-6 h-6 text-roast-pink" />
                <span>Pro</span>
              </h3>
              <div className="text-4xl font-bold mb-4">$10<span className="text-lg text-muted-gray">/month</span></div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-roast-pink" />
                <span className="font-semibold">Unlimited roasts</span>
              </li>
              {/* GitHub & Image OCR are available in Free; Pro focuses on limits & extras */}
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-roast-pink" />
                <span className="font-semibold">Custom roast personas</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-roast-pink" />
                <span className="font-semibold">Roast history & favorites</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-roast-pink" />
                <span className="font-semibold">Personal code coach</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-roast-pink" />
                <span className="font-semibold">Priority support</span>
              </li>
            </ul>
            
            <Button 
              className="w-full bg-gradient-to-r from-roast-pink to-[#ff4757] hover:from-[#ff4757] hover:to-roast-pink text-white font-bold"
              onClick={() => {
                // TODO: Integrate with Stripe when STRIPE_SECRET_KEY and VITE_STRIPE_PUBLIC_KEY are available
                alert('Stripe integration will be enabled when API keys are configured!');
              }}
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-muted-gray">Yes! Cancel your Pro subscription at any time. You'll keep Pro features until the end of your billing period.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-muted-gray">We accept all major credit cards through Stripe. PayPal support coming soon!</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-muted-gray">The free tier is your trial! Upgrade to Pro when you're ready for unlimited roasts.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I get a refund?</h4>
              <p className="text-muted-gray">We offer a 7-day money-back guarantee if you're not satisfied with Pro features.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}