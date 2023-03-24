import type { LoaderArgs } from '@remix-run/server-runtime';

export async function loader ({ request }: LoaderArgs) {
  return {
    data: true
  }
}

export default function PetsPage() {
  return (
    <div>
      Pets page
    </div>
  )
}