export async function loader() {
  return {
    data: true,
  };
}

export default function DashboardPetsPage() {
  return (
    <div>
      <h2 className="text-xl text-center">Your Pets</h2>
    </div>
  );
}
