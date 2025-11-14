import { api } from "../../../api";
import type { Note } from "../types";

// Obtiene eventos/notas paginados para un usuario
export async function getNotes(
  userId: number | string,
  page = 1,
  limit = 10,
): Promise<Note[]> {
  try {
    // El endpoint correcto del backend es /api/notes/users/:id?page=1&limit=10
    const data = await api.get(
      `/api/notes/users/${userId}?page=${page}&limit=${limit}`,
    );

    // El backend responde con { pagination, items: [{ events, events_type }] }
    if (Array.isArray(data.items)) {
      // Mapear la respuesta del backend al formato de Note esperado
      return data.items.map((item: any) => {
        const event = item.events || {};
        const eventType = item.events_type || {};

        return {
          id: event.id?.toString() || "",
          title: event.title || "",
          description: event.description || "",
          type: eventType.name || "normal",
          date: event.date || new Date().toISOString(),
          remember: event.remember || false,
          participants: event.participants
            ? event.participants.split(",").map((p: string) => p.trim())
            : [],
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Error getting notes:", error);
    return [];
  }
}
