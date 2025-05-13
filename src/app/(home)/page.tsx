"use client";

import React, { useEffect, useRef, useState } from "react";
import { UserList } from "../components/UserList";
import { ChatComponent } from "../components/ChatComponent";
import { useAuthStore } from "../../store/auth/authStore";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";

interface User {
  id: string;
  userId: string;
  fullName: string;
}

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3000");
    }

    const socket = socketRef.current;

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
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r border-gray-300 bg-white">
        <UserList users={users} />
      </div>

      <div className="flex-1">
        {user ? (
          <ChatComponent
            socket={socketRef.current}
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
