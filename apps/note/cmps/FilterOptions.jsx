const { useState } = React
export function FilterOptions({ filterBy, onSetFilterBy,onSelectType,}) {
    return <section className="filter-options">
    <div className="filter-options-header">
    <span>Types</span>
   <button type="button" className="clear-filter-btn" onClick={() => onSelectType('')}>
  Clear
</button>
</div>

    <div className="option-types">
        
    <div className={`option-card ${filterBy && filterBy.type === 'NoteImg' ? 'active' : ''}`} onClick={() => onSelectType('NoteImg')} >
        <i className="fa-regular fa-image" aria-hidden="true" ></i>
        <span>Images</span>
    </div>

    <div className={`option-card ${filterBy && filterBy.type === 'NoteVideo' ? 'active' : ''}`} onClick={() => onSelectType('NoteVideo')}>
        <i className="fa-brands fa-youtube" aria-hidden="true"></i>
        <span>Videos</span>
    </div>

    <div className={`option-card ${filterBy && filterBy.type === 'NoteTodos' ? 'active' : ''}`} onClick={() => onSelectType('NoteTodos')}>
        <i className="fa-regular fa-square-check" aria-hidden="true"></i>
        <span>Todos</span>
    </div>

    <div className={`option-card ${filterBy && filterBy.type === 'NoteTxt' ? 'active' : ''}`}onClick={() => onSelectType('NoteTxt')}>
        <i className="fa-solid fa-pencil" aria-hidden="true" ></i>
        <span>Texts</span>
    </div>
     <div className={`option-card ${filterBy && filterBy.type === 'NoteCanvas' ? 'active' : ''}`}onClick={() => onSelectType('NoteCanvas')} >
        <i className="fa-solid fa-paintbrush" aria-hidden="true" ></i>
        <span>Canvas</span>
    </div>
</div>
  </section>
}