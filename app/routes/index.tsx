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
                {/* {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="mx-auto w-3/4 space-y-4 sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600"
                    >
                      Log In
                    </Link>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>

        {/* Landing page bottom content */}
        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            {[
              {
                src: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
                alt: "Fly.io",
                href: "https://fly.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/158238105-e7279a0c-1640-40db-86b0-3d3a10aab824.svg",
                alt: "PostgreSQL",
                href: "https://www.postgresql.org/",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
                alt: "Prisma",
                href: "https://prisma.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
                alt: "Tailwind",
                href: "https://tailwindcss.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
                alt: "Cypress",
                href: "https://www.cypress.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
                alt: "MSW",
                href: "https://mswjs.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
                alt: "Vitest",
                href: "https://vitest.dev",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
                alt: "Testing Library",
                href: "https://testing-library.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
                alt: "Prettier",
                href: "https://prettier.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
                alt: "ESLint",
                href: "https://eslint.org",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
                alt: "TypeScript",
                href: "https://typescriptlang.org",
              },
            ].map((img) => (
              <a
                key={img.href}
                href={img.href}
                className="flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
              >
                <img alt={img.alt} src={img.src} className="object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
