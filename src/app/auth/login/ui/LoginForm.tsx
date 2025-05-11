"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthStore } from "@/app/stores/auth/authStore";
import { login } from "../../../api/authApi";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login(data);

      localStorage.setItem("token", result.token);
      setUser(result);
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
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
