"use client";

import dynamic from "next/dynamic";
import { Code } from "lucide-react";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  code: string;
}

export function CodeEditor({ code }: CodeEditorProps) {
  if (!code) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No code generated yet</p>
          <p className="text-sm mt-2">
            Start by describing a component in the chat
          </p>
        </div>
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      value={code}
      theme="vs-dark"
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
      }}
    />
  );
}
