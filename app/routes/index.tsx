import { Link } from "@remix-run/react";
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
          <div className="relative border-2 border-black sm:p-8 sm:pb-0">
            <div className="relative mx-auto max-w-screen-xl bg-[url('~/images/dogs.jpg')] bg-cover bg-center py-40 sm:rounded-lg">
              <div className="absolute inset-0 bg-[color:rgba(27,167,254,0.5)] mix-blend-multiply sm:rounded-lg" />
              <div>
                <h1 className="block text-center text-6xl font-extrabold uppercase tracking-tight text-white drop-shadow-md md:text-8xl">
                  Chimera
                </h1>
                <p className="block text-center text-xl uppercase tracking-tight text-white md:text-2xl">
                  Find your forever friend
                </p>
              </div>
            </div>
          </div>
          {/* Landing page top content END */}
          <div className='w-full absolute border-2 border-black text-center'>
            <div className='border-2 border-black inline-grid grid-cols-2 gap-2 px-2 py-1 rounded-md'>
              <Link to='/'>Home</Link>
              <Link to='/'>About</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
