
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { useEffectUpdate } from '../../../custom-hooks/useEffectUpdate.js'
import { MailFolderList } from '../cmps/MailFolderList.jsx'



export function MailIndex() {
    const [mails, setMails] = useState(null)

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

                {/* <Link to="/car/edit">
                    <button>Add a Car</button>
                </Link> */}

                <MailList mails={mails} />

                <MailFolderList filterByStatus={filterBy.status} onSetStatus={onSetStatus} />

            </React.Fragment>
        </div>
    )
}