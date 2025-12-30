"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { File, Folder } from "lucide-react";

export interface FileItem {
  id: string;
  name: string;
  content: string;
  timestamp: string;
}

interface FileTreeProps {
  files: FileItem[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
}

export function FileTree({ files, activeFileId, onFileSelect }: FileTreeProps) {
  if (files.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4 text-center border-r border-white/10 bg-[#020617]">
        <div className="text-slate-500">
          <Folder className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-xs">No files yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-48 border-r border-white/10 bg-[#020617] backdrop-blur-sm">
      <div className="px-3 py-2 border-b border-white/10">
        <p className="text-xs font-medium text-slate-400">Files</p>
      </div>
      <ScrollArea className="h-[calc(100%-40px)]">
        <div className="p-2 space-y-1">
          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => onFileSelect(file.id)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors ${
                activeFileId === file.id
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <File className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
