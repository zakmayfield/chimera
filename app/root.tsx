import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  // useLoaderData,
} from "@remix-run/react";

// import acme from "~/images/acme.png";
import { AiOutlineHome, AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import { Link } from "@remix-run/react";

import { getUser } from "./utils/session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";

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
  // const data = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Outlet />

        <div className="absolute bottom-4 w-full text-center">
          <div className="inline-grid grid-cols-3 gap-5 rounded-md bg-black bg-opacity-80 px-4 py-3 text-white text-2xl md:text-4xl">
            <Link to="/">
              <AiOutlineHome />
            </Link>
            <Link to="/saved">
              <AiOutlineHeart />
            </Link>
            <Link to="/contact">
              <AiOutlineMail />
            </Link>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
