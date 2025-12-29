"use client";

import {
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react";
import { Eye } from "lucide-react";

interface LivePreviewProps {
  code: string;
}

export function LivePreview({ code }: LivePreviewProps) {
  if (!code) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No preview available</p>
          <p className="text-sm mt-2">Generate some code first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <SandpackProvider
        template="react"
        theme="dark"
        files={{
          "/App.js": code,
        }}
        customSetup={{
          dependencies: {
            "lucide-react": "latest",
            clsx: "latest",
            "tailwind-merge": "latest",
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout style={{ height: "95vh", width: "100%" }}>
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={true}
            style={{ height: "100%", width: "100%" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
