import {
  Link,
  Links,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import React from "react";

import styles from "./tailwind.css";
import type { LoaderFunction } from "@remix-run/node";
import { getUser } from "~/utils/session.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type LoaderData = {
  user?: { id: string; username: string };
};

export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  let data: LoaderData = { user: user ?? undefined };
  return data;
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Navbar({
  loggedIn,
  username,
}: {
  loggedIn: boolean;
  username?: string;
}) {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="dashboard" className="btn btn-ghost normal-case text-xl">
          Wines web
        </Link>
      </div>
      <div className="flex-none">
        {loggedIn && username && <span>{`Hi ${username}`}</span>}
        <ul className="menu menu-horizontal px-1">
          <li>
            {loggedIn ? (
              <>
                <form action="/logout" method="post">
                  <button type="submit" className="button">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  let data = useLoaderData<LoaderData>();

  return (
    <Document title="Wines web">
      <Navbar loggedIn={!!data.user} username={data.user?.username} />
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
