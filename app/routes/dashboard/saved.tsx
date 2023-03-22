export async function loader() {

  return {
    data: true
  }
}

export default function SavedPetsPage () {
  return (
    <div>
      <h2 className='text-xl text-center'>Your Saved Pets</h2>
    </div>
  )
}