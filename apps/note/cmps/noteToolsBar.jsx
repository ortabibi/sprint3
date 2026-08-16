const { useState } = React
const { Link, NavLink } = ReactRouterDOM

import { NoteEditModal } from "../cmps/NoteEditModal.jsx"

export function NoteToolsBar({ note, onRemoveNote, onUpdateNote, onDuplicateNote }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  return (
    <section className="note-tools-bar">
      <button className="note-tools-btn" onClick={() => onRemoveNote(note.id)}>
        <i className="fa-solid fa-trash"></i>
      </button>

      <button
        className="note-tools-btn"
        onClick={() => onUpdateNote({ ...note, isPinned: !note.isPinned })}
      >
        <i className="fa-solid fa-thumbtack"></i>
      </button>

  <button className="note-tools-btn" onClick={() => onDuplicateNote(note.id)}>
        <i className="fa-solid fa-clone"></i>
      </button>

 <NavLink to="/mail" className="note-tools-btn">
  <i className="fa-solid fa-envelope"></i>
</NavLink>

        <button className="note-tools-btn" onClick={() => setIsEditModalOpen(true)}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      {isEditModalOpen && 
        <NoteEditModal note={note} onUpdateNote={onUpdateNote} onCloseModal={() => setIsEditModalOpen(false)} />
        }
    </section>
  )
}