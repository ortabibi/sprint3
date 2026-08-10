
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { MailList } from '../cmps/MailList.jsx'


export function MailIndex() {
    console.log('MailIndex rendered')   // add this line

    const [mails, setMails] = useState(null)


    useEffect(() => {
        loadMails(mails)
    }, [])

    function loadMails() {
        mailService.query({}).then(setMails)
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
                {/* <CarFilter filterBy={filterBy} onSetFilterBy={setFilterBy} onClearFilter={onClearFilter} /> */}

                {/* <Link to="/car/edit">
                    <button>Add a Car</button>
                </Link> */}

                <MailList mails={mails} />
            </React.Fragment>
        </div>
    )
}