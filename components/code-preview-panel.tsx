"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Eye, Copy, Check } from "lucide-react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";

interface CodePreviewPanelProps {
  code: string;
  copied: boolean;
  onCopy: () => void;
}

export function CodePreviewPanel({
  code,
  copied,
  onCopy,
}: CodePreviewPanelProps) {
  return (
    <div className="flex-1 flex flex-col">
      <Tabs defaultValue="code" className="flex-1 flex flex-col">
        <div className="border-b px-4 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
          {code && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              className="mr-4"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          )}
        </div>

        <TabsContent value="code" className="flex-1 m-0">
          <CodeEditor code={code} />
        </TabsContent>

        <TabsContent value="preview" className="flex-1 m-0">
          <div className="h-full">
            <LivePreview code={code} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
