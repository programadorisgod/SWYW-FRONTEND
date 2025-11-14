import { api } from "../../../api";

export async function deleteNote(id: string): Promise<string> {
  try {
    // El endpoint del backend es /api/notes/:id (DELETE)
    const data = await api.delete(`/api/notes/${id}`);
    // El backend responde con un mensaje o el objeto eliminado
    if (data && (data.id || data.message || data.success)) {
      return "Note deleted successfully";
    }
    return "No se pudo eliminar la nota";
  } catch (error) {
    console.error("Error eliminando nota:", error);
    return "Error eliminando nota";
  }
}
