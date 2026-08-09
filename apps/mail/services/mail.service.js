import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const MAIL_KEY = 'mailDB'
// _createCars()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
    getSpeedStats,
    getVendorStats,
    getFilterFromSearchParams,
}

function query(filterBy = {}) {
    return storageService.query(CAR_KEY)
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
