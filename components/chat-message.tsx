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
  return (
    <Card
      className={`p-4 ${
        message.role === "user"
          ? "bg-primary text-primary-foreground ml-8"
          : "bg-muted mr-8"
      }`}
    >
      <div className="text-xs font-semibold mb-2">
        {message.role === "user" ? "You" : "Codely"}
      </div>
      <div className="text-sm whitespace-pre-wrap">
        {message.role === "assistant" && message.content.length > 200
          ? "Code generated successfully! Check the preview panel →"
          : message.content}
      </div>
    </Card>
  );
}
