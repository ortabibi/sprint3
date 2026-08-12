const { useState } = React

export function NoteAdd({ onAddNote }) {
  const [newNote, setNewNote] = useState({ info: { title: "", txt: "",type } })

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
    setNewNote({ info: { title: "", txt: "" } ,type})
  }
  return  <section className="note-add">
    <form onSubmit={onSaveNote}>
      <input
        type="text"
        name="title"
        placeholder="Note Title"
        value={newNote.info.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="txt"
        placeholder="Note Text"
        value={newNote.info.txt}
        onChange={handleChange}
      />
      <button type="submit">Add Note</button>
    </form>
  </section>
}
//{text} todo, img, canvas,video,