import type { LoaderFunction } from "@remix-run/node";
import { getUser, requireUserId } from "~/utils/session.server";
import { Link, useLoaderData } from "@remix-run/react";

type LoaderData = {
  user?: { id: string; username: string };
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  let user = await getUser(request);
  let data: LoaderData = { user: user ?? undefined };
  return data;
};

export default function DashboardRoute() {
  let data = useLoaderData<LoaderData>();

  return (
    <div>
      {data.user ? (
        <div className="user-info">
          <span>{`Hi ${data.user.username}`}</span>
          <form action="/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <div>Hello Dashboard Route</div>
    </div>
  );
}
