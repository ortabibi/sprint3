export function MailFolderList({ filterByStatus, onSetStatus, onOpenCompose }) {

    function getIconStyle(status) {
        return filterByStatus === status ? 'fa-solid' : 'fa-regular'
    }

    return <section className="side-filter">
        <button className="mail-compose-btn" onClick={onOpenCompose}>
            <section className="mail-compose-btn-container">
                <i className="fa-solid fa-pen"></i>
                <span>Compose</span>
            </section>
        </button>
        <button className={filterByStatus === 'inbox' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('inbox')}>
            <section>
                <i className={`${getIconStyle('inbox')} fa-inbox`}></i>
                <span>inbox</span>
            </section>
            <span>12</span>
        </button>
        <button className={filterByStatus === 'starred' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('starred')}>
            <section>
                <i className={`${getIconStyle('starred')} fa-star`}></i>
                <span>starred</span>
            </section>
        </button>
        <button className={filterByStatus === 'sent' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('sent')}>
            <section>
                <i className={`${getIconStyle('sent')} fa-paper-plane`}></i>
                <span>sent</span>
            </section>
        </button>
        <button className={filterByStatus === 'drafts' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('drafts')}>
            <section>
                <i className={`${getIconStyle('drafts')} fa-file`}></i>
                <span>drafts</span>
            </section>
        </button>
        <button className={filterByStatus === 'trash' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('trash')}>
            <section>
                <i className={`${getIconStyle('trash')} fa-trash-can`}></i>
                <span>trash</span>
            </section>
        </button>
    </section>
}