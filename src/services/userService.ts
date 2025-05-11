const API_BASE_URL = "http://localhost:3000/users";

// Obtener todos los usuarios
export async function getAllUsers() {
  const token = localStorage.getItem("token"); // Asegúrate de almacenar y recuperar el token
  const response = await fetch(`${API_BASE_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en el encabezado
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  return response.json(); // Devuelve la respuesta parseada como JSON
}
