"use client";

import * as React from "react";
import { Folder, FolderOpen, FileCode, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TreeNode {
  id: string;
  name: string;
  isFolder?: boolean;
  children?: TreeNode[];
}

export function TreeView({ data }: { data?: TreeNode[] }) {
  const treeData: TreeNode[] = data || [
    {
      id: "1",
      name: "components",
      isFolder: true,
      children: [
        {
          id: "2",
          name: "ui",
          isFolder: true,
          children: [
            { id: "3", name: "button.tsx" },
            { id: "4", name: "card.tsx" },
            { id: "5", name: "data-table.tsx" },
          ],
        },
        { id: "6", name: "Navbar.tsx" },
      ],
    },
    { id: "7", name: "package.json" },
  ];

  function RenderNode({ node }: { node: TreeNode }) {
    const [isOpen, setIsOpen] = React.useState(true);

    if (node.isFolder) {
      return (
        <div className="space-y-1">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs hover:bg-accent/60 cursor-pointer font-medium select-none"
          >
            {isOpen ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
            {isOpen ? <FolderOpen className="h-4 w-4 text-amber-500" /> : <Folder className="h-4 w-4 text-amber-500" />}
            <span>{node.name}</span>
          </div>
          {isOpen && node.children && (
            <div className="pl-4 border-l border-border/40 ml-3 space-y-1">
              {node.children.map((child) => (
                <RenderNode key={child.id} node={child} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-accent/40 text-muted-foreground hover:text-foreground cursor-pointer">
        <FileCode className="h-3.5 w-3.5 text-cyan-500" />
        <span>{node.name}</span>
      </div>
    );
  }

  return (
    <div className="w-full p-3 rounded-xl border border-border bg-card space-y-1">
      {treeData.map((node) => (
        <RenderNode key={node.id} node={node} />
      ))}
    </div>
  );
}
