const { useState } = React
import { NoteType } from '../cmps/NoteType.jsx'

export function NoteAdd({ onAddNote }) {
  const [newNote, setNewNote] = useState({ info: { title: "", txt: ""},type: "NoteTxt" })
const { propName, placeholder } = getNoteType(newNote.type)

  function handleChange({ target }) {
    const { name, value } = target
    setNewNote((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [name]: value },
    }))
  }

  function onSaveNote(e) {
    e.preventDefault()
    onAddNote(newNote)
    setNewNote({ info: { title: "", txt: "" } ,type: "NoteTxt"})
  }
function getNoteType(noteType) {
    switch (noteType) {
        case 'NoteTxt':
            return {
                propName: 'txt',
                placeholder: 'New text...'
            }
        case 'NoteImg':
            return {
                propName: 'url',
                placeholder: 'Enter image URL...'
            }
        case 'NoteVideo':
            return {
                propName: 'url',
                placeholder: 'Enter video URL...'
            }
        case 'NoteTodos':
            return {
                propName: 'todos',
                placeholder: 'Enter list items...'
            }
            case 'NoteCanvas':
            return {
                propName: 'canvas',
                placeholder: 'Drew'
            }
        default:
            return {
                propName: 'txt',
                placeholder: 'new note...'
            }
    }
}
  function onSelectNoteType(type){
    setNewNote(prevNote => ({
        ...prevNote,
        type,
        info: { title: prevNote.info.title || ''}
    }))
  }
  
  return  <section className="note-add">
    <form onSubmit={onSaveNote}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newNote.info.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name={propName}
        placeholder={placeholder}
        value={newNote.info[propName] || ''}
        onChange={handleChange}
      />
      <NoteType
      onSelectNoteType={onSelectNoteType}
      />
      <button type="submit">Add Note</button>
    </form>
  </section>
}
//{text} todo, img, canvas,video,