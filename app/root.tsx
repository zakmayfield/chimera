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
          <div className=" w-xs">
            <Link to="/">
              <img src={acme} alt="acme logo" />
            </Link>
          </div>

          <div className="flex w-full justify-end gap-2.5">
            {/* cta container */}
            <div className="flex items-center text-3xl ">
              <Link to="/saved" className="mr-5">
                <AiOutlineHeart />
              </Link>

              <div className="sm:border-r-2 pr-2.5" >
                <AiOutlineMenu />
              </div>
            </div>

            {/* auth container */}
            {data.user && (
              <div className="hidden sm:flex sm:items-center lg:ml-10">
                <p>
                  <Link
                    to={`dashboard/${data.user.id}`}
                    className="p-1 text-lg text-gray-700"
                  >
                    @{data.user.username ? data.user.username : data.user.name}{" "}
                    (v)
                  </Link>
                </p>
              </div>
            )}
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
