
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { utilService } from '../services/util.service.js'

export function MailIndex() {
    const [mails, setMails] = useState(null)


    useEffect(() => {
        loadMails(mails)
    }, [mails])

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }




    return <section className="container">Mail appppp</section>
}