import * as React from "react";
import { LayoutDashboard, Layers, Settings, Users, ArrowUpRight, ShieldCheck, Download, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardTemplate() {
  return (
    <div className="flex h-full w-full bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-4 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black">
              C
            </div>
            <span>ComponentOS</span>
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground">
              <LayoutDashboard className="h-4 w-4" /> Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <Package className="h-4 w-4" /> Registry Items
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <Users className="h-4 w-4" /> Authors & Teams
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <Settings className="h-4 w-4" /> System Settings
            </a>
          </nav>
        </div>

        <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs">
          <p className="font-semibold">CLI Engine v1.2.0</p>
          <p className="text-muted-foreground mt-0.5">Registry Status: Operational</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Platform Overview</h1>
            <p className="text-sm text-muted-foreground">Monitor component registry metrics and CLI installations.</p>
          </div>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Components</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-emerald-500 flex items-center mt-1">
                +14 this month <ArrowUpRight className="h-3 w-3 ml-1" />
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">CLI Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48,290</div>
              <p className="text-xs text-emerald-500 flex items-center mt-1">
                +24.8% vs last week <ArrowUpRight className="h-3 w-3 ml-1" />
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Registry Uptime</CardTitle>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.99%</div>
              <p className="text-xs text-muted-foreground mt-1">Zero downtime recorded</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Authors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <Badge variant="secondary" className="mt-1 text-[10px]">Verified Core</Badge>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
