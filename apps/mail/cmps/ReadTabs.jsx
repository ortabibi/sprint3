export function ReadTabs({ isRead, onSetIsRead }) {
    return <div className="read-tabs">
        <button
            type="button"
            className={isRead === '' ? 'active' : ''}
            onClick={() => onSetIsRead('')}
        >
            Primary
        </button>
        <button
            type="button"
            className={isRead === false ? 'active' : ''}
            onClick={() => onSetIsRead(false)}
        >
            Unread
        </button>
        <button
            type="button"
            className={isRead === true ? 'active' : ''}
            onClick={() => onSetIsRead(true)}
        >
            Read
        </button>
    </div>
}