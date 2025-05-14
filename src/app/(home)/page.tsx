"use client";

import React, { useEffect, useState } from "react";
import { UserList } from "../components/UserList";
import { ChatComponent } from "../components/ChatComponent";
import { useAuthStore } from "../../store/auth/authStore";
import { useRouter } from "next/navigation";
import {
  connectSocket,
  onClientsUpdated,
  disconnectSocketListeners,
  getSocket,
} from "../api/socket";

interface User {
  id: string;
  userId: string;
  fullName: string;
}

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    connectSocket(user.id, user.fullName);

    onClientsUpdated((connectedUsers: User[]) => {
      setUsers(connectedUsers);
    });

    return () => {
      disconnectSocketListeners();
    };
  }, [user]);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r border-gray-300 bg-white">
        <UserList users={users} />
      </div>

      <div className="flex-1">
        {user ? (
          <ChatComponent
            socket={getSocket()}
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
