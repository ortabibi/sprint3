const { useState, useEffect,useRef } = React

import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'
import { noteService } from '../services/note.service.js'
import { FilterOptions } from './FilterOptions.jsx'
export function NoteFilter({ filterBy, onSetFilterBy, onClearFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
const[isOpen,setIsOpen] = useState(false)

const filterRef = useRef(null)

	useEffectUpdate(() => {
		onSetFilterBy(filterByToEdit)
	}, [filterByToEdit])

    useEffect(() => {
    function handleClickOutside(event) {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
    
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
        <form className="note-filter-form" onSubmit={(e) => e.preventDefault()} ref={filterRef}>
            <div className="search-input-wrapper" onClick={() => setIsOpen(true)}>
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" name="txt" id="txt" placeholder='Search' value={filterByToEdit.txt} onChange={handleChange} />
            
           {filterByToEdit.txt && (
        <button type="button" className="clear-btn" onClick={clearFilter}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </div>
{isOpen &&
    <FilterOptions filterBy={filterBy} onSetFilterBy={onSetFilterBy} onSelectType={onSelectType} />
}
  </form>
</section>
}