import { api } from "../../../api";

export default async function register(
  name: string,
  email: string,
  pass: string,
): Promise<string> {
  try {
    // El endpoint del backend es /api/auth/register (POST)
    const data = await api.post("/api/auth/register", { name, email, pass });
    
    // El backend responde con { id: <userId> } o { user: {...} } o un mensaje
    if (data && data.id) {
      return "Registro exitoso";
    }
    if (data && data.user) {
      return "Registro exitoso";
    }
    if (data && data.message) {
      return data.message;
    }
    return "Registro fallido";
  } catch (error) {
    console.error("Error durante registro:", error);
    return "Registro fallido";
  }
}
