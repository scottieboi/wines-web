import type { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function DashboardRoute() {
  return (
    <div className="container mx-auto">
      <div className="prose">
        <h2 className="my-4">Dashboard</h2>
      </div>
      <Link className="btn btn-primary" to="add-wine">
        + Add wine
      </Link>
    </div>
  );
}
