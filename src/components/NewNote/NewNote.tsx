import { useState } from "react";
import type { Note } from "../../features/notes/types";
import { createNote } from "../../features/notes/services/createNote";
import { editNote } from "../../features/notes/services/editNote";
import { CheckIcon } from "../icons/Check";
import { CloseIcon } from "../icons/Close";
import { EditIcon } from "../icons/Edit";
import { EventCheckIcon } from "../icons/EventCheck";
import "./NewNote.css";
import { EventIcon } from "../icons/Event";
import { v4 as uuidv4 } from "uuid";

interface HandleModalProps {
  note?: Note;
  mode?: string;
  handleNewNote: (note: Note) => void;
  toggleNewNote: (mode?: string, note?: Note) => void;
}

export function NewNote({
  note,
  mode = "create",
  handleNewNote,
  toggleNewNote,
}: HandleModalProps) {
  const [newNote, setNewNote] = useState<Note>(
    note || {
      id: uuidv4(),
      title: "",
      description: "",
      type: "normal",
      date: new Date().toISOString(),
      remember: false,
      participants: [],
    },
  );
  const [isLoading, setIsLoading] = useState(false);
  const formIcon =
    mode === "view" ? (
      <EditIcon className="new-note-edit-icon" />
    ) : (
      <CheckIcon className="new-note-check-icon" />
    );

  const eventIcon = newNote.remember ? (
    <EventIcon className="new-note-event-icon" />
  ) : (
    <EventCheckIcon className="new-note-eventcheck-icon" />
  );
  const disabled = mode === "view";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let response = "";
    
    try {
      setIsLoading(true);
      
      switch (mode) {
        case "view":
          toggleNewNote("edit", newNote);
          break;
        case "create":
          const eventNote = {
            message: newNote.title + " - " + newNote.description,
            typeEvent: newNote.type,
            remember: newNote.remember,
            userId: "0", // Será reemplazado por el userId del localStorage en createNote
          };
          response = await createNote(eventNote);
          if (response === "Error creating note") {
            alert("Error al crear la nota. Por favor, inténtalo de nuevo.");
            return;
          }
          handleNewNote(newNote);
          toggleNewNote();
          break;
        case "edit":
          response = await editNote(newNote);
          if (response === "Error editing note") {
            alert("Error al editar la nota. Por favor, inténtalo de nuevo.");
            return;
          }
          handleNewNote(newNote);
          toggleNewNote();
          break;
        default:
          break;
      }
      event.currentTarget.reset();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="new-note-container">
      <section className="new-note">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título de tu nota..."
            value={newNote.title}
            onChange={(e) =>
              setNewNote({
                ...newNote,
                title: e.target.value,
              })
            }
            disabled={disabled || isLoading}
            required
          />
          <CloseIcon
            className="new-note-close-icon"
            onClick={() => !isLoading && toggleNewNote("create")}
          />
          <textarea
            name="description"
            placeholder="Describe los detalles de tu nota..."
            value={newNote.description}
            onInput={(e) => {
              const target = e.currentTarget;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight - 50}px`;
            }}
            onChange={(e) =>
              setNewNote({
                ...newNote,
                description: e.target.value,
              })
            }
            disabled={disabled || isLoading}
            required
          ></textarea>
          <div>
            <fieldset className="new-note-priority">
              <label>
                <input
                  type="radio"
                  name="type"
                  value={"urgent"}
                  checked={newNote.type === "urgent"}
                  disabled={disabled || isLoading}
                  onChange={() =>
                    setNewNote({
                      ...newNote,
                      type: "urgent",
                    })
                  }
                />
                <span>Importante</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value={"normal"}
                  checked={newNote.type === "normal"}
                  disabled={disabled || isLoading}
                  onChange={() => setNewNote({ ...newNote, type: "normal" })}
                />
                <span>Normal</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value={"recurring"}
                  checked={newNote.type === "recurring"}
                  disabled={disabled || isLoading}
                  onChange={() =>
                    setNewNote({ ...newNote, type: "recurring" })
                  }
                />
                <span>Recurrente</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  setNewNote({
                    ...newNote,
                    remember: !newNote.remember,
                  })
                }
                className="form-event-button"
                disabled={disabled || isLoading}
                title={newNote.remember ? "Recordatorio activo" : "Activar recordatorio"}
              >
                {eventIcon}
              </button>
            </fieldset>
            <button
              className="form-submit-button"
              type="submit"
              disabled={isLoading || !newNote.title || !newNote.description}
            >
              {isLoading ? (
                <span>{mode === "edit" ? "Editando..." : "Creando..."}</span>
              ) : (
                <>
                  {formIcon}
                  <span>{mode === "view" ? "Editar" : "Crear"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
