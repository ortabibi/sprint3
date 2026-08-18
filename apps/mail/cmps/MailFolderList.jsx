export function MailFolderList({ filterByStatus, onSetStatus, onOpenCompose }) {

    return <section className="side-filter">
        <button className="mail-compose-btn" onClick={onOpenCompose}>
            <section className="mail-compose-btn-container">
                <span className="material-symbols-outlined">edit</span>
                <span>Compose</span>
            </section>
        </button>
        <button className={filterByStatus === 'inbox' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('inbox')}>
            <section>
                <span className="material-symbols-outlined">inbox</span>
                <span>Inbox</span>
            </section>
            <span>12</span>
        </button>
        <button className={filterByStatus === 'starred' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('starred')}>
            <section>
                <span className="material-symbols-outlined">star</span>
                <span>Starred</span>
            </section>
        </button>
        <button className={filterByStatus === 'sent' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('sent')}>
            <section>
                <span className="material-symbols-outlined">send</span>
                <span>Sent</span>
            </section>
        </button>
        <button className={filterByStatus === 'drafts' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('drafts')}>
            <section>
                <span className="material-symbols-outlined">draft</span>
                <span>Drafts</span>
            </section>
        </button>
        <button className={filterByStatus === 'trash' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('trash')}>
            <section>
                <span className="material-symbols-outlined">delete</span>
                <span>trash</span>
            </section>
        </button>
    </section>
}