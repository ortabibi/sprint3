const useState = React.useState
export function FilterOptions({ filterBy, onSetFilterBy,onSelectType,}) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
    return <section className="filter-options">
    <div className="filter-options-header">
    <span>Types</span>
   <button type="button" className="clear-filter-btn" onClick={() => onSelectType('')}>
  Clear
</button>

    <div className="option-types">
    <div className="images-option"onClick={() => onSelectType('NoteImg')} >
        <i className="fa-regular fa-image" aria-hidden="true" ></i>
        <span>Images</span>
    </div>

    <div className="videos-option" onClick={() => onSelectType('NoteVideo')}>
        <i className="fa-brands fa-youtube" aria-hidden="true"></i>
        <span>Videos</span>
    </div>

    <div className="videos-option" onClick={() => onSelectType('NoteTodos')}>
        <i className="fa-regular fa-square-check" aria-hidden="true"></i>
        <span>Todos</span>
    </div>

    <div className="videos-option" onClick={() => onSelectType('NoteTxt')}>
        <i className="fa-solid fa-pencil" aria-hidden="true" ></i>
        <span>Texts</span>
    </div>
     <div className="images-option"onClick={() => onSelectType('NoteCanvas')} >
        <i className="fa-solid fa-paintbrush" aria-hidden="true" ></i>
        <span>Canvas</span>
    </div>
</div>
</div>

  </section>
}