export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    noteService.getFilterFromSearchParams(searchParams),
  )

  useEffect(() => {
    loadNotes(filterBy)
  }, [])

  useeffectUpdate(() => {
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
    setFilterBy(carService.getDefaultFilter())
  }

  if (!notes)
    return (
      <div className="loader">
        <img src="/assets/loader.gif" alt="Loading..." />
      </div>
    )

  return <section className="container">Notes app</section>
}
