import { getAllUsers } from "@/app/api/userService";
import React, { useState, useEffect } from "react";

export const UserList = () => {
  const [users, setUsers] = useState<{ id: string; fullName: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err as string);
        setError("Error al obtener usuarios");
      }
    }

    fetchUsers();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Contactos</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id}>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3 text-left">
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-gray-500">Toca para chatear</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
