import type { LoaderArgs } from "@remix-run/server-runtime";

export async function loader({ request }: LoaderArgs) {
  return {
    data: true,
  };
}

export default function RootIndexPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <div className="relative">
        <div className="w-full">
          <h1>Root Index Page</h1>
        </div>
      </div>
    </main>
  );
}
