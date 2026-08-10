const { Link } = ReactRouterDOM
import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {
    return <section>
        <ul className='note-list'>
            {notes.map(note=> <li key={note.id} className='note-li'>
                <NotePreview note={note} onRemoveNote={onRemoveNote} />
            </li>)}
        </ul>
    </section>
}
