import { api } from "../../../api";
import type { Note } from "../types";

export async function editNote(note: Note): Promise<string> {
  try {
    // El endpoint del backend es /api/notes/:id (PUT)
    const data = await api.put(`/api/notes/notes/${note.id}`, note);
    // El backend responde con el evento editado o un mensaje
    if (data && data.id) {
      return "Nota editada correctamente";
    }
    return "No se pudo editar la nota";
  } catch (error) {
    console.error("Error editando nota:", error);
    return "Error editando nota";
  }
}
