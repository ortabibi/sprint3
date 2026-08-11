import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const MAIL_KEY = 'mailDB'
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
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.from) || regExp.test(mail.subject))
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

        mails = []
        for (let i = 0; i < 10; i++) {
            const mail = {
                id: utilService.makeId(),
                createdAt: 1551133930500,
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: Math.random() > 0.5,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }

            mails.push(mail)
        }
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