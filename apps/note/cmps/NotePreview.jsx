const { Link } = ReactRouterDOM

import { LongTxt } from "../cmps/LongTxt.jsx"

import { NoteToolsBar } from "../cmps/NoteToolsBar.jsx"

export function NotePreview({ note, onRemoveNote, onUpdateNote, }) {
  const { info, style, isPinned } = note
  const { title, txt, url } = info
  return (
    <React.Fragment>
      <article
        className={`note-preview ${isPinned ? "pinned" : ""}`}
        style={style}
      >
        <Link to={`/note/${note.id}`} className="note-link"></Link>

        {url && <img className="note-img" src={url} alt="Note media" />}
        {title && <div className="note-title">{title}</div>}
        {txt && <LongTxt className="note-txt" txt={txt} />}
        {
          <NoteToolsBar
            note={note}
            onRemoveNote={onRemoveNote}
            onUpdateNote={onUpdateNote}
          />
        }
      </article>
    </React.Fragment>
  )
}
