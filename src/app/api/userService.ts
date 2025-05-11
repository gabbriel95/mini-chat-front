'use server'

import { cookies } from 'next/headers'

export async function getAllUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  return response.json();
}
