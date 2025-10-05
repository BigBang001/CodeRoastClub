import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProUpgradeCTA() {
  return (
    <div className="roast-card rounded-xl p-6 border-2 border-roast-pink/30">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-roast-pink to-[#ff4757] rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <h4 className="text-xl font-bold text-roast-pink mb-2">🔥 Go Pro. Roast Without Limits.</h4>
        <p className="text-sm text-muted-gray mb-4">
          Unlock unlimited AI burns, custom roast personas like ElonGPT, GitHub repo roasting, and your personal code coach.
        </p>
        <Button className="bg-gradient-to-r from-roast-pink to-[#ff4757] hover:from-[#ff4757] hover:to-roast-pink text-white font-semibold transition-all duration-200 transform hover:scale-105">
          Upgrade to Pro
        </Button>
      </div>
    </div>
  );
}
