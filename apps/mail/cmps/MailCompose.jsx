const { useState } = React

import { mailService } from '../services/mail.service.js'
import { eventBusService, showSuccessMsg } from '../../../services/event-bus.service.js'

export function MailCompose({ isComposeOpen, onCloseCompose }) {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())


    function handleChange({ target }) {
        const { name, value } = target
        setMailToEdit(prev => ({ ...prev, [name]: value }))
    }

    function onSendMail(ev) {
        ev.preventDefault()

        mailService.save(mailToEdit)
            .then(mail => {
                showSuccessMsg(`mail ${mail.id} saved`)
                setMailToEdit(mailService.getEmptyMail())
                onCloseCompose()
            })
    }

    return <section className={`mail-compose-backdrop ${isComposeOpen ? '' : 'hide'}`}>
        <section className="mail-compose-container">
            <div className="compose-header">
                <span>New Message</span>
                <div className="top-buttons">
                    <button type="button" onClick={onCloseCompose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>

            <form className="compose-main" onSubmit={onSendMail}>
                <input type="text"
                    name="to"
                    id="to"
                    placeholder="To"
                    value={mailToEdit.to}
                    onChange={handleChange}
                />
                <input type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    value={mailToEdit.subject}
                    onChange={handleChange}
                />
                <textarea
                    name="body"
                    cols={50}
                    rows={14}
                    value={mailToEdit.body}
                    onChange={handleChange}
                ></textarea>
                <div className="bottom-buttons">
                    <button type="submit" className="send-btn">send</button>
                </div>
            </form>
        </section>
    </section>
}