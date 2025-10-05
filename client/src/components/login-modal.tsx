import { useState } from "react";
import { useUserStore } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Flame, Smile } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login, register, loading, error: authError } = useUserStore();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    const u = username.trim();
    if (u.length < 2 || password.length < 4) {
      setError("Username (2+) and password (4+) required");
      return;
    }
    const ok = mode === "signin" ? await login(u, password) : await register(u, password);
    if (ok) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-gray-700 bg-gradient-to-br from-[#0d1117] to-[#121826]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-roast-pink/20">
              <Flame className="w-4 h-4 text-roast-pink" />
            </span>
            {mode === "signin" ? "Sign in" : "Create an account"}
          </DialogTitle>
          <DialogDescription className="text-muted-gray">
            Sessions are stored securely. You can log out anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2 text-xs">
            <button className={`px-2 py-1 rounded ${mode==='signin'?'bg-roast-pink text-white':'bg-gray-800'}`} onClick={() => setMode('signin')}>Sign in</button>
            <button className={`px-2 py-1 rounded ${mode==='register'?'bg-roast-pink text-white':'bg-gray-800'}`} onClick={() => setMode('register')}>Register</button>
          </div>
          <label className="text-sm">Username</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. bug_smasher"
            className="bg-editor-bg border-gray-600"
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
          <label className="text-sm">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-editor-bg border-gray-600"
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
          {(error || authError) && <p className="text-sm text-red-400">{error || authError}</p>}
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-gray flex items-center gap-1">
              <Smile className="w-4 h-4" />
              New here? Switch to Register.
            </div>
            <Button disabled={loading} onClick={submit} className="bg-roast-pink hover:bg-[#ff4757]">{mode==='signin'?'Sign in':'Create account'}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
