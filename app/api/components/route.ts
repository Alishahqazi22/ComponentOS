import { NextResponse } from "next/server";
import { COMPONENT_REGISTRY } from "@/registry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let items = Object.values(COMPONENT_REGISTRY);

  if (category && category !== "all") {
    items = items.filter((item) => item.category === category);
  }

  return NextResponse.json({
    total: items.length,
    components: items,
  });
}
