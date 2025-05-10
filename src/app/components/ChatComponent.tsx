import React, { useState, useEffect } from "react";

interface ChatComponentProps {
  targetUserId: string; // ID del usuario con el que se está chateando
  onBack: () => void; // Función para volver a la lista de usuarios
}

export const ChatComponent: React.FC<ChatComponentProps> = ({
  targetUserId,
  onBack,
}) => {
  const [messages, setMessages] = useState<{ from: string; content: string }[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Aquí podrías conectar a un WebSocket o cargar mensajes previos para el chat
    console.log(`Conectando al chat con el usuario ${targetUserId}`);
  }, [targetUserId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Agregar el nuevo mensaje al estado local
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "me", content: newMessage },
      ]);
      setNewMessage("");

      // Aquí podrías enviar el mensaje al servidor o por WebSocket
      console.log(`Enviando mensaje al usuario ${targetUserId}: ${newMessage}`);
    }
  };

  return (
    <div>
      <button onClick={onBack}>Volver</button>
      <h3>Chat con el usuario {targetUserId}</h3>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{ textAlign: message.from === "me" ? "right" : "left" }}
          >
            <p>
              <strong>{message.from === "me" ? "Yo" : "Ellos"}:</strong>{" "}
              {message.content}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{ width: "80%", padding: "5px" }}
        />
        <button onClick={sendMessage} style={{ padding: "5px 10px" }}>
          Enviar
        </button>
      </div>
    </div>
  );
};
