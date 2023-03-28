// import dogs from "~/images/dogs.jpg";
// import paw from "~/images/paw.png";
// import dog from "~/images/dog.png";
// import cat from "~/images/cat.png";

// import { useOptionalUser } from "~/utils/utils";
import { Form, useActionData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import * as React from "react";
import { badRequest } from "~/utils/utils";
import { redirect } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  return {
    data: true,
  };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const search = formData.get("search");

  if (typeof search !== "string" || search.length === 0) {
    return badRequest({
      searchError: "Search entry required",
    });
  }

  return redirect(`/pets/${search}`);
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.searchError) {
      searchRef.current?.focus();
    }
  }, [actionData]);

  return (
    <main className="relative min-h-screen bg-white">
      <div className="relative">
        <div className="w-full">
          {/* Landing page top content */}
          <div className="relative sm:p-8 sm:pb-0">
            <div className="relative mx-auto max-w-screen-xl bg-[url('~/images/dogs.jpg')] bg-cover bg-center py-20 sm:rounded-lg sm:py-28 lg:py-32">
              {/* leaving this here for reference */}
              {/* <div className="absolute inset-0 bg-[color:rgba(0,0,0,0.4)] mix-blend-multiply sm:rounded-lg" /> */}

              {/* title content */}
              <div>
                <h1 className="block text-center text-6xl font-extrabold uppercase tracking-tight text-white drop-shadow-md sm:text-7xl md:text-8xl lg:text-9xl">
                  Chimera
                </h1>
                <h2 className="block text-center text-xl uppercase tracking-wide text-white drop-shadow md:text-2xl lg:text-3xl">
                  Find your forever friend
                </h2>
              </div>

              {/* search input */}
              <div className="mt-5 px-5">
                <Form method="post" className="flex flex-col">
                  <input
                    ref={searchRef}
                    id="search"
                    required
                    autoFocus={true}
                    name="search"
                    type="name"
                    autoComplete="search"
                    // aria-invalid={actionData?.errors?.search ? true : undefined}
                    aria-describedby="search-error"
                    className="w-full rounded-md border border-gray-500 px-2 py-2 text-lg"
                  />
                  <button className="mx-auto mt-2 w-2/4 rounded border border-white bg-transparent py-2 px-4 font-semibold text-white hover:border-transparent hover:bg-blue-400 hover:text-white">
                    Search
                  </button>
                </Form>
              </div>
            </div>
          </div>
          {/* Landing page top content END */}
        </div>
      </div>
    </main>
  );
}
