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
      <p>available pets will be listed here for adoption</p>
    </div>
  )
}