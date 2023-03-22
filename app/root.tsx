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
  // useLoaderData,
} from "@remix-run/react";

// import acme from "~/images/acme.png";
import {
  RiHomeLine,
  RiHeart3Line,
  RiLoginCircleLine,
  RiUser3Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { Link } from "@remix-run/react";

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
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

function Tooltip({ text, children }: { text: string; children: any }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="relative text-center">
      <div
        className={`absolute bottom-10 -left-8 rounded-md bg-black bg-opacity-80 px-5 py-1 py-1 text-sm text-white md:bottom-12 ${
          isActive ? "visible" : "invisible"
        }`}
      >
        <span className="tracking-wide">{text}</span>
      </div>

      <div
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        className="relative flex h-full items-center"
      >
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  const user = useOptionalUser();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Outlet />
        {/* <AnimatePresence mode='wait' initial={false}>
          <motion.main
            key={useLocation().pathname}
            initial={{ x: "-10%", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            exit={{ y: "-10%", opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {outlet}
          </motion.main>
        </AnimatePresence> */}

        <div className="absolute bottom-4 w-full text-center">
          <div
            className={`relative inline-grid ${
              user ? "grid-cols-4" : "grid-cols-3"
            } gap-5 rounded-md bg-black bg-opacity-80 px-8 py-2 text-2xl text-white md:px-10 md:py-3 md:text-3xl`}
          >
            <Tooltip text="Home">
              <Link to="/">
                <RiHomeLine />
              </Link>
            </Tooltip>

            <Tooltip text="Saved">
              <Link to="/dashboard/saved">
                <RiHeart3Line />
              </Link>
            </Tooltip>

            {!user && (
              <Tooltip text="Login">
                <Link to="/login">
                  <RiLoginCircleLine />
                </Link>
              </Tooltip>
            )}

            {user && (
              <Tooltip text="Dashboard">
                <Link to="/dashboard">
                  <RiUser3Line />
                </Link>
              </Tooltip>
            )}

            {/* for development i will add a logout button in the nav for ease of use, i dont think i want the log out button on the nav */}
            {user && (
              <Tooltip text="Logout">
                <Form
                  action="/logout"
                  method="post"
                  className="m-0 flex items-center p-0"
                >
                  <button type="submit" className="m-0 bg-transparent p-0">
                    <RiLogoutCircleRLine />
                  </button>
                </Form>
              </Tooltip>
            )}
          </div>
        </div>
        {/* <div className="absolute bottom-4 w-full text-center">
          <div
            className={`relative inline-grid ${
              user ? "grid-cols-4" : "grid-cols-3"
            } gap-5 rounded-md bg-black bg-opacity-80 px-8 py-2 text-2xl text-white md:px-10 md:py-3 md:text-3xl`}
          >
            <Tooltip text="Home">
              <Link to="/">
                <RiHomeLine />
              </Link>
            </Tooltip>

            <Tooltip text="Saved">
              <Link to="/dashboard/saved">
                <RiHeart3Line />
              </Link>
            </Tooltip>
            {user && (
              <Tooltip text="Logout">
                <Form
                  action="/logout"
                  method="post"
                  className="m-0 flex items-center p-0"
                >
                  <button type="submit" className="m-0 bg-transparent p-0">
                    <RiLogoutCircleRLine />
                  </button>
                </Form>
              </Tooltip>
            )}
            {user ? (
              <Tooltip text="Dashboard">
                <Link to="/dashboard">
                  <RiUser3Line />
                </Link>
              </Tooltip>
            ) : (
              <Tooltip text="Login">
                <Link to="/login">
                  <RiLoginCircleLine />
                </Link>
              </Tooltip>
            )}
          </div>
        </div> */}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
