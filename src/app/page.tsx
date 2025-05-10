"use client";

import { useAuthStore } from "./stores/auth/authStore";

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h1>Bienvenido, {user?.fullName}</h1>
      <p>Rol: {user?.roles.join(", ")}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
