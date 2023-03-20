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
// import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
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

        <div className="absolute bottom-4 w-full border-2 border-black text-center">
          <div className="inline-grid grid-cols-2 gap-2 rounded-md border-2 border-black px-2 py-3">
            <Link to="/">Home</Link>
            <Link to="/">About</Link>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
