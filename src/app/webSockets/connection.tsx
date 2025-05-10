import { io } from "socket.io-client";

// Conectar al servidor de WebSocket
export const socket = io("http://localhost:3000", {
  withCredentials: true, // Asegúrate de permitir credenciales si usas cookies
});
