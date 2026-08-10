const { Link } = ReactRouterDOM
import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList({ notes, onRemoveNote, onUpdateNote }) {
    return <section>
        <ul className='note-list'>
            {notes.map(note=> <li key={note.id} className='note-li'>
                <NotePreview note={note} onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote} />
            </li>)}
        </ul>
    </section>
}
