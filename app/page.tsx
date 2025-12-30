"use client";

import { useState } from "react";
import axios from "axios";
import { ChatPanel } from "@/components/chat-panel";
import { CodePreviewPanel } from "@/components/code-preview-panel";
import { CenteredChat } from "@/components/centered-chat";
import type { FileItem } from "@/components/file-tree";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const activeFile = getActiveFile();
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined && activeFileId) {
      setFiles((prev) =>
        prev.map((file) =>
          file.id === activeFileId ? { ...file, content: value } : file
        )
      );
    }
  };

  const handleFileSelect = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const getActiveFile = () => {
    return files.find((f) => f.id === activeFileId) || null;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/generate", {
        message: input,
        conversationHistory: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.code,
        timestamp: response.data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Create new file from generated code
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: `Component${files.length + 1}.jsx`,
        content: response.data.code,
        timestamp: response.data.timestamp,
      };

      setFiles((prev) => [...prev, newFile]);
      setActiveFileId(newFile.id);
    } catch (error) {
      console.error("Error generating code:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, there was an error generating the code. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const hasStartedChat = messages.length > 0;

  if (!hasStartedChat) {
    return (
      <CenteredChat
        input={input}
        loading={loading}
        onInputChange={setInput}
        onSend={handleSend}
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#020617] dark animate-in slide-in-from-bottom duration-300">
      <ChatPanel
        messages={messages}
        input={input}
        loading={loading}
        onInputChange={setInput}
        onSend={handleSend}
      />
      <CodePreviewPanel
        files={files}
        activeFileId={activeFileId}
        onFileSelect={handleFileSelect}
        code={getActiveFile()?.content || ""}
        copied={copied}
        onCopy={handleCopy}
        onCodeChange={handleCodeChange}
      />
    </div>
  );
}
