"use client";

import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { ChatComponent } from "../components/ChatComponent";
import { UserList } from "../components/UserList";

export const ChatPage: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentChatUser, setCurrentChatUser] = useState<string | null>(null); // Usuario con el que estamos chateando
  const currentUserId = "2"; // Suponiendo que estamos logueados como Usuario 2 (esto debería venir del contexto o auth)

  useEffect(() => {
    const socketConnection = io("http://localhost:3000"); // Cambia la URL según tu configuración
    setSocket(socketConnection);

    // Registrar al usuario en el WebSocket para que pueda recibir notificaciones
    socketConnection.emit("registrar_usuario", currentUserId);

    // Escuchar notificaciones de inicio de chat
    socketConnection.on("notificacion_chat", (data: { userId: string }) => {
      console.log(`Notificación de chat recibida de ${data.userId}`);
      setCurrentChatUser(data.userId); // Abrimos automáticamente el chat con este usuario
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  if (currentChatUser) {
    return (
      <div>
        <ChatComponent currentUserId={currentUserId} />
      </div>
    );
  }

  return (
    <div>
      <UserList
        onSelectUser={(userId) => {
          if (socket) {
            // Emitir al servidor que queremos iniciar un chat con otro usuario
            socket.emit("iniciar_chat", {
              userId: currentUserId,
              targetUserId: userId,
            });
          }
          setCurrentChatUser(userId); // Cambiar a la vista de chat
        }}
      />
    </div>
  );
};
