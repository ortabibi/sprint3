const { Link } = ReactRouterDOM
import { MailPreview } from '../cmps/MailPreview.jsx'


export function MailList({ mails }) {
    return <section>
        <ul className='mail-list'>
            {mails.map(mail =>
                <li key={mail.id} className={`mail-li ${mail.isRead ? 'read' : ''}`}>
                    <MailPreview mail={mail} />
                </li>
            )}
        </ul>
    </section>
}
