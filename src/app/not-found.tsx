'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth/authStore";


const NotFoundPage = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  return (
    <div className="flex h-screen justify-center items-center">
      <p>Página no encontrada. Redirigiendo...</p>
    </div>
  );
};

export default NotFoundPage;
