const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { utilService } from "../../../services/util.service.js"
import { useEffectUpdate } from "../custom-hooks/useEffectUpdate.js"
import { noteService } from "../services/note.service.js"
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../../services/event-bus.service.js"
export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    noteService.getFilterFromSearchParams(searchParams),
  )

  useEffect(() => {
    loadNotes(filterBy)
  }, [])

  useEffectUpdate(() => {
    loadNotes(filterBy)
    setSearchParams(noteService.trimObj(filterBy))
  }, [filterBy])

  function loadNotes() {
    noteService.query(filterBy).then(setNotes)
  }
  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        showSuccessMsg(`Note ${noteId} removed`)
      })
      .catch((err) => showErrorMsg(`Cannot remove ${noteId}`))
  }
  function onUpdateNote(updatedNote) {
    noteService
    .save(updatedNote)
    .then((savedNote) => {
      setNotes((prevNotes) => prevNotes.map((note) =>note.id === savedNote.id ? savedNote : note))
      showSuccessMsg(`Note ${savedNote.id} updated`)
    })
    .catch((err) => showErrorMsg(`Cannot update ${savedNote.id}`))
  }

  function onClearFilter() {
    setFilterBy(noteService.getDefaultFilter())
  }

  if (!notes)
    return (
      <div className="loader">
        <img src="./assets/css/img/loader.svg" alt="A loader." /> 
      </div>
    )

  return (
    <section className="mail-index">
      <React.Fragment>
        <NoteFilter
          filterBy={filterBy}
          onSetFilterBy={setFilterBy}
          onClearFilter={onClearFilter}
        />

        <NoteList 
        notes={notes}
        onRemoveNote={onRemoveNote}
        onUpdateNote={onUpdateNote}
         />
      </React.Fragment>
    </section>
  )
}
