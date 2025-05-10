import { getAllUsers } from "@/services/userService";
import React, { useState, useEffect } from "react";

export const UserList = ({
  onSelectUser,
}: {
  onSelectUser: (id: string) => void;
}) => {
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
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Selecciona un usuario para chatear:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => onSelectUser(user.id)}>
              {user.fullName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
