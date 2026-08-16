const { Link } = ReactRouterDOM

import { LongTxt } from '../cmps/LongTxt.jsx'
import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, onToggleStar, onToggleRead, onRemoveMail }) {

    return <React.Fragment>
        <button className={`star-btn ${mail.isStared ? 'stared' : ''}`} onClick={() => onToggleStar(mail)}>
            <span className="material-symbols-outlined">star</span>
        </button>

        <Link to={`/mail/${mail.id}`} className="mail-preview-link">
            <div className={`mail-preview ${mail.isRead ? 'read' : ''}`}>
                <div className="mail-from">{mail.from}</div>
                <div className="mail-data">
                    <span className="mail-subject">{mail.subject}</span>
                    <LongTxt txt={mail.body} />
                </div>
                <div className="mail-date">{utilService.formatMailDate(mail.createdAt)}</div>
            </div>
        </Link>
        <div className="mail-icons">
            <button type="button" className="trash" onClick={(ev) => { ev.preventDefault(); onRemoveMail(mail) }}>
                <span className="material-symbols-outlined">delete</span>
            </button>
            <button type="button" className="read" onClick={(ev) => { ev.preventDefault(); onToggleRead(mail) }}>
                <span className="material-symbols-outlined">
                    {mail.isRead ? 'mail' : 'drafts'}
                </span>
            </button>
        </div>
    </React.Fragment>
}