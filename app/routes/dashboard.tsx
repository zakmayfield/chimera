import type { LoaderArgs } from "@remix-run/server-runtime";
import { getUser } from "~/models/user.server";
import { requireUserId } from "~/utils/session.server";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const user = await getUser(userId);
  return json({ user });
}

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();
  const { user } = data;

  return (
    <div>
      <div className="py-5 text-center">
        <h3>Hello, {user?.name}</h3>
      </div>

      <div className="grid grid-cols-5">
        <ul className="border-2">
          <li className="rounded-md">
            <Link to="pets" >
              Pets
            </Link>
          </li>

          <li className="rounded-md">
            <Link to="account">Account</Link>
          </li>
        </ul>

        <div className="col-span-4 border-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
