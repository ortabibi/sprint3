export function NoteVideo({info}){
    const {url} = info
    function getEmbedUrl(rawUrl) {
        if (!rawUrl) return ''
        let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
        let match = rawUrl.match(regExp)
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : rawUrl
    }

    const embedUrl = getEmbedUrl(url)
    return (
        <div className="note-video-container">
            {embedUrl && (
                <iframe
                    src={embedUrl}
                    title="Note Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    )
}