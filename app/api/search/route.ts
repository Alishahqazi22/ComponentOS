import { NextResponse } from "next/server";
import { COMPONENT_REGISTRY } from "@/registry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  const items = Object.values(COMPONENT_REGISTRY);

  const results = items.filter(
    (item) =>
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.title.toLowerCase().includes(q.toLowerCase()) ||
      item.category.toLowerCase().includes(q.toLowerCase()) ||
      item.description.toLowerCase().includes(q.toLowerCase())
  );

  return NextResponse.json({ query: q, results });
}
