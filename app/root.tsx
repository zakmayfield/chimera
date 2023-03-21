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
  // useOutlet,
  // useLocation,
  // useLoaderData,
} from "@remix-run/react";

// import acme from "~/images/acme.png";
import {
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineMail,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link } from "@remix-run/react";

import { getUser } from "./utils/session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { useState } from "react";
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
        className={`absolute bottom-16 -left-5 w-20 rounded-md bg-black bg-opacity-80 py-1 text-sm text-white ${
          isActive ? "visible" : "invisible"
        }`}
      >
        <span className="tracking-wide">{text}</span>
      </div>

      <div
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        {children}
      </div>
    </div>
  );
}

export default function App() {
  // const data = useLoaderData<typeof loader>();
  // const outlet = useOutlet();

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
          <div className="relative inline-grid grid-cols-4 gap-5 rounded-md bg-black bg-opacity-80 px-4 py-3 text-2xl text-white md:text-4xl">
            <Tooltip text="Home">
              <Link to="/">
                <AiOutlineHome />
              </Link>
            </Tooltip>

            <Tooltip text="Login">
              <Link to="/login">
                <AiOutlineHeart />
              </Link>
            </Tooltip>

            <Tooltip text="Join">
              <Link to="/join">
                <AiOutlineMail />
              </Link>
            </Tooltip>

            <Tooltip text="Logout">
              <Form action="/logout" method="post" className="m-0 p-0">
                <button type="submit" className="bg-transparent">
                  <AiOutlineLogout />
                </button>
              </Form>
            </Tooltip>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
