import { User } from "@/interfaces/user.interface";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: string, fullName: string): Socket => {
  if (!socket) {
    socket = io("http://localhost:3000");
  }

  socket.emit("set-user", { userId, fullName });

  return socket;
};

export const onClientsUpdated = (callback: (users: User[]) => void) => {
  if (!socket) return;
  socket.on("clients-updated", callback);
};

export const disconnectSocketListeners = () => {
  if (!socket) return;
  socket.off("clients-updated");
};

export const getSocket = () => socket;
