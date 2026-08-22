const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteEditModal } from "../cmps/NoteEditModal.jsx"
import { utilService } from "../../../services/util.service.js"
import { useEffectUpdate } from "../custom-hooks/useEffectUpdate.js"
import { noteService } from "../services/note.service.js"
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../../services/event-bus.service.js"
export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    noteService.getFilterFromSearchParams(searchParams),
  )

  useEffect(() => {
    loadNotes()
  }, [])

  useEffectUpdate(() => {
    loadNotes()
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
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === savedNote.id ? savedNote : note,
          ),
        )
        setSelectedNote(null)
        showSuccessMsg(`Note ${savedNote.id} updated`)
      })
      .catch((err) => showErrorMsg(`Cannot update`))
  }
  function onAddNote(newNote) {
    noteService
      .save(newNote)
      .then((savedNote) => {
        setNotes((prevNotes) => [savedNote, ...prevNotes])
        showSuccessMsg(`Note ${savedNote.id} added`)
      })
      .catch((err) => showErrorMsg(`Cannot add note`))
  }
  function onDuplicateNote(noteId) {
    noteService
      .duplicate(noteId)
      .then((duplicatedNote) => {
        setNotes((prevNotes) => [duplicatedNote, ...prevNotes])
        showSuccessMsg(`Note ${duplicatedNote.id} duplicated`)
      })
      .catch((err) => showErrorMsg(`Cannot duplicate ${noteId}`))
  }

  function onClearFilter() {
    setFilterBy(noteService.getDefaultFilter())
  }
  function onSelectNote(note) {
    setSelectedNote(note)
  }
  function onCloseEdit() {
    setSelectedNote(null)
  }

  if (!notes)
    return (
      <div className="loader">
        <img src="./assets/css/img/loader.svg" alt="A loader." />
      </div>
    )

  return (
    <section className="note-index">
      <React.Fragment>
        <NoteFilter
          filterBy={filterBy}
          onSetFilterBy={setFilterBy}
          onClearFilter={onClearFilter}
        />

        <NoteAdd onAddNote={onAddNote} />

        <NoteList
          notes={notes}
          onRemoveNote={onRemoveNote}
          onUpdateNote={onUpdateNote}
          onDuplicateNote={onDuplicateNote}
          onSelectNote={onSelectNote}
        />
        {selectedNote && (
          <NoteEditModal
            note={selectedNote}
            onUpdateNote={onUpdateNote}
            onCloseModal={onCloseEdit}
          />
        )}
      </React.Fragment>
    </section>
  )
}
