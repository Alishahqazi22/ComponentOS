import { NextResponse } from "next/server";
import { COMPONENT_REGISTRY } from "@/registry";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  let rawSlug = params?.slug?.toLowerCase() || "";
  // Strip .json suffix if present (e.g. /api/registry/button.json)
  if (rawSlug.endsWith(".json")) {
    rawSlug = rawSlug.slice(0, -5);
  }

  if (!rawSlug) {
    return NextResponse.json(
      { error: "Missing component slug parameter." },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  const item = COMPONENT_REGISTRY[rawSlug];

  if (!item) {
    return NextResponse.json(
      {
        error: `Component "${rawSlug}" was not found in ComponentOS registry.`,
        availableCategories: [
          "micro",
          "forms",
          "navigation",
          "feedback",
          "data-display",
          "cards",
          "advanced",
          "animated",
          "blocks",
          "templates",
        ],
      },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // Return standardized, production payload for CLI and Web consumption
  return NextResponse.json(
    {
      name: item.name,
      slug: item.slug,
      title: item.title,
      version: item.version,
      description: item.description,
      type: item.type,
      category: item.category,
      dependencies: item.dependencies || [],
      peerDependencies: item.peerDependencies || [],
      registryDependencies: item.registryDependencies || [],
      files: item.files || [],
      props: item.props || [],
      variants: item.variants || [],
      accessibility: item.accessibility || {},
      usageExample: item.usageExample || "",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
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
