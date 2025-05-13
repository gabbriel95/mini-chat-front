interface User {
  id: string;
  userId: string;
  fullName: string;
}

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Usuarios conectados</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id}>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg">
                {user.fullName.charAt(0)}
              </div>
              <div className="ml-3 text-left">
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-gray-500">Conectado</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
