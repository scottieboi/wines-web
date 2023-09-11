import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (query) {
    const userId = await requireUserId(request);
    const wineTypes = await db.winetype.findMany({
      where: {
        OR: [{ userid: userId }, { userid: null }],
        AND: [
          {
            winetype: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        winetype: true,
        id: true,
      },
    });

    return json(
      wineTypes.map(({ winetype, ...x }) => ({
        ...x,
        name: winetype,
      }))
    );
  }

  return json([]);
};
