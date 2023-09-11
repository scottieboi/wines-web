import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";

import { requireUserId } from "~/utils/session.server";
import { db } from "~/utils/db.server";
import DashboardTable, { WineRow } from "~/components/DashboardTable";
import { json } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);

  const wines = (
    await db.winelist.findMany({
      where: {
        userid: userId,
      },
      select: {
        winename: true,
        vintage: true,
        vineyard: { select: { vineyard: true } },
        winetype: { select: { winetype: true } },
        region: { select: { region: true } },
      },
    })
  ).map((w) => ({
    wineName: w.winename ?? "",
    vintage: w.vintage ?? 0,
    vineyard: w.vineyard?.vineyard ?? "",
    wineType: w.winetype?.winetype ?? "",
    region: w.region?.region ?? "",
  }));

  return json(wines);
};

export default function DashboardRoute() {
  const wines = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto">
      <h2 className="my-4 text-2xl">Dashboard</h2>
      <DashboardTable data={wines} pageCount={10} />
      <Link className="btn-primary btn" to="add-wine">
        + Add wine
      </Link>
    </div>
  );
}
