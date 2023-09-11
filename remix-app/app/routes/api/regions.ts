import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (query) {
    const userId = await requireUserId(request);
    const regions = await db.region.findMany({
      where: {
        OR: [{ userid: userId }, { userid: null }],
        AND: [
          {
            region: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        region: true,
        id: true,
      },
    });

    return json(
      regions.map(({ region, ...x }) => ({
        ...x,
        name: region,
      }))
    );
  }

  return json([]);
};
