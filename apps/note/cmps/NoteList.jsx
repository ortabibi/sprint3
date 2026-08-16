const { Link } = ReactRouterDOM
import { NotePreview } from '../cmps/NotePreview.jsx'
export function NoteList({ notes, onRemoveNote, onUpdateNote, onDuplicateNote }) {
    const pinnedNotes = notes.filter((note) => note.isPinned)
    const otherNotes = notes.filter((note) => !note.isPinned)
    const hasPinned = pinnedNotes.length > 0

    function renderList(notesToRender) {
    return (
      <ul className="note-list">
        {notesToRender.map((note) => (
          <li key={note.id} className="note-li">
            <NotePreview
              note={note}
              onRemoveNote={onRemoveNote}
              onUpdateNote={onUpdateNote}
              onDuplicateNote={onDuplicateNote}
            />
          </li>
        ))}
      </ul>
    )
  }
  return (
    <section className="note-list-container">
      {hasPinned && (
        <div className="pinned-notes-section">
          <h3>PINNED</h3>
          {renderList(pinnedNotes)}
        </div>
      )}

      {otherNotes.length > 0 && (
        <div className="other-notes-section">
          {hasPinned && <h3>OTHERS</h3>}
          {renderList(otherNotes)}
        </div>
      )}
    </section>
  )
}