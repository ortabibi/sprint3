const { Link } = ReactRouterDOM

import { MailPreview } from '../cmps/MailPreview.jsx'


export function MailList({ mails, onToggleStar, onToggleRead, onRemoveMail }) {
    return <section className="mail-list-container">
        <ul className='mail-list'>
            {mails.map(mail =>
                <li key={mail.id} className={`mail-li ${mail.isRead ? 'read' : ''}`}>
                    <MailPreview mail={mail} onToggleStar={onToggleStar} onToggleRead={onToggleRead} onRemoveMail={onRemoveMail} />
                </li>
            )}
        </ul>
    </section>
}
