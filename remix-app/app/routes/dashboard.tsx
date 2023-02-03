import { Outlet } from "@remix-run/react";
import React from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserId(request);
  return json(null);
};

export default function Dashboard() {
  return <Outlet />;
}
