"use client";

import { redirect } from "next/navigation";
import { useAuthStore } from "../../store/auth/authStore";

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
