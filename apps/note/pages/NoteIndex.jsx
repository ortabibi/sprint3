const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'
import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
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
        onClearFilter()
        showSuccessMsg(`Note ${noteId} removed`)
      })
      .catch((err) => showErrorMsg(`Cannot remove ${noteId}`))
  }

  function onClearFilter() {
    setFilterBy(noteService.getDefaultFilter())
  }

  if (!notes)
    return (
      <div className="loader">
        <img src="/assets/loader.gif" alt="Loading..." />
      </div>
    )

  return <section className="container">Notes app</section>
}
