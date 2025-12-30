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
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
          isUser
            ? "bg-white text-black border-white"
            : "bg-white/5 text-white border-white/10"
        }`}
      >
        <span className="text-xs font-medium">{isUser ? "Y" : "C"}</span>
      </div>

      <div className={`flex-1 ${isUser ? "flex justify-end" : ""}`}>
        <div
          className={`rounded-2xl px-5 py-3 max-w-[85%] ${
            isUser
              ? "bg-white text-black"
              : "bg-white/5 text-slate-200 border border-white/10"
          }`}
        >
          <div className="text-sm leading-relaxed">
            {message.role === "assistant" && message.content.length > 200
              ? "✓ Code generated successfully! Check the preview panel"
              : message.content}
          </div>
        </div>
      </div>
    </div>
  );
}
