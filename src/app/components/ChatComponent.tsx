"use client";

import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface ChatComponentProps {
  currentUserId: string; // ID del usuario actual
}

export const ChatComponent: React.FC<ChatComponentProps> = ({
  currentUserId,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<
    { userId: string; mensaje: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const socketConnection = io("http://localhost:3000"); // Cambia la URL según tu configuración
    setSocket(socketConnection);

    // Escuchar mensajes globales
    socketConnection.on(
      "mensaje_global",
      (data: { userId: string; mensaje: string }) => {
        setMessages((prevMessages) => [...prevMessages, data]); // Agregar mensaje a la lista
      }
    );

    return () => {
      socketConnection.disconnect(); // Desconectar al desmontar el componente
    };
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim() !== "") {
      // Emitir el mensaje global
      socket.emit("mensaje_global", {
        userId: currentUserId,
        mensaje: newMessage,
      });
      setNewMessage(""); // Limpiar el campo de texto
    }
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>Usuario {msg.userId}:</strong> {msg.mensaje}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};
