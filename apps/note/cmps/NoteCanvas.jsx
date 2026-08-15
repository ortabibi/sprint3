export function NoteCanvas(info){
    
    const {url} = info

    return <div className="note-canvas-container">
        {url && <img src={url} alt="Canvas drawing" className="note-canvas-img" />}
    </div>
}
