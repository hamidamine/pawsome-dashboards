import BottomNav from "@/components/dashboard/BottomNav";
import { motion } from "framer-motion";
import { Send, Paperclip, Phone, Video, ArrowLeft, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useConversations, useChatMessages, useSendMessage } from "@/hooks/useMessages";
import avatarWalker from "@/assets/avatar-walker.jpg";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const mockConversations = [
  { id: "demo-c1", first_name: "Lucas", last_name: "Martin", avatar_url: null, lastMessage: "Bonjour ! Max est prêt pour la balade ?", lastTime: new Date().toISOString(), unread: 2 },
  { id: "demo-c2", first_name: "Sophie", last_name: "Bernard", avatar_url: null, lastMessage: "Merci pour la balade d'aujourd'hui ! 🐾", lastTime: new Date(Date.now() - 3600000).toISOString(), unread: 0 },
  { id: "demo-c3", first_name: "Emma", last_name: "Petit", avatar_url: null, lastMessage: "À quelle heure demain ?", lastTime: new Date(Date.now() - 7200000).toISOString(), unread: 1 },
];

const Messages = ({ role }: { role: "owner" | "walker" }) => {
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: realConversations = [], isLoading: convsLoading } = useConversations();
  const { data: chatMessages = [] } = useChatMessages(activeConv && !activeConv.startsWith("demo") ? activeConv : null);
  const sendMessage = useSendMessage();

  const isDemo = !user;
  const conversations = isDemo ? mockConversations : realConversations;

  const handleSend = () => {
    if (!messageText.trim() || !activeConv) return;
    if (isDemo) {
      setMessageText("");
      return;
    }
    sendMessage.mutate({ receiverId: activeConv, content: messageText.trim() });
    setMessageText("");
  };

  const formatTime = (dateStr: string) => {
    try { return format(new Date(dateStr), "HH:mm", { locale: fr }); }
    catch { return ""; }
  };

  if (activeConv) {
    const conv = conversations.find(c => c.id === activeConv);
    const displayName = conv ? `${conv.first_name} ${conv.last_name || ""}`.trim() : "Chat";

    const demoMessages = isDemo ? [
      { id: "dm1", sender_id: "other", receiver_id: "me", content: "Bonjour ! Comment va Max aujourd'hui ?", created_at: new Date(Date.now() - 600000).toISOString(), read: true },
      { id: "dm2", sender_id: "me", receiver_id: "other", content: "Il est en pleine forme ! Prêt pour sa balade 🐕", created_at: new Date(Date.now() - 300000).toISOString(), read: true },
      { id: "dm3", sender_id: "other", receiver_id: "me", content: "Super, je serai là dans 10 minutes !", created_at: new Date().toISOString(), read: false },
    ] : [];

    const displayMessages = isDemo ? demoMessages : chatMessages;

    return (
      <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto flex flex-col">
        <div className="bg-card shadow-card px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setActiveConv(null)} className="text-primary font-bold text-sm">← Retour</button>
          <img src={conv?.avatar_url || avatarWalker} alt={displayName} className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
          <div className="flex-1">
            <span className="font-bold text-sm text-foreground">{displayName}</span>
          </div>
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary" />
          </button>
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <Video className="w-4 h-4 text-primary" />
          </button>
        </div>

        <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
          {displayMessages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-10">Aucun message. Commencez la conversation !</div>
          )}
          {displayMessages.map((msg, i) => {
            const isMine = isDemo ? msg.sender_id === "me" : msg.sender_id === user?.id;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl ${
                  isMine
                    ? "gradient-primary text-white rounded-br-md"
                    : "bg-card shadow-card text-foreground rounded-bl-md"
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-[9px] mt-1 ${isMine ? "text-white/60" : "text-muted-foreground"}`}>
                    {formatTime(msg.created_at || "")}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-card border-t border-border px-4 py-3 flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <Paperclip className="w-4 h-4 text-muted-foreground" />
          </button>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Écrire un message..."
            className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button onClick={handleSend} className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center shadow-glow-primary">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <BottomNav role={role} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-6 relative">
        <button onClick={() => navigate(`/${role}`)} className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-black text-white mt-2 text-center">💬 Messages</h1>
        <p className="text-white/70 text-sm mt-1 text-center">Discutez avec vos {role === "owner" ? "promeneurs" : "clients"}</p>
      </div>
      <div className="px-4 -mt-3 space-y-2">
        {!isDemo && convsLoading && <div className="text-center text-muted-foreground text-sm py-10">Chargement...</div>}
        {conversations.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground text-sm">Aucune conversation pour le moment</p>
          </div>
        )}
        {conversations.map((conv, i) => (
          <motion.button
            key={conv.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActiveConv(conv.id)}
            className="w-full bg-card rounded-2xl shadow-card p-3.5 flex items-center gap-3 text-left hover:shadow-card-hover transition-shadow"
          >
            <div className="relative">
              <img src={conv.avatar_url || avatarWalker} alt={conv.first_name || ""} className="w-12 h-12 rounded-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">{conv.first_name} {conv.last_name || ""}</span>
                <span className="text-[10px] text-muted-foreground font-semibold">{formatTime(conv.lastTime)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{conv.lastMessage}</p>
            </div>
            {conv.unread > 0 && (
              <span className="w-5 h-5 rounded-full gradient-cta text-white text-[10px] font-bold flex items-center justify-center">
                {conv.unread}
              </span>
            )}
          </motion.button>
        ))}
      </div>
      <BottomNav role={role} />
    </div>
  );
};

export default Messages;
