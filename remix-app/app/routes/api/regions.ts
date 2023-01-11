import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (query) {
    const regions = await db.region.findMany({
      where: {
        region: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        region: true,
      },
    });

    return json(regions);
  }

  return json([]);
};
