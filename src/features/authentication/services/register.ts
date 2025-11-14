import { api } from "../../../api";

export default async function register(
  name: string,
  email: string,
  pass: string,
): Promise<string> {
  try {
    // El endpoint del backend es /api/auth/register (POST)
    const data = await api.post("/api/auth/register", { name, email, pass });
    // El backend responde con el usuario creado o un mensaje
    if (data && data.user) {
      return "Registro exitoso";
    }
    return data.message || "Registro fallido";
  } catch (error) {
    console.error("Error durante registro:", error);
    return "Registro fallido";
  }
}
