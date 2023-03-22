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

export default function SavedPetsPage() {
  const data = useLoaderData<typeof loader>();
  const { user } = data;
  const pets = user?.savedPets;
  console.log("data", data.user?.savedPets[0].pet);

  return (
    <div>
      {pets?.length === 0 ? (
        <h2 className="text-center text-xl">Go save some pets!</h2>
      ) : (
        <div>
          <h2 className="text-center text-xl">Your Saved Pets</h2>
          <ul>
            {pets?.map((pet) => (
              <li key={pet.pet.id}>{pet.pet.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
