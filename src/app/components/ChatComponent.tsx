import React, { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

interface ChatComponentProps {
  socket: Socket | null;
  currentUserId: string;
  currentFullName: string;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({
  socket,
  currentUserId,
  currentFullName,
}) => {
  const [messages, setMessages] = useState<
    { userId: string; mensaje: string; fullName: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data: {
      userId: string;
      mensaje: string;
      fullName: string;
    }) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("mensaje_global", handleMessage);

    return () => {
      socket.off("mensaje_global", handleMessage);
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (socket && newMessage.trim() !== "") {
      socket.emit("mensaje_global", {
        userId: currentUserId,
        mensaje: newMessage,
        fullName: currentFullName,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg, index) => {
          const isOwnMessage = msg.userId === currentUserId;
          return (
            <div
              key={index}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  isOwnMessage
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white text-gray-900 border rounded-bl-none"
                }`}
              >
                <span className="block">{msg.mensaje}</span>
                <span className="text-[10px] opacity-70">{msg.fullName}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim() !== "") {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
