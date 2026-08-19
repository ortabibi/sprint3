export function ReadTabs({ isRead, onSetIsRead, hideTabs }) {
    return <div className={`read-tabs ${hideTabs ? 'hide' : ''}`}>
        <button
            type="button"
            className={isRead === '' ? 'active' : ''}
            onClick={() => onSetIsRead('')}
        >
            <span className="material-symbols-outlined">inbox</span>
            <span>Primary</span>
        </button>
        <button
            type="button"
            className={isRead === false ? 'active' : ''}
            onClick={() => onSetIsRead(false)}
        >
            <span className="material-symbols-outlined">mail</span>
            <span>Unread</span>
        </button>
        <button
            type="button"
            className={isRead === true ? 'active' : ''}
            onClick={() => onSetIsRead(true)}
        >
            <span className="material-symbols-outlined">drafts</span>
            <span>Read</span>
        </button>
    </div>
}