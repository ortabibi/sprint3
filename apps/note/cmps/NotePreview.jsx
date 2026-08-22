const { Link } = ReactRouterDOM

import { NoteTxt } from "../cmps/NoteTxt.jsx"
import { NoteImg } from "../cmps/NoteImg.jsx"
import { NoteVideo } from "../cmps/NoteVideo.jsx"
import { NoteTodos } from "../cmps/NoteTodos.jsx"
import { NoteCanvas } from "../cmps/NoteCanvas.jsx"
import { NoteToolsBar } from "../cmps/NoteToolsBar.jsx"

export function NotePreview({
  note,
  onRemoveNote,
  onUpdateNote,
  onCloseModal,
  onDuplicateNote,
  onSelectNote
}){
  const { info = {}, style = {}, isPinned, type } = note || {}
const { title = '', txt = '', url = '' } = info
function handleCardClick() {
    onSelectNote(note)
  }

  function onTogglePin(e) {
    e.stopPropagation()
    onUpdateNote({ ...note, isPinned: !isPinned })
  }

  return (
    <React.Fragment>
      <article
        className={`note-preview ${isPinned ? "pinned" : ""}`}
        style={style}
        onClick={handleCardClick}
      >
        {/* <Link to={`/note/${note.id}`} className="note-link"></Link> */}

        <button
          className={`pin-btn ${isPinned ? "pinned" : ""}`}
          onClick={onTogglePin}
        >
          <i className="fa-solid fa-thumbtack"></i>
        </button>
        {title && <div className="note-title">{title}</div>}
        <DynamicCmp type={type} info={info} onUpdateNote={onUpdateNote} />
        <div onClick={(e) => e.stopPropagation()}>
        <NoteToolsBar
          note={note}
          onRemoveNote={onRemoveNote}
          onUpdateNote={onUpdateNote}
          onDuplicateNote={onDuplicateNote}
        />
      </div>
    </article>
    </React.Fragment>
  )
}
const CmpMap = {
  NoteTxt,
  NoteImg,
  NoteVideo,
  NoteTodos,
  NoteCanvas,
}
function DynamicCmp({ type, info,note, onUpdateNote }) {
  const CmpToRender = CmpMap[type] || NoteTxt
  return <CmpToRender info={info} note={note} onUpdateNote={onUpdateNote} />
}
