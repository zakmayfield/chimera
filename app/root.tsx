import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
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
import { AiOutlineHome, AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import { Link } from "@remix-run/react";

import { getUser } from "./utils/session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
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
          <div className="inline-grid grid-cols-3 gap-5 rounded-md bg-black bg-opacity-80 px-4 py-3 text-2xl text-white md:text-4xl">
            <Link to="/" onClick={() => console.log('clicked')}>
              <AiOutlineHome />
            </Link>
            <Link to="/login">
              <AiOutlineHeart />
            </Link>
            <Link to="/join">
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
