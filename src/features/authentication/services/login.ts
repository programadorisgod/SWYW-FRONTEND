import { api } from "../../../api";
import type { User } from "../../notes/types";

export default async function login(
  email: string,
  pass: string,
): Promise<User | string> {
  try {
    // El endpoint del backend es /api/auth/login (POST)
    const data = await api.post("/api/auth/login", { email, pass });
    // El backend responde con el usuario o un mensaje
    if (data && data.user && data.user.id) {
      return data.user as User;
    }
    if (data && data.id) {
      // Si la respuesta directa es el usuario
      return data as User;
    }
    return data.message || "Login fallido";
  } catch (error) {
    console.error("Error durante login:", error);
    return "Login fallido";
  }
}
