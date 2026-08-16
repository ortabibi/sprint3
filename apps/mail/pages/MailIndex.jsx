
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'



export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isComposeOpen, setIsComposeOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))


    useEffect(() => {
        loadMails(mails)
    }, [])

    useEffectUpdate(() => {
        loadMails(filterBy)
        setSearchParams(utilService.trimObjOr(filterBy))
    }, [filterBy])


    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onSetStatus(status) {
        setFilterBy(prev => ({ ...prev, status }))
    }

    function onOpenCompose() {
        console.log('compose clicked')
        setIsComposeOpen(true)
    }

    function onCloseCompose() {
        setIsComposeOpen(false)
    }

    function onToggleStar(mail) {
        const updatedMail = { ...mail, isStared: !mail.isStared }
        setMails(prevMails => prevMails.map(m => m.id === updatedMail.id ? updatedMail : m))
        mailService.save(updatedMail)
    }

    function onToggleRead(mail) {
        const updatedMail = { ...mail, isRead: !mail.isRead }
        setMails(prevMails => prevMails.map(m => m.id === updatedMail.id ? updatedMail : m))
        mailService.save(updatedMail)
    }

    function onRemoveMail(mail) {
        if (mail.removedAt) {
            mailService.remove(mail.id)
                .then(() => {
                    setMails(prevMails => prevMails.filter(m => m.id !== mail.id))
                })

        } else {
            const updatedMail = { ...mail, removedAt: Date.now() }
            setMails(prevMails => prevMails.filter(m => m.id !== mail.id))
            mailService.save(updatedMail).catch(err => console.error('Failed to trash mail:', err))

        }
    }


    if (!mails)
        return (
            <div className="loader">
                <img src="./assets/css/img/loader.svg" alt="A loader." />
            </div>
        )


    return (
        <div className="mail-index">
            <React.Fragment>
                <MailFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />

                <MailList mails={mails} onToggleStar={onToggleStar} onToggleRead={onToggleRead} onRemoveMail={onRemoveMail} />

                <MailFolderList filterByStatus={filterBy.status} onSetStatus={onSetStatus}
                    onOpenCompose={onOpenCompose} />

                <MailCompose isComposeOpen={isComposeOpen} onCloseCompose={onCloseCompose} />

            </React.Fragment>
        </div>
    )
}