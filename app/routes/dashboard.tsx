import type { LoaderArgs } from "@remix-run/server-runtime";
import { getUser } from "~/models/user.server";
import { requireUserId } from "~/utils/session.server";
import { json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const user = await getUser(userId);
  return json({ user });
}

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>()
  const { user } = data

  console.log(user)

  return <div>Hello, {user?.name}</div>;
}
