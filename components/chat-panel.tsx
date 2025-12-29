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
    <div className="w-full lg:w-1/3 border-r border-border/40 flex flex-col lg:h-screen h-[50vh] bg-background">
      <div className="px-6 py-4 border-b border-border/40 backdrop-blur-sm bg-background/95">
        <h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Codely
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          AI-powered component generator
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                Welcome to Codely
              </p>
              <p className="text-xs text-muted-foreground max-w-[200px]">
                Describe the component you want to create and I'll generate it
                for you
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {loading && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 backdrop-blur-sm">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-xs text-muted-foreground">
                  Generating your component...
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/40 backdrop-blur-sm bg-background/95">
        <div className="flex gap-2">
          <Input
            placeholder="Describe your component..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
            disabled={loading}
            className="flex-1 bg-muted/50 border-border/40 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
          <Button
            onClick={onSend}
            disabled={loading || !input.trim()}
            size="icon"
            className="bg-primary hover:bg-primary/90 transition-all"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
