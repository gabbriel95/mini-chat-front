"use client";

import { redirect } from "next/navigation";
import { useAuthStore } from "../stores/auth/authStore";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);

  if (user) {
    redirect("/");
  }

  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
