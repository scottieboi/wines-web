import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (query) {
    const userId = await requireUserId(request);
    const vineyards = await db.vineyard.findMany({
      where: {
        OR: [{ userid: userId }, { userid: null }],
        AND: [
          {
            vineyard: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        vineyard: true,
        id: true,
      },
    });

    return json(
      vineyards.map(({ vineyard, ...x }) => ({
        ...x,
        name: vineyard,
      }))
    );
  }

  return json([]);
};
