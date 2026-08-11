const { useState } = React

export function NoteEditModal({ note, onUpdateNote,onCloseModal }) {
    const [editedNote, setEditedNote] = useState({...note,info: { title: '', txt: '', ...note.info }})

    function handleChange({target}) {
        const {name, value} = target
        setEditedNote(prevNote => ({...prevNote,info:{...prevNote.info,[name]:value}}))
}   
function onSave(){
    onUpdateNote(editedNote)
    onCloseModal()
}
return <div className="modal-backdrop" onClick={onCloseModal}>
        <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
            <input
            type="text"
            name="title"
            value={editedNote.info.title||""}
            onChange={handleChange}
            placeholder="Title"
            />
            <textarea
            name="txt"
            value={editedNote.info.txt||""}
            onChange={handleChange}
            placeholder="Edit note text"
            />
            
 <label className="note-tools-btn color-picker-btn">
        <i className="fa-solid fa-palette"></i>
        <input
           type="color"
           value={(editedNote.style && editedNote.style.backgroundColor) || "#ffffff"}
           onChange={(ev) =>
             setEditedNote(prevNote => ({
               ...prevNote,
               style: { ...prevNote.style, backgroundColor: ev.target.value },
             }))
           }
           style={{ opacity: 0, width: 0, height: 0, position: "absolute" }}
        /> 
</label>
            <div className="modal-actions">
                <button onClick={onSave}>Save</button>
                <button onClick={onCloseModal}>Cancel</button>
            </div>
        </div>
    </div>
}
    