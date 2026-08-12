import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    // get,
    // remove,
    // save,
    // getEmptyCar,
    getDefaultFilter,
    getFilterFromSearchParams,
}


function query(filterBy = {}) {
    console.log(filterBy);

    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.status === 'inbox') {
                mails = mails.filter(mail => !mail.removedAt && mail.to === loggedinUser.email)
            }
            if (filterBy.status === 'starred') {
                mails = mails.filter(mail => mail.isStared && !mail.removedAt)
            }
            if (filterBy.status === 'sent') {
                mails = mails.filter(mail => mail.from === loggedinUser.email && !mail.removedAt)

            }
            if (filterBy.status === 'drafts') {
                mails = mails.filter(mail => !mail.sentAt)

            }
            if (filterBy.status === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            }

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.from) || regExp.test(mail.subject) || regExp.test(mail.body))
            }
            if (filterBy.isRead !== undefined && filterBy.isRead !== '') {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }

            return mails
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)

    if (!mails || !mails.length) {

        mails = [
            {
                id: 'm100',
                createdAt: 1551133930500,
                subject: 'Miss you!',
                body: '',
                isRead: true,
                isStared: true,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'sender0@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm101',
                createdAt: 1551133940500,
                subject: 'Meeting tomorrow',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: 1551133940594,
                removedAt: null,
                from: 'sender1@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm102',
                createdAt: 1551133950500,
                subject: 'Weekly newsletter',
                body: '',
                isRead: true,
                isStared: false,
                sentAt: 1551133950594,
                removedAt: null,
                from: 'sender2@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm103',
                createdAt: 1551133960500,
                subject: 'Your invoice',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: 1551133960594,
                removedAt: 1551200003000,
                from: 'sender3@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm104',
                createdAt: 1551133970500,
                subject: 'Happy Birthday!',
                body: '',
                isRead: true,
                isStared: true,
                sentAt: 1551133970594,
                removedAt: null,
                from: 'sender4@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm105',
                createdAt: 1551133980500,
                subject: 'Reminder',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: 1551133980594,
                removedAt: null,
                from: loggedinUser.email,
                to: 'someone5@example.com'
            },
            {
                id: 'm106',
                createdAt: 1551133990500,
                subject: 'New login detected',
                body: '',
                isRead: true,
                isStared: false,
                sentAt: 1551133990594,
                removedAt: null,
                from: 'sender6@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm107',
                createdAt: 1551134000500,
                subject: 'Update available',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: 1551134000594,
                removedAt: null,
                from: 'sender7@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm108',
                createdAt: 1551134010500,
                subject: 'Thanks!',
                body: '',
                isRead: true,
                isStared: true,
                sentAt: 1551134010594,
                removedAt: null,
                from: 'sender8@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm109',
                createdAt: 1551134020500,
                subject: 'Question about order',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: 1551134020594,
                removedAt: 1551200009000,
                from: 'sender9@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm110',
                createdAt: 1551134030500,
                subject: 'Team sync',
                body: '',
                isRead: true,
                isStared: false,
                sentAt: 1551134030594,
                removedAt: null,
                from: 'sender10@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm111',
                createdAt: 1551134040500,
                subject: 'Discount inside',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: 1551134040594,
                removedAt: null,
                from: 'sender11@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm112',
                createdAt: 1551134050500,
                subject: 'Your receipt',
                body: '',
                isRead: true,
                isStared: true,
                sentAt: 1551134050594,
                removedAt: null,
                from: loggedinUser.email,
                to: 'someone12@example.com'
            },
            {
                id: 'm113',
                createdAt: 1551134060500,
                subject: 'Please review',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: 1551134060594,
                removedAt: null,
                from: 'sender13@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm114',
                createdAt: 1551134070500,
                subject: 'Welcome aboard',
                body: '',
                isRead: true,
                isStared: false,
                sentAt: 1551134070594,
                removedAt: null,
                from: 'sender14@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm115',
                createdAt: 1551134080500,
                subject: 'Project status',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: null,
                removedAt: null,
                from: 'sender15@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm116',
                createdAt: 1551134090500,
                subject: 'Quick question',
                body: '',
                isRead: true,
                isStared: true,
                sentAt: 1551134090594,
                removedAt: null,
                from: 'sender16@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm117',
                createdAt: 1551134100500,
                subject: 'FYI',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: 1551134100594,
                removedAt: null,
                from: 'sender17@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm118',
                createdAt: 1551134110500,
                subject: 'Follow up',
                body: '',
                isRead: true,
                isStared: false,
                sentAt: 1551134110594,
                removedAt: null,
                from: loggedinUser.email,
                to: 'someone18@example.com'
            },
            {
                id: 'm119',
                createdAt: 1551134120500,
                subject: 'Party invite',
                body: '',
                isRead: false,
                isStared: false,
                sentAt: 1551134120594,
                removedAt: null,
                from: 'sender19@example.com',
                to: loggedinUser.email
            },
            {
                id: 'm120',
                createdAt: 1551134130500,
                subject: 'Old draft',
                body: '',
                isRead: true,
                isStared: true,
                sentAt: 1551134130594,
                removedAt: null,
                from: 'sender20@example.com',
                to: loggedinUser.email
            }
        ]
        
        utilService.saveToStorage(MAIL_KEY, mails)

    }
    console.log('mails', mails)
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}

    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function getDefaultFilter() {
    return {
        status: '',
        txt: '',
        isRead: '',
        isStared: '',
        lables: []
    }
}

// function query(filterBy = {}) {
//     return storageService.query(MAIL_KEY)
//         .then(mails => {
//             if (filterBy.status === 'trash') {
//                 mails = mails.filter(mail => !!mail.removedAt)
//             } else if (filterBy.status === 'draft') {
//                 mails = mails.filter(mail => !mail.sentAt)
//             } else if (filterBy.status === 'inbox' || filterBy.status === 'sent' || !filterBy.status) {
//                 mails = mails.filter(mail => !mail.removedAt)
//             }

//             if (filterBy.txt) {
//                 const regExp = new RegExp(filterBy.txt, 'i')
//                 mails = mails.filter(mail => regExp.test(mail.from) || regExp.test(mail.subject))
//             }

//             if (filterBy.isRead !== undefined && filterBy.isRead !== '') {
//                 mails = mails.filter(mail => mail.isRead === filterBy.isRead)
//             }

//             return mails
//         })
// }