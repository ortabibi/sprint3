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
    // getDefaultFilter,
    // getSpeedStats,
    // getVendorStats,
    // getFilterFromSearchParams,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.vendor))
            }

            if (filterBy.minSpeed) {
                mails = mails.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
            }

            return mails
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)

    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    if (!mails || !mails.length) {

        mails = []
        for (let i = 0; i < 2; i++) {
            const mail = {
                id: utilService.makeId(),
                createdAt: 1551133930500,
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
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

