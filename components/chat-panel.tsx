"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";
import { ChatMessage } from "./chat-message";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatPanelProps {
  messages: Message[];
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export function ChatPanel({
  messages,
  input,
  loading,
  onInputChange,
  onSend,
}: ChatPanelProps) {
  return (
    <div className="w-full lg:w-1/3 border-r border-white/10 flex flex-col lg:h-screen h-[50vh] bg-[#020617] relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle 800px at 0% 0%, #1e293b, transparent)`,
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 px-6 py-4 border-b border-white/10 backdrop-blur-md bg-[#020617]/80">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Codely
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          AI-powered component generator
        </p>
      </div>

      <ScrollArea className="flex-1 relative z-10">
        <div className="p-4 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-sm font-medium text-white mb-1">
                Welcome to Codely
              </p>
              <p className="text-xs text-slate-400 max-w-50">
                Describe the component you want to create and I'll generate it
                for you
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {loading && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Loader2 className="h-3 w-3 animate-spin text-white" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-xs text-slate-300">
                  Generating your component...
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="relative z-10 p-4 border-t border-white/10 backdrop-blur-md bg-[#020617]/80">
        <div className="relative flex items-center gap-3 p-2 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-xl">
          <Input
            placeholder="Ask Codely to create a component..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
            disabled={loading}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-white placeholder:text-slate-500 h-10 px-4"
          />
          <Button
            onClick={onSend}
            disabled={loading || !input.trim()}
            size="lg"
            className="h-10 w-10 p-0 bg-white text-black hover:bg-slate-200 border-0 shadow-lg transition-all rounded-xl"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
