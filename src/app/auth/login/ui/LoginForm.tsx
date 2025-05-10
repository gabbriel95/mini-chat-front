"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/auth/authStore";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Login fallido");

      const result = await res.json();

      // Guardar el token en localStorage
      localStorage.setItem("token", result.token);

      // Podés guardar el usuario también si querés:
      // localStorage.setItem('user', JSON.stringify(result))
      setUser(result);
      router.push("/");
    } catch (err) {
      setError(err as string);
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h1>

        <input
          type="email"
          {...register("email")}
          placeholder="Correo electrónico"
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <input
          type="password"
          {...register("password")}
          placeholder="Contraseña"
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
        <p className="text-sm text-center mt-4">
          ¿No tenés cuenta?{" "}
          <a href="/auth/new-account" className="text-blue-500 underline">
            Crear cuenta
          </a>
        </p>
      </form>
    </div>
  );
}
