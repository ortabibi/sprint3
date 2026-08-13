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
    get,
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

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail = _setNextPrevMailId(mail)
            return mail
        })
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)

    if (!mails || !mails.length) {

        mails = [
            {
                id: 'm100',
                createdAt: 1551133930500,
                subject: 'YouTube - Connect to our new features',
                body: 'We\'ve added new tools to help you grow your channel. Check out the updated Studio dashboard and analytics.',
                isRead: false,
                isStared: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'no-reply@youtube.com',
                to: loggedinUser.email
            },
            {
                id: 'm101',
                createdAt: 1551133940500,
                subject: 'GitHub - Your API key is not safe! Click to rotate it',
                body: 'We detected your API key exposed in a public repository. Please rotate it immediately to keep your account secure.',
                isRead: false,
                isStared: false,
                sentAt: 1551133940594,
                removedAt: null,
                from: 'security@github.com',
                to: loggedinUser.email
            },
            {
                id: 'm102',
                createdAt: 1551133950500,
                subject: 'Apple Music - The best music for your workout',
                body: 'New playlists curated just for you. Push harder with our High Intensity mix, now updated weekly.',
                isRead: true,
                isStared: false,
                sentAt: 1551133950594,
                removedAt: null,
                from: 'noreply@music.apple.com',
                to: loggedinUser.email
            },
            {
                id: 'm103',
                createdAt: 1551133960500,
                subject: 'Coding Academy - Come learn with us this semester',
                body: 'New cohorts starting soon! Full-stack, data science, and UX design tracks all open for registration.',
                isRead: false,
                isStared: false,
                sentAt: 1551133960594,
                removedAt: null,
                from: 'info@codingacademy.co.il',
                to: loggedinUser.email
            },
            {
                id: 'm104',
                createdAt: 1551133970500,
                subject: 'Tel Aviv Port - Best weather and beach events this weekend',
                body: 'Sunny skies ahead! Join us for live music, food trucks, and sunset yoga at the port this Saturday.',
                isRead: false,
                isStared: false,
                sentAt: 1551133970594,
                removedAt: null,
                from: 'events@telavivport.co.il',
                to: loggedinUser.email
            },
            {
                id: 'm105',
                createdAt: 1551133980500,
                subject: 'LinkedIn - Get a job today! I just found a match for you',
                body: 'A recruiter viewed your profile. See 12 new job matches based on your recent activity.',
                isRead: false,
                isStared: false,
                sentAt: 1551133980594,
                removedAt: null,
                from: 'jobs-noreply@linkedin.com',
                to: loggedinUser.email
            },
            {
                id: 'm106',
                createdAt: 1551133990500,
                subject: 'Google - New Updates',
                body: 'Add your recovery phone number to keep your account extra secure. It only takes a minute.',
                isRead: false,
                isStared: false,
                sentAt: 1551133990594,
                removedAt: null,
                from: 'no-reply@accounts.google.com',
                to: loggedinUser.email
            },
            {
                id: 'm107',
                createdAt: 1551134000500,
                subject: 'Norton - Anti-Virus',
                body: 'DO NOT RENEW without checking our latest discount. Save 60% on your annual subscription today.',
                isRead: false,
                isStared: false,
                sentAt: 1551134000594,
                removedAt: null,
                from: 'offers@norton.com',
                to: loggedinUser.email
            },
            {
                id: 'm108',
                createdAt: 1551134010500,
                subject: 'LinkedIn - New jobs for you!',
                body: 'Based on your profile, we found 8 new opportunities that match your skills and experience.',
                isRead: false,
                isStared: false,
                sentAt: 1551134010594,
                removedAt: null,
                from: 'jobs-noreply@linkedin.com',
                to: loggedinUser.email
            },
            {
                id: 'm109',
                createdAt: 1551134020500,
                subject: 'YouTube - Check out new videos from channels you follow',
                body: 'Your subscriptions uploaded 14 new videos this week. Catch up before they leave your feed.',
                isRead: false,
                isStared: false,
                sentAt: 1551134020594,
                removedAt: null,
                from: 'no-reply@youtube.com',
                to: loggedinUser.email
            },
            {
                id: 'm110',
                createdAt: 1551134030500,
                subject: 'Netflix - New releases picked for you',
                body: 'Season 2 just dropped. Also new this week: three thrillers and a documentary we think you\'ll love.',
                isRead: true,
                isStared: true,
                sentAt: 1551134030594,
                removedAt: null,
                from: 'info@netflix.com',
                to: loggedinUser.email
            },
            {
                id: 'm111',
                createdAt: 1551134040500,
                subject: 'Spotify - Your 2024 Wrapped is ready 🎧',
                body: 'You listened to 42,318 minutes this year. See your top artists, genres, and the song you couldn\'t stop replaying.',
                isRead: false,
                isStared: true,
                sentAt: 1551134040594,
                removedAt: null,
                from: 'no-reply@spotify.com',
                to: loggedinUser.email
            },
            {
                id: 'm112',
                createdAt: 1551134050500,
                subject: 'PayPal - You sent a payment of ₪120.00',
                body: 'Your payment to Urban Threads has been completed. This transaction may take a few minutes to appear in your account.',
                isRead: true,
                isStared: false,
                sentAt: 1551134050594,
                removedAt: null,
                from: 'service@paypal.com',
                to: loggedinUser.email
            },
            {
                id: 'm113',
                createdAt: 1551134060500,
                subject: 'Wizz Air - Say YES to a discount ✈️',
                body: 'Your friends, family and dreams are awaiting! 30% off all flights, today only. Book now.',
                isRead: false,
                isStared: false,
                sentAt: 1551134060594,
                removedAt: 1551200060000,
                from: 'noreply@wizzair.com',
                to: loggedinUser.email
            },
            {
                id: 'm114',
                createdAt: 1551134070500,
                subject: 'Welcome to the team, Or! 🎉',
                body: 'We\'re thrilled to have you join us! Your laptop will be ready at reception on your first day.',
                isRead: true,
                isStared: false,
                sentAt: 1551134070594,
                removedAt: null,
                from: 'hr@techflow.io',
                to: loggedinUser.email
            },
            {
                id: 'm115',
                createdAt: 1551134080500,
                subject: 'Draft: Project status update for stakeholders',
                body: 'Hi team, wanted to share where we\'re at with the Q3 roadmap. So far we\'ve completed the auth rewrite...',
                isRead: false,
                isStared: false,
                sentAt: null,
                removedAt: null,
                from: loggedinUser.email,
                to: 'stakeholders@techflow.io'
            },
            {
                id: 'm116',
                createdAt: 1551134090500,
                subject: 'Re: Can you review the PR when you get a sec?',
                body: 'Just pushed the fix for the sidebar bug you flagged. Let me know if the approach makes sense.',
                isRead: true,
                isStared: true,
                sentAt: 1551134090594,
                removedAt: null,
                from: loggedinUser.email,
                to: 'maya.dev@techflow.io'
            },
            {
                id: 'm117',
                createdAt: 1551134100500,
                subject: 'Dropbox - Yaron and 3 others made changes',
                body: 'Follow specific folders to get focused updates. Reported changes include 5 new files and 2 edits.',
                isRead: false,
                isStared: false,
                sentAt: 1551134100594,
                removedAt: null,
                from: 'no-reply@dropbox.com',
                to: loggedinUser.email
            },
            {
                id: 'm118',
                createdAt: 1551134110500,
                subject: 'AliExpress - Top brands, top deals today',
                body: 'Cure your cravings with up to 15% off. Find affordable treats with Uber Eats. Terms and fees apply.',
                isRead: true,
                isStared: false,
                sentAt: 1551134110594,
                removedAt: 1551200110000,
                from: 'promo@aliexpress.com',
                to: loggedinUser.email
            },
            {
                id: 'm119',
                createdAt: 1551134120500,
                subject: 'You\'re invited! 🎈 Ronit\'s 30th',
                body: 'Come celebrate with us! Saturday the 14th, 8pm, rooftop bar downtown. Bring your dancing shoes!',
                isRead: false,
                isStared: false,
                sentAt: 1551134120594,
                removedAt: null,
                from: 'ronit.b@gmail.com',
                to: loggedinUser.email
            },
            {
                id: 'm120',
                createdAt: 1551134130500,
                subject: 'CodeSandbox - The fastest way to get feedback',
                body: 'Quick, quality feedback is one of the key ingredients of top-performing teams. See how CodeSandbox helps.',
                isRead: true,
                isStared: true,
                sentAt: 1551134130594,
                removedAt: null,
                from: 'hello@codesandbox.io',
                to: loggedinUser.email
            },
            {
                id: 'm121',
                createdAt: 1551134140500,
                subject: 'Miss you already 😢',
                body: 'It\'s been way too long since we last caught up. Coffee this weekend? Found a great little place near the old apartment.',
                isRead: true,
                isStared: true,
                sentAt: 1551134140594,
                removedAt: null,
                from: 'noa.levi@gmail.com',
                to: loggedinUser.email
            },
            {
                id: 'm122',
                createdAt: 1551134150500,
                subject: 'MongoDB - Join us for our Intro to Atlas Search webinar',
                body: 'We\'ll search through different data types, index strategies, and query performance tips. Nov 16th, 4pm.',
                isRead: false,
                isStared: false,
                sentAt: 1551134150594,
                removedAt: null,
                from: 'events@mongodb.com',
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