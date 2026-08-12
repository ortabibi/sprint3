const { useState, useEffect } = React

import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'
import { noteService } from '../services/note.service.js'
import { FilterOptions } from './FilterOptions.jsx'
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
function onSelectType(type){
    setFilterByToEdit(prevFilter => ({
        ...prevFilter,type: prevFilter.type === type ? '' : type
    }))
}

return <section className="note-filter">
        <form className="note-filter-form">
            <label htmlFor="txt">Search:</label>
            <input type="text" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} />
            <button type="button" onClick={clearFilter}>Clear</button>
        
        <FilterOptions filterBy={filterBy} onSetFilterBy={onSetFilterBy}  onSelectType={onSelectType}

        />
        </form>
    </section>
}