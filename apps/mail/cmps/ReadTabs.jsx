export function ReadTabs({ isRead, onSetIsRead, hideTabs }) {
    return <div className={`read-tabs ${hideTabs ? 'hide' : ''}`}>
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