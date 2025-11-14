import { api } from "../../../api";
import type { event } from "../types";

export async function createNote(note: event): Promise<string> {
  try {
    // Obtener userId del localStorage
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return "Usuario no autenticado";
    }

    const user = JSON.parse(userStr);

    // Reemplazar userId con el del usuario autenticado
    const eventToSend = {
      ...note,
      userId: user.id.toString(),
    };

    // El endpoint del backend es /api/notes/ (POST)
    const data = await api.post("/api/notes/", eventToSend);

    // El backend responde con el evento creado o un mensaje
    if (data && data.id) {
      return "Nota creada correctamente";
    }
    return "No se pudo crear la nota";
  } catch (error) {
    console.error("Error creando nota:", error);
    return "Error creando nota";
  }
}
