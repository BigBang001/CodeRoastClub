import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { RoastRequest } from "@shared/schema";

interface RoastResult {
  id: number;
  roastLines: string[];
  language: string;
  roastMode: string;
  persona: string;
}

interface RoastResponse {
  roast: RoastResult;
  remainingRoasts: number;
  isLimitReached: boolean;
}

interface RoastStore {
  currentRoast: RoastResult | null;
  isLoading: boolean;
  setCurrentRoast: (roast: RoastResult | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useRoastStore = create<RoastStore>((set) => ({
  currentRoast: null,
  isLoading: false,
  setCurrentRoast: (roast) => set({ currentRoast: roast }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

interface UseRoastOptions {
  onSuccess?: () => void;
}

export function useRoast({ onSuccess }: UseRoastOptions = {}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setCurrentRoast, setLoading } = useRoastStore();

  return useMutation({
    mutationFn: async (request: RoastRequest): Promise<RoastResponse> => {
      setLoading(true);
      setCurrentRoast(null);
      
      // cache code for auto-fix UX
      try {
        (window as any).__lastSubmittedCode = (request as any).code || "";
      } catch {}
      
      const response = await apiRequest("POST", "/api/roast", request);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentRoast(data.roast);
      setLoading(false);
      
      // Show success message with remaining roasts
      toast({
        title: "Roast Complete! 🔥",
        description: `${data.remainingRoasts} roasts remaining today`,
      });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["/api/usage"] });
      queryClient.invalidateQueries({ queryKey: ["/api/roasts/public"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      
      onSuccess?.();
    },
    onError: (error: any) => {
      setLoading(false);
      
      // Handle rate limiting
      if (error.message.includes("Daily roast limit reached")) {
        toast({
          title: "Daily Limit Reached!",
          description: "Upgrade to Pro for unlimited roasts! 🚀",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Roast Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    },
  });
}
