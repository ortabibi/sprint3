
export function NoteImg({info}){
    const {url} = info
    return <div className="note-img-container">
        {url && <img src="url" alt="Note media" className="note-img"/>}
    </div>
}