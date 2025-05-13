"use client";

import React, { useEffect, useState } from "react";
import { UserList } from "../components/UserList";
import { ChatComponent } from "../components/ChatComponent";
import { useAuthStore } from "../../store/auth/authStore";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
interface User {
  id: string;
  userId: string;
  fullName: string;
}

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);

  const router = useRouter();

  const currentUserId = user?.id;

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    const currentUser = {
      userId: user.id,
      fullName: user.fullName,
    };

    socket.emit("set-user", currentUser);

    socket.on("clients-updated", (connectedUsers: User[]) => {
      setUsers(connectedUsers);
    });

    return () => {
      socket.off("clients-updated");
    };
  }, [user]);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r border-gray-300 bg-white">
        <UserList users={users} />
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
