"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Eye, Copy, Check } from "lucide-react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";
import { FileTree, type FileItem } from "./file-tree";

interface CodePreviewPanelProps {
  files: FileItem[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
  code: string;
  copied: boolean;
  onCopy: () => void;
  onCodeChange?: (value: string | undefined) => void;
}

export function CodePreviewPanel({
  files,
  activeFileId,
  onFileSelect,
  code,
  copied,
  onCopy,
  onCodeChange,
}: CodePreviewPanelProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#020617] relative">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle 800px at 100% 0%, #1e293b, transparent)`,
          opacity: 0.2,
        }}
      />

      <Tabs defaultValue="code" className="flex-1 flex flex-col relative z-10">
        <div className="border-b border-white/10 px-4 flex items-center justify-between bg-[#020617]/80 backdrop-blur-md h-14">
          <TabsList className="bg-white/5 border border-white/10 p-1 h-9">
            <TabsTrigger
              value="code"
              className="flex items-center gap-2 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-slate-400"
            >
              <Code className="h-3.5 w-3.5" />
              Code
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex items-center gap-2 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-slate-400"
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </TabsTrigger>
          </TabsList>
          {code && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopy}
              className="text-slate-400 hover:text-white hover:bg-white/5 h-8"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          )}
        </div>

        <TabsContent
          value="code"
          className="flex-1 m-0 data-[state=active]:flex overflow-hidden"
        >
          <FileTree
            files={files}
            activeFileId={activeFileId}
            onFileSelect={onFileSelect}
          />
          <div className="flex-1 overflow-hidden bg-[#1e1e1e]">
            <CodeEditor code={code} onChange={onCodeChange} />
          </div>
        </TabsContent>

        <TabsContent
          value="preview"
          className="flex-1 m-0 min-h-125 data-[state=active]:flex overflow-hidden bg-white/5"
        >
          <LivePreview code={code} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
