import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export interface ConversationPartner {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  lastMessage: string;
  lastTime: string;
  unread: number;
}

export const useConversations = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["conversations", user?.id],
    queryFn: async () => {
      if (!user) return [];
      // Get all messages involving current user
      const { data: msgs, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: false });
      if (error) throw error;

      // Group by partner
      const partnerMap = new Map<string, { lastMsg: typeof msgs[0]; unread: number }>();
      for (const msg of msgs || []) {
        const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
        if (!partnerMap.has(partnerId)) {
          partnerMap.set(partnerId, { lastMsg: msg, unread: 0 });
        }
        if (!msg.read && msg.receiver_id === user.id) {
          partnerMap.get(partnerId)!.unread++;
        }
      }

      // Fetch partner profiles
      const partnerIds = Array.from(partnerMap.keys());
      if (partnerIds.length === 0) return [];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url")
        .in("id", partnerIds);

      return partnerIds.map(pid => {
        const p = profiles?.find(pr => pr.id === pid);
        const entry = partnerMap.get(pid)!;
        return {
          id: pid,
          first_name: p?.first_name || "Utilisateur",
          last_name: p?.last_name || "",
          avatar_url: p?.avatar_url,
          lastMessage: entry.lastMsg.content,
          lastTime: entry.lastMsg.created_at || "",
          unread: entry.unread,
        } as ConversationPartner;
      });
    },
    enabled: !!user,
  });

  // Realtime subscription
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("messages-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => {
        qc.invalidateQueries({ queryKey: ["conversations"] });
        qc.invalidateQueries({ queryKey: ["chat-messages"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, qc]);

  return query;
};

export const useChatMessages = (partnerId: string | null) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["chat-messages", partnerId, user?.id],
    queryFn: async () => {
      if (!user || !partnerId) return [];
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user.id})`
        )
        .order("created_at", { ascending: true });
      if (error) throw error;

      // Mark unread messages as read
      const unreadIds = (data || []).filter(m => m.receiver_id === user.id && !m.read).map(m => m.id);
      if (unreadIds.length > 0) {
        await supabase.from("messages").update({ read: true }).in("id", unreadIds);
      }

      return data || [];
    },
    enabled: !!user && !!partnerId,
  });
};

export const useSendMessage = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ receiverId, content }: { receiverId: string; content: string }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("messages")
        .insert({ sender_id: user.id, receiver_id: receiverId, content })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["conversations"] });
      qc.invalidateQueries({ queryKey: ["chat-messages"] });
    },
  });
};
