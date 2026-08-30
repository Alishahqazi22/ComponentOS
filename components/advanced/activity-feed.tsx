"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ActivityFeedItem {
  id: string;
  user: string;
  avatar?: string;
  action: string;
  target: string;
  time: string;
}

export function ActivityFeed() {
  const activities: ActivityFeedItem[] = [
    { id: "1", user: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1", action: "installed component", target: "data-table", time: "5 mins ago" },
    { id: "2", user: "Alex Rivera", avatar: "https://i.pravatar.cc/150?img=2", action: "published block", target: "ai-chat-interface", time: "22 mins ago" },
    { id: "3", user: "David Kim", avatar: "https://i.pravatar.cc/150?img=3", action: "updated CLI dependency", target: "framer-motion", time: "1 hour ago" },
  ];

  return (
    <div className="w-full space-y-3">
      {activities.map((act) => (
        <div key={act.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card text-xs">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              {act.avatar && <AvatarImage src={act.avatar} />}
              <AvatarFallback>{act.user.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-semibold">{act.user}</span>{" "}
              <span className="text-muted-foreground">{act.action}</span>{" "}
              <Badge variant="secondary" className="font-mono text-[10px]">{act.target}</Badge>
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">{act.time}</span>
        </div>
      ))}
    </div>
  );
}
