"use client";

import React, { useState } from "react";
import { UserList } from "./components/UserList";
import { ChatComponent } from "./components/ChatComponent";
import { useAuthStore } from "./stores/auth/authStore";

export default function HomePage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // ID del usuario seleccionado
  const user = useAuthStore((state) => state.user);

  const currentUserId = user?.id;

  return (
    <div>
      {!selectedUserId ? (
        // Muestra la lista de usuarios si no se seleccionó ningún usuario
        <UserList onSelectUser={(id) => setSelectedUserId(id)} />
      ) : (
        // Muestra el componente de chat si hay un usuario seleccionado
        <ChatComponent currentUserId={currentUserId as string} />
      )}
    </div>
  );
}
