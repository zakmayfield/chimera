import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import acme from "~/images/acme.png";

import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";

import { getUser } from "./utils/session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";

import { Link } from "@remix-run/react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {/* Universal Navbar */}
        <div className="flex gap-2.5 py-3 px-4 sm:py-0">
          {/* logo container */}
          <div className="w-full border-2">
            <img className="w-4/12 border-2" src={acme} alt="lion head logo" />
          </div>

          {/* auth container */}
          {data.user && (
            <div className="hidden w-full text-sm sm:flex sm:items-center sm:justify-end">
              <p>Hello, {data.user.name}</p>
            </div>
          )}

          {/* cta container */}
          <div className="flex items-center justify-end text-3xl">
            <Link to="/saved" className="mr-5">
              <AiOutlineHeart />
            </Link>

            <div>
              <AiOutlineMenu />
            </div>
          </div>
        </div>
        {/* Universal Navbar End */}

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
