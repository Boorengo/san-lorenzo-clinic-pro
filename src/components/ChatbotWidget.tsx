import { useState } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

const seed = [
  { from: "bot", text: "Kumusta! Ako si BHC Assistant. Paano kita matutulungan ngayon?" },
];

const suggestions = [
  "Ano ang mga serbisyo?",
  "Paano mag-register?",
  "Schedule ng immunization",
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState(seed);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      { from: "user", text },
      { from: "bot", text: "Salamat sa iyong tanong! (Demo response — ito ay blueprint lamang.)" },
    ]);
    setInput("");
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full healthcare-gradient shadow-xl flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform"
        aria-label="Open chatbot"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-warning border-2 border-background" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-2xl border bg-card shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "min(560px, calc(100vh - 8rem))" }}
          >
            {/* Header */}
            <div className="healthcare-gradient px-4 py-3 flex items-center gap-3 text-primary-foreground">
              <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold">BHC Assistant</p>
                <p className="text-[10px] text-primary-foreground/80 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Online now
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                      m.from === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-card border rounded-bl-sm text-card-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {msgs.length <= 1 && (
                <div className="pt-2 space-y-2">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Suggested
                  </p>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-xs rounded-lg border bg-card px-3 py-2 hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t p-3 flex items-center gap-2 bg-card"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="h-9 text-sm"
              />
              <Button type="submit" size="sm" className="h-9 w-9 p-0 healthcare-gradient text-primary-foreground border-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
