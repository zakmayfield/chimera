import { Link } from "@remix-run/react";
import dogs from "~/images/dogs.jpg";
import paw from "~/images/paw.png";
import dog from "~/images/dog.png";
import cat from "~/images/cat.png";

// import { useOptionalUser } from "~/utils/utils";

export default function Index() {
  // const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:justify-center">
      <div className="relative sm:pb-16">
        {/* Landing page top content */}
        <div className=" w-full">
          <div className="relative shadow-xl sm:overflow-hidden">
            {/* image container | absolute for background image, setting t r b l: 0 */}
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src={dogs}
                alt="A pack of puppies lounging on stone steps"
              />
              <div className="absolute inset-0 bg-[color:rgba(27,167,254,0.5)] mix-blend-multiply" />
            </div>

            {/* content container */}
            <div className="relative pt-16 pb-8 sm:pt-24 sm:pb-14 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-white drop-shadow-md">
                  Chimera
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Find your forever friend.
              </p>
              <div className="mx-auto mt-20 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {/* List of options to filter pets by / this should be its own component, same with the navbar within root.. */}
                <div className="mx-auto w-2/5 space-y-4 text-center sm:inline-grid sm:w-4/6 sm:grid-cols-3 sm:gap-5 sm:space-y-0">
                  <div className="flex flex-col rounded bg-white px-6 py-5 text-base font-medium">
                    <Link to=".">
                      <img
                        className="m-auto w-11/12"
                        src={dog}
                        alt="dog face outline"
                      />
                      Dogs
                    </Link>
                  </div>
                  <div className="rounded bg-white px-6 py-5 text-base font-medium">
                    <Link to=".">
                      <img
                        className="m-auto w-11/12"
                        src={cat}
                        alt="cat face outline"
                      />
                      Cats
                    </Link>
                  </div>
                  <div className="rounded bg-white px-6 py-5 text-base font-medium">
                    <Link to=".">
                      <img
                        className="m-auto w-11/12"
                        src={paw}
                        alt="animal paw outline"
                      />
                      Other
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
