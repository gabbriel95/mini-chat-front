"use client";

import React, { useEffect } from "react";
import { UserList } from "./components/UserList";
import { ChatComponent } from "./components/ChatComponent";
import { useAuthStore } from "../store/auth/authStore";
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const currentUserId = user?.id;

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r border-gray-300 bg-white">
        <UserList />
      </div>

      <div className="flex-1">
        {currentUserId ? (
          <ChatComponent
            currentUserId={user.id}
            currentFullName={user.fullName}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Cargando...
          </div>
        )}
      </div>
    </div>
  );
}
