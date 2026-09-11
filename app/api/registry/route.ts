import { NextResponse } from "next/server";
import { COMPONENT_REGISTRY } from "@/registry";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase();

  let items = Object.values(COMPONENT_REGISTRY);

  if (category && category !== "all") {
    items = items.filter((item) => item.category === category);
  }

  if (query) {
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  const catalog = items.map((item) => ({
    name: item.name,
    slug: item.slug,
    title: item.title,
    version: item.version,
    description: item.description,
    type: item.type,
    category: item.category,
    dependencies: item.dependencies || [],
    registryDependencies: item.registryDependencies || [],
  }));

  return NextResponse.json(
    {
      total: catalog.length,
      components: catalog,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
