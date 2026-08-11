export function MailFolderList({ filterByStatus , onSetStatus}) {


    return <section className="side-filter">
        <button className="mail-compose-btn">
            <section className="mail-compose-btn-container">
                <img src="" alt="" />
                <span></span>
            </section>
        </button>
        <button className={filterByStatus === 'inbox' ? 'selected-side-filter' : ''}
            onClick={ () => onSetStatus('inbox')}>
            <section>
                <img src="" alt="" />
                <span>inbox</span>
            </section>
            <span>12</span>
        </button>
        <button className={filterByStatus === 'starred' ? 'selected-side-filter' : ''}
            onClick={() => onSetStatus('starred') }>
            <section>
                <img src="" alt="" />
                <span>starred</span>
            </section>
        </button>
        <button className={filterByStatus === 'sent' ? 'selected-side-filter' : ''}
            onClick={ () => onSetStatus('sent')}>
            <section>
                <img src="" alt="" />
                <span>sent</span>
            </section>
        </button>
        <button className={filterByStatus === 'drafts' ? 'selected-side-filter' : ''}
            onClick={ () => onSetStatus('drafts')}>
            <section>
                <img src="" alt="" />
                <span>drafts</span>
            </section>
        </button>
        <button className={filterByStatus === 'trash' ? 'selected-side-filter' : ''}
            onClick={ () => onSetStatus('trash')}>
            <section>
                <img src="" alt="" />
                <span>trash</span>
            </section>
        </button>
    </section>
}