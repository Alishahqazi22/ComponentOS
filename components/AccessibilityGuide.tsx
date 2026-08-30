import * as React from "react";
import { AccessibilityInfo } from "@/lib/types";
import { ShieldCheck, Keyboard, Eye, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AccessibilityGuideProps {
  info: AccessibilityInfo;
}

export function AccessibilityGuide({ info }: AccessibilityGuideProps) {
  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <h3 className="font-semibold text-base">WCAG 2.2 AA Accessibility Compliance</h3>
        </div>
        <Badge variant="success">Audited & Verified</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-2">
          <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
            <Keyboard className="h-4 w-4 text-cyan-500" />
            <span>Keyboard Traversal & Focus Management</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {info.keyboard}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-2">
          <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
            <Eye className="h-4 w-4 text-amber-500" />
            <span>Screen Reader & ARIA Roles</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {info.screenReader}
          </p>
        </div>
      </div>

      {info.ariaRoles && info.ariaRoles.length > 0 && (
        <div className="flex items-center gap-2 text-xs pt-2">
          <span className="text-muted-foreground font-semibold">ARIA Roles:</span>
          {info.ariaRoles.map((role) => (
            <Badge key={role} variant="outline" className="font-mono text-[10px]">
              role=&quot;{role}&quot;
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
