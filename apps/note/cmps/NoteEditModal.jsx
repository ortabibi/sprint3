const { useState } = React
import { NoteColor } from "../cmps/NoteColor.jsx"

export function NoteEditModal({ note, onUpdateNote, onCloseModal }) {
  const [editedNote, setEditedNote] = useState({
    ...note,
    info: { title: "", txt: "", url: "", todos: [], ...note.info },
  })

  function handleInfoChange({ target }) {
    const { name, value } = target
    setEditedNote((prev) => ({
      ...prev,
      info: { ...prev.info, [name]: value },
    }))
  }

  function handleStyleChange(backgroundColor) {
    setEditedNote((prev) => ({
      ...prev,
      style: { ...prev.style, backgroundColor },
    }))
  }

  function handleTodoChange(idx, txt) {
    const updatedTodos = [...editedNote.info.todos]
    updatedTodos[idx] = { ...updatedTodos[idx], txt }
    setEditedNote((prev) => ({
      ...prev,
      info: { ...prev.info, todos: updatedTodos },
    }))
  }

  function onSave(ev) {
    if (ev) ev.preventDefault()
    onUpdateNote(editedNote)
  }
  function onRemoveTodo(idxToRemove) {
  setEditedNote((prev) => ({
    ...prev,
    info: {
      ...prev.info,
      todos: prev.info.todos.filter((_, idx) => idx !== idxToRemove),
    },
  }))
}

  const { type, info, style = {} } = editedNote

  return (
    <div
      className="modal-backdrop"
      onClick={onCloseModal}
      onMouseDown={(ev) => ev.stopPropagation()}
    >
      <div
        className="modal-content"
        style={{ backgroundColor: style.backgroundColor || "#ffffff" }}
        onClick={(ev) => ev.stopPropagation()}
        onMouseDown={(ev) => ev.stopPropagation()}
      >
        <input
          type="text"
          name="title"
          value={info.title || ""}
          onChange={handleInfoChange}
          placeholder="Title"
        />

        {type === "NoteTxt" && (
          <textarea
            name="txt"
            value={info.txt || ""}
            onChange={handleInfoChange}
            placeholder="Edit note text..."
          />
        )}

        {(type === "NoteImg" || type === "NoteVideo") && (
          <input
            type="text"
            name="url"
            value={info.url || ""}
            onChange={handleInfoChange}
            placeholder="Enter URL..."
          />
        )}

        {type === "NoteTodos" && Array.isArray(info.todos) && (
  <div className="todos-edit-list">
    {info.todos.map((todo, idx) => (
      <div key={idx} className="todo-edit-row">
        <input
          type="text"
          value={todo.txt}
          onChange={(ev) => handleTodoChange(idx, ev.target.value)}
        />
        <button
          type="button"
          className="remove-todo-btn"
          onClick={() => onRemoveTodo(idx)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    ))}
  </div>
)}

       <div className="modal-footer">
          <NoteColor
            onSetNoteStyle={handleStyleChange}
            bgColor={style.backgroundColor || '#ffffff'}
          />

          <div className="modal-actions">
            <button type="button" onClick={onSave}>
              Save
            </button>
            <button type="button" onClick={onCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
