"use client";

import { Card } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <span className="text-xs font-medium">{isUser ? "Y" : "C"}</span>
      </div>

      <div className={`flex-1 ${isUser ? "flex justify-end" : ""}`}>
        <div
          className={`rounded-lg px-4 py-2.5 max-w-[85%] ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 text-foreground border border-border/40"
          }`}
        >
          <div className="text-[13px] leading-relaxed">
            {message.role === "assistant" && message.content.length > 200
              ? "✓ Code generated successfully! Check the preview panel"
              : message.content}
          </div>
        </div>
      </div>
    </div>
  );
}
