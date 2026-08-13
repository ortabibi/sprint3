export function NoteType({ onSelectNoteType }) {
    return <div className="action-note-type">
            <button type="button" onClick={() => onSelectNoteType('NoteCanvas')}>
    <i className="fa-solid fa-paint-brush" aria-hidden="true"></i>
</button>

            <button type="button" onClick={() => onSelectNoteType('NoteImg')}>
                <i className="fa-regular fa-image" aria-hidden="true"></i>
            </button>

            <button type="button" onClick={() => onSelectNoteType('NoteVideo')}>
                <i className="fa-brands fa-youtube" aria-hidden="true"></i>
            </button>

            <button type="button" onClick={() => onSelectNoteType('NoteTodos')}>
                <i className="fa-regular fa-square-check" aria-hidden="true"></i>
            </button>
    </div>
 }