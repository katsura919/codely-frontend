"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";

interface CenteredChatProps {
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export function CenteredChat({
  input,
  loading,
  onInputChange,
  onSend,
}: CenteredChatProps) {
  return (
    <div className="min-h-screen w-full bg-[#020617] relative flex items-center justify-center overflow-hidden">
      {/* Dark Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)`,
        }}
      />

      <div className="relative max-w-3xl w-full px-6 space-y-8 animate-in fade-in duration-700 z-10">
        {/* Header */}
        <div className="text-center space-y-4">

          <h1 className="text-5xl font-bold tracking-tight text-white">
            Let's create something amazing
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Describe the component you want to build, and I'll generate it for
            you instantly.
          </p>
        </div>

        {/* Input Area */}
        <div className="relative">
          <div className="relative flex items-center gap-3 p-2 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl">
            <Input
              placeholder="Ask Codely to create a component..."
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
              disabled={loading}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg text-white placeholder:text-slate-500 h-14 px-4"
            />
            <Button
              onClick={onSend}
              disabled={loading || !input.trim()}
              size="lg"
              className="h-12 px-6 bg-gray text-white border-0 shadow-lg hover:bg-gray-500 cursor-pointer transition-all rounded-xl"
            >
              {loading ? (
                <Sparkles className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Try:{" "}
            <span className="text-slate-400">
              "Create a pricing card component"
            </span>{" "}
            or <span className="text-slate-400">"Build a contact form"</span>
          </p>
        </div>
      </div>
    </div>
  );
}
