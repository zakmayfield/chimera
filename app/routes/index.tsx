// import dogs from "~/images/dogs.jpg";
// import paw from "~/images/paw.png";
// import dog from "~/images/dog.png";
// import cat from "~/images/cat.png";

// import { useOptionalUser } from "~/utils/utils";

export default function Index() {
  // const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white">
      <div className="relative">
        <div className="w-full">
          {/* Landing page top content */}
          <div className="relative sm:p-8 sm:pb-0">
            <div className="relative mx-auto max-w-screen-xl bg-[url('~/images/dogs.jpg')] bg-cover bg-center py-40 sm:rounded-lg">
              <div className="absolute inset-0 bg-[color:rgba(0,0,0,0.3)] mix-blend-multiply sm:rounded-lg" />
              <div>
                <h1 className="block text-center text-6xl font-extrabold uppercase tracking-tight text-white drop-shadow-md md:text-8xl lg:text-9xl">
                  Chimera
                </h1>
                <p className="block text-center text-xl uppercase tracking-wide drop-shadow text-white md:text-2xl">
                  Find your forever friend
                </p>
              </div>
            </div>
          </div>
          {/* Landing page top content END */}
        </div>
      </div>
    </main>
  );
}
