import { NextResponse } from "next/server";
import { COMPONENT_REGISTRY } from "@/registry";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params?.slug?.toLowerCase();
  if (!slug) {
    return NextResponse.json({ error: "Missing component slug" }, { status: 400 });
  }

  const item = COMPONENT_REGISTRY[slug];

  if (!item) {
    return NextResponse.json(
      { error: `Component "${slug}" was not found in ComponentOS registry.` },
      { status: 404 }
    );
  }

  // Return optimized JSON payload for CLI consumption
  return NextResponse.json(
    {
      name: item.name,
      type: item.type,
      version: item.version,
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
      files: item.files,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
