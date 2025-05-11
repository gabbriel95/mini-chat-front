export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include"
    });

    if (!res.ok) throw new Error("Login fallido");

    return await res.json();
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Error desconocido");
  }
};

export const registerUser = async (data: {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });

  if (!res.ok) throw new Error("Registro fallido");

  return await res.json();
};
