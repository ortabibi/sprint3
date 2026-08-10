const { useState, useEffect } = React

import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'
import { noteService } from '../services/note.service.js'

export function NoteFilter({ filterBy, onSetFilterBy, onClearFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffectUpdate(() => {
		onSetFilterBy(filterByToEdit)
	}, [filterByToEdit])
    
	function handleChange(ev) {
		const { value, name, type } = ev.target
		setFilterByToEdit(prev => ({ ...prev, [name]: type === 'text' ? value : +value }))
	}
    function clearFilter() {
        setFilterByToEdit(noteService.getDefaultFilter())
   
}
    return <section className="note-filter">
        <form className="note-filter-form">
            <label htmlFor="txt">Search:</label>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} />
            <button type="button" onClick={clearFilter}>Clear</button>
        </form>
    </section>
}