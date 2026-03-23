import BottomNav from "@/components/dashboard/BottomNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { Send, Paperclip, Phone, Video } from "lucide-react";
import { useState } from "react";
import avatarWalker from "@/assets/avatar-walker.jpg";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
  type?: "text" | "system";
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const conversations: Conversation[] = [
  { id: "1", name: "Sarah M.", avatar: avatarWalker, lastMessage: "Max a été super aujourd'hui !", time: "14:32", unread: 2, online: true },
  { id: "2", name: "Lucas B.", avatar: avatarWalker, lastMessage: "Merci pour la balade 🐕", time: "Hier", unread: 0, online: false },
  { id: "3", name: "Emma D.", avatar: avatarWalker, lastMessage: "À demain pour la promenade", time: "Lun", unread: 0, online: true },
];

const Messages = ({ role }: { role: "owner" | "walker" }) => {
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  const messages: Message[] = [
    { id: "1", text: "Bonjour ! Je suis en route pour récupérer Max 🐕", sender: "other", time: "14:20" },
    { id: "s1", text: "Sarah M. est en route", sender: "other", time: "14:20", type: "system" },
    { id: "2", text: "Super, merci ! Il est tout excité 😄", sender: "me", time: "14:22" },
    { id: "3", text: "Max a été super aujourd'hui ! Voici les photos de la balade 📸", sender: "other", time: "14:32" },
  ];

  if (activeConv) {
    const conv = conversations.find(c => c.id === activeConv);
    return (
      <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto flex flex-col">
        {/* Chat header */}
        <div className="bg-card shadow-card px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setActiveConv(null)} className="text-primary font-bold text-sm">← Retour</button>
          <img src={conv?.avatar} alt={conv?.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
          <div className="flex-1">
            <span className="font-bold text-sm text-foreground">{conv?.name}</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[10px] text-accent font-semibold">En ligne</span>
            </div>
          </div>
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary" />
          </button>
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <Video className="w-4 h-4 text-primary" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={msg.type === "system" ? "text-center" : `flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              {msg.type === "system" ? (
                <span className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full font-semibold">{msg.text}</span>
              ) : (
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl ${
                  msg.sender === "me"
                    ? "gradient-primary text-white rounded-br-md"
                    : "bg-card shadow-card text-foreground rounded-bl-md"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[9px] mt-1 ${msg.sender === "me" ? "text-white/60" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-card border-t border-border px-4 py-3 flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <Paperclip className="w-4 h-4 text-muted-foreground" />
          </button>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Écrire un message..."
            className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center shadow-glow-primary">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <BottomNav role={role} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <div className="gradient-primary px-4 pt-14 pb-6">
        <DashboardHeader title="💬 Messages" notificationCount={2} />
        <h1 className="text-2xl font-black text-white mt-2">Messages</h1>
        <p className="text-white/70 text-sm mt-1">Discutez avec vos {role === "owner" ? "promeneurs" : "clients"}</p>
      </div>
      <div className="px-4 -mt-3 space-y-2">
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
              <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
              {conv.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full gradient-accent border-2 border-card" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">{conv.name}</span>
                <span className="text-[10px] text-muted-foreground font-semibold">{conv.time}</span>
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
