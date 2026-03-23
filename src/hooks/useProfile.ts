import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { TablesUpdate } from "@/integrations/supabase/types";

export const useProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useUpdateProfile = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (updates: TablesUpdate<"profiles">) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
};

export const useWalkerProfile = (userId?: string) => {
  return useQuery({
    queryKey: ["walker_profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase.from("walker_profiles").select("*").eq("user_id", userId).single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: !!userId,
  });
};
