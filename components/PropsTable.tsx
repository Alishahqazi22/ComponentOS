import * as React from "react";
import { ComponentProp } from "@/lib/types";

interface PropsTableProps {
  propsList: ComponentProp[];
}

export function PropsTable({ propsList }: PropsTableProps) {
  if (!propsList || propsList.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">No custom props required for this primitive.</p>
    );
  }

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden bg-card text-xs">
      <table className="w-full text-left">
        <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
          <tr>
            <th className="p-3">Prop Name</th>
            <th className="p-3">TypeScript Type</th>
            <th className="p-3">Default</th>
            <th className="p-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {propsList.map((prop) => (
            <tr key={prop.name} className="hover:bg-muted/20 transition-colors">
              <td className="p-3 font-mono font-bold text-primary">
                {prop.name}
                {prop.required && <span className="text-destructive ml-0.5">*</span>}
              </td>
              <td className="p-3 font-mono text-xs text-secondary-foreground max-w-xs break-words bg-muted/40 rounded">
                {prop.type}
              </td>
              <td className="p-3 font-mono text-muted-foreground">
                {prop.defaultValue || "—"}
              </td>
              <td className="p-3 text-muted-foreground leading-relaxed">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
