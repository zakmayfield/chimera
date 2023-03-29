import { Link, Outlet } from "@remix-run/react";

export async function loader() {
  return {
    data: true,
  };
}

export default function DashboardPetsPage() {
  return (
    <div>
      <div className="text-center">
        <div className='flex gap-5'>
          <Link to="listed">Listed Pets</Link>
          <Link to="saved">Saved Pets</Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
