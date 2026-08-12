export function MailFolderList({ filterByStatus, onSetStatus }) {

    function getIconStyle(status) {
        return filterByStatus === status ? 'fa-solid' : 'fa-regular'
    }

    return <section className="side-filter">
        <button className="mail-compose-btn">
            <section className="mail-compose-btn-container">
                <i className="fa-solid fa-pen"></i>
                <span>Compose</span>
            </section>
        </button>
        <button className={filterByStatus === 'inbox' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('inbox')}>
            <section>
                <span className="material-symbols-outlined">inbox</span>
                <span>inbox</span>
            </section>
            <span>12</span>
        </button>
        <button className={filterByStatus === 'starred' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('starred')}>
            <section>
                <span className="material-symbols-outlined">star</span>
                <span>starred</span>
            </section>
        </button>
        <button className={filterByStatus === 'sent' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('sent')}>
            <section>
                <span className="material-symbols-outlined">send</span>
                <span>sent</span>
            </section>
        </button>
        <button className={filterByStatus === 'drafts' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('drafts')}>
            <section>
                <span className="material-symbols-outlined">draft</span>
                <span>drafts</span>
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