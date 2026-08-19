export function NoteType({ onSelectNoteType,selectedType }) {
  return (
    <div className="action-note-type">
      <button
        type="button"
        title="Canvas"
        className={selectedType === "NoteCanvas" ? "active" : ""}
        onClick={() => onSelectNoteType("NoteCanvas")}
      >
        <i className="fa-solid fa-paint-brush" aria-hidden="true"></i>
      </button>

      <button
        type="button"
        title="Image"
        className={selectedType === "NoteImg" ? "active" : ""}
        onClick={() => onSelectNoteType("NoteImg")}
      >
        <i className="fa-regular fa-image" aria-hidden="true"></i>
      </button>

      <button
        type="button"
        title="Video"
        className={selectedType === "NoteVideo" ? "active" : ""}
        onClick={() => onSelectNoteType("NoteVideo")}
      >
        <i className="fa-brands fa-youtube" aria-hidden="true"></i>
      </button>

      <button
        type="button"
        title="Todo"
        className={selectedType === "NoteTodos" ? "active" : ""}
        onClick={() => onSelectNoteType("NoteTodos")}
      >
        <i className="fa-regular fa-square-check" aria-hidden="true"></i>
      </button>

      <button
        type="button"
        title="Text"
        className={selectedType === "NoteTxt" ? "active" : ""}
        onClick={() => onSelectNoteType("NoteTxt")}
      >
        <i className="fa-solid fa-font" aria-hidden="true"></i>
      </button>
    </div>
  )
}
