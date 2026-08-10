export function NoteToolsBar({ note, onRemoveNote, onUpdateNote }) {
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
      <label className="note-tools-btn color-picker-btn">
        <i className="fa-solid fa-palette"></i>
        <input
          type="color"
          value={(note.style && note.style.backgroundColor) || "#ffffff"}
          onChange={(ev) =>
            onUpdateNote({
              ...note,
              style: { ...note.style, backgroundColor: ev.target.value },
            })
          }
          style={{ opacity: 0, width: 0, height: 0, position: "absolute" }}
        />
      </label>
    </section>
  )
}
// rember to change to BIG WORD IN THE DOUC 

// עדיף לשים בתור editupdate את כל הפיצרים שמעדכנים 

