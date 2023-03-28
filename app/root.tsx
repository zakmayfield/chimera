import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
  // useLoaderData,
  // useLoaderData,
} from "@remix-run/react";

// import acme from "~/images/acme.png";
import {
  RiHomeLine,
  RiLoginCircleLine,
  RiUser3Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { MdPets } from "react-icons/md";

import { getUser } from "./utils/session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { useState } from "react";
import { useOptionalUser } from "./utils/utils";
// import { AnimatePresence, motion } from "framer-motion";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Chimera",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request, params }: LoaderArgs) {

  return json({
    user: await getUser(request),
  });
}

function Tooltip({ text, children }: { text: string; children: any }) {
  const [showToolTip, setShowTooltip] = useState(false);
  return (
    <div className="relative text-center">
      <div
        className={`absolute bottom-10 -left-8 rounded-md bg-black bg-opacity-80 px-5 py-1 py-1 text-sm text-white md:bottom-12 ${
          showToolTip ? "visible" : "invisible"
        }`}
      >
        <span className="tracking-wide">{text}</span>
      </div>

      <div
        onMouseEnter={() => {
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
        }}
        className={`relative flex h-full items-center`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  // const data = useLoaderData<typeof loader>();
  const user = useOptionalUser();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Outlet />

        <div className="absolute bottom-4 w-full text-center">
          <div
            className={`relative inline-grid ${
              user ? "grid-cols-4" : "grid-cols-3"
            } gap-5 rounded-md bg-black bg-opacity-80 px-8 py-2 text-2xl text-white md:px-10 md:py-3 md:text-3xl`}
          >
            <Tooltip text="Home">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-3xl text-white" : "text-gray-400"
                }
              >
                <RiHomeLine />
              </NavLink>
            </Tooltip>

            <Tooltip text="Pets">
              <NavLink
                to="/pets"
                className={({ isActive }) =>
                  isActive ? "text-3xl text-white" : "text-gray-400"
                }
              >
                <MdPets />
              </NavLink>
            </Tooltip>

            {/* <Tooltip text="Saved">
              <NavLink
                to="/dashboard/saved"
                className={({ isActive }) =>
                  isActive ? "text-3xl text-white" : "text-gray-400"
                }
              >
                <RiHeart3Line />
              </NavLink>
            </Tooltip> */}

            {!user && (
              <Tooltip text="Login">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-3xl text-white" : "text-gray-400"
                  }
                >
                  <RiLoginCircleLine />
                </NavLink>
              </Tooltip>
            )}

            {user && (
              <Tooltip text="Dashboard">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-3xl text-white" : "text-gray-400"
                  }
                >
                  <RiUser3Line />
                </NavLink>
              </Tooltip>
            )}

            {/* for development i will add a logout button in the nav for ease of use, i dont think i want the log out button on the nav */}
            {user && (
              <Tooltip text="Logout">
                <Form
                  action="/logout"
                  method="post"
                  className="m-0 flex items-center p-0 "
                >
                  <button
                    type="submit"
                    className="m-0 bg-transparent p-0 text-gray-400 "
                  >
                    <RiLogoutCircleRLine />
                  </button>
                </Form>
              </Tooltip>
            )}
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
