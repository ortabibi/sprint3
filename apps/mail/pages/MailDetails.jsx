const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [id])

    function loadMail() {
        mailService.get(id).then(setMail)
    }


    function onSetStatus(status) {
        setFilterBy(prev => ({ ...prev, status }))
        navigate(`/mail?status=${status}`)
    }

    if (!mail)
        return (
            <div className="loader">
                <img src="./assets/css/img/loader.svg" alt="A loader." />
            </div>
        )


    return <section className="mail-details-container">

        <MailFilter filterBy={filterBy} onSetFilterBy={setFilterBy} hideTabs={true} />
        <MailFolderList filterByStatus={filterBy.status} onSetStatus={onSetStatus} />

        <section className='mail-details'>
            <section className='tools-bar'>
                <div>
                    <Link to={`/mail`} ><span className="material-symbols-outlined">arrow_left_alt</span></Link>
                    <Link to={`/note`} ><span className="material-symbols-outlined">description</span></Link>
                </div>

                <section className='paging-btn-container'>
                    <Link to={`/mail/${mail.prevMailId}`} ><span className="material-symbols-outlined">chevron_left</span></Link>
                    <Link to={`/mail/${mail.nextMailId}`} ><span className="material-symbols-outlined">chevron_right</span></Link>
                </section>
            </section>
            <section className='mail-main'>
                <h1>{mail.subject}</h1>
                <div className='from-info'>
                    <img src="" alt="" />
                    <h4>{mail.from}</h4>
                </div>
                <p>{mail.body}</p>
            </section>
        </section>
    </section>
}