"use client";

import React, { useState } from "react";
import { UserList } from "./components/UserList";
import { ChatComponent } from "./components/ChatComponent";
import { useAuthStore } from "./stores/auth/authStore";

export default function HomePage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  const currentUserId = user?.id;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-300 bg-white">
        <UserList onSelectUser={(id) => setSelectedUserId(id)} />
      </div>

      {/* Chat */}
      <div className="flex-1">
        {currentUserId ? (
          <ChatComponent currentUserId={currentUserId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Cargando...
          </div>
        )}
      </div>
    </div>
  );
}
