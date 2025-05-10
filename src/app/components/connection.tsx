import { io } from "socket.io-client";

// Conectar al servidor de WebSocket
export const socket = io("http://localhost:3000", {
  withCredentials: true, // Asegúrate de permitir credenciales si usas cookies
});

// Función para unirse a una sala privada
export function joinPrivateRoom(userId: string, targetUserId: string) {
  socket.emit("unirse_sala_privada", { userId, targetUserId });
}

// Función para enviar un mensaje privado
export function sendPrivateMessage(
  userId: string,
  targetUserId: string,
  mensaje: string
) {
  socket.emit("mensaje_privado", { userId, targetUserId, mensaje });
}
