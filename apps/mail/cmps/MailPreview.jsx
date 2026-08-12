const { Link } = ReactRouterDOM

import { LongTxt } from '../cmps/LongTxt.jsx'

export function MailPreview({ mail }) {
    return <React.Fragment>
        <button className="star-btn">
            <img src="./assets/css/img/star.png" alt="" />
        </button>
        <Link to={`/mail/${mail.id}`}>
            <div className={`mail-preview ${mail.isRead ? 'read' : ''}`}>
                <div className="mail-from">{mail.from}</div>
                <div className="mail-data">
                    <span className="mail-subject">{mail.subject}</span>
                    <LongTxt txt={mail.body} />
                </div>
                <div className="mail-date">{mail.createdAt}</div>
            </div>
        </Link>
        <div className="mail-icons">
            <button type="button" className="trash">
                <img src="./assets/css/img/recycle-bin.png" alt="delete" />
            </button>
            <button type="button" className="read">
                <img src="./assets/css/img/email.png" alt="delete" />
            </button>
        </div>
    </React.Fragment>
}