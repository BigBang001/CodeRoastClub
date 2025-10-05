import { useState } from "react";
import { useUserStore } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const { register, loading, error } = useUserStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const onSubmit = async () => {
    setLocalError(null);
    if (username.trim().length < 2 || password.length < 4) {
      setLocalError("Username (2+) and password (4+) required");
      return;
    }
    const ok = await register(username.trim(), password);
    if (ok) {
      toast({ title: `Welcome, ${username}!`, description: "Your roast crimes will be remembered." });
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen bg-github-dark text-text-light">
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
            <Button variant="ghost" className="text-aqua-neon" onClick={() => setLocation("/")}>Back</Button>
          </div>
        </div>
      </header>
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-[#1E222A] border-gray-700 text-gray-200 shadow-xl">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription className="text-gray-400">Save your roast history and settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm">Username</label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="your_handle" className="mt-1 bg-[#0E1117] border-gray-700" onKeyDown={(e) => e.key==='Enter' && onSubmit()} />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 bg-[#0E1117] border-gray-700" onKeyDown={(e) => e.key==='Enter' && onSubmit()} />
            </div>
            {(localError || error) && <div className="text-sm text-red-400">{localError || error}</div>}
            <Button disabled={loading} onClick={onSubmit} className="w-full bg-[#FF6B81] hover:bg-[#ff8ba0]">Create account</Button>
            <div className="text-xs text-gray-500 text-center">or</div>
            <Button variant="outline" onClick={() => setLocation("/login")} className="w-full border-gray-600">Sign in instead</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
