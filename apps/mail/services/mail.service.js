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
    save,
    getEmptyMail,
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

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail.createdAt = Date.now()
        mail.sentAt = Date.now()
        mail.isRead = true
        return storageService.post(MAIL_KEY, mail)
    }
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
                createdAt: 1557829740000,
                subject: 'YouTube - Connect to our new features',
                body: 'We\'ve added new tools to help you grow your channel. Check out the updated Studio dashboard and analytics.',
                isRead: false,
                isStared: false,
                sentAt: 1557829745900,
                removedAt: null,
                from: 'Youtube',
                to: loggedinUser.email
            },
            { id: 'm101', createdAt: 1561729080000, subject: 'GitHub - Your API key is not safe! Click to rotate it', body: 'We detected your API key exposed in a public repository. Please rotate it immediately.', isRead: false, isStared: false, sentAt: 1561729085900, removedAt: null, from: 'GitHub', to: loggedinUser.email },
            { id: 'm102', createdAt: 1562686800000, subject: 'Spotify - Your 2024 Wrapped is ready 🎧', body: 'You listened to 42,318 minutes this year. See your top artists, genres, and your most replayed song.', isRead: false, isStared: true, sentAt: 1562686805900, removedAt: null, from: 'Spotify', to: loggedinUser.email },
            { id: 'm103', createdAt: 1573244280000, subject: 'Netflix - New releases picked for you', body: 'Season 2 just dropped. Also new this week: three thrillers and a documentary we think you\'ll love.', isRead: true, isStared: false, sentAt: 1573244285900, removedAt: null, from: 'Netflix', to: loggedinUser.email },
            { id: 'm104', createdAt: 1573422000000, subject: 'Zara - New arrivals just dropped 🛍️', body: 'The new fall collection is here. Shop coats, knitwear, and accessories before they sell out.', isRead: false, isStared: false, sentAt: 1573422005900, removedAt: null, from: 'Zara', to: loggedinUser.email },
            { id: 'm105', createdAt: 1586113560000, subject: 'ASOS - 25% off everything, tonight only', body: 'Last chance! Use code SAVE25 at checkout. Ends midnight.', isRead: false, isStared: false, sentAt: 1586113565900, removedAt: 1551200080000, from: 'ASOS', to: loggedinUser.email },
            { id: 'm106', createdAt: 1591262640000, subject: 'LinkedIn - Get a job today! I just found a match for you', body: 'A recruiter viewed your profile. See 12 new job matches based on your recent activity.', isRead: false, isStared: false, sentAt: 1591262645900, removedAt: null, from: 'LinkedIn', to: loggedinUser.email },
            { id: 'm107', createdAt: 1603458780000, subject: 'Google - New Updates', body: 'Add your recovery phone number to keep your account extra secure. It only takes a minute.', isRead: false, isStared: false, sentAt: 1603458785900, removedAt: null, from: 'Google', to: loggedinUser.email },
            { id: 'm108', createdAt: 1604951940000, subject: 'PayPal - You sent a payment of ₪120.00', body: 'Your payment to Urban Threads has been completed successfully.', isRead: true, isStared: false, sentAt: 1604951945900, removedAt: null, from: 'PayPal', to: loggedinUser.email },
            { id: 'm109', createdAt: 1605131340000, subject: 'Wolt - Your order is on the way! 🛵', body: 'Your courier Danny is 8 minutes away. Track your delivery live on the map.', isRead: false, isStared: false, sentAt: 1605131345900, removedAt: null, from: 'Wolt', to: loggedinUser.email },
            { id: 'm110', createdAt: 1608308160000, subject: 'Booking.com - Your trip to Athens is confirmed ✈️', body: 'Your reservation at Hotel Grande Bretagne is confirmed for March 14–17. Free cancellation until March 10.', isRead: true, isStared: true, sentAt: 1608308165900, removedAt: null, from: 'Booking.com', to: loggedinUser.email },
            { id: 'm111', createdAt: 1611502440000, subject: 'Wizz Air - Say YES to a discount ✈️', body: 'Your friends, family and dreams are awaiting! 30% off all flights, today only.', isRead: false, isStared: false, sentAt: 1611502445900, removedAt: 1551200140000, from: 'Wizz Air', to: loggedinUser.email },
            { id: 'm112', createdAt: 1611605400000, subject: 'Duolingo - Your streak is about to end! 🔥', body: 'You haven\'t practiced today. Don\'t lose your 47-day streak, it only takes 5 minutes.', isRead: false, isStared: false, sentAt: 1611605405900, removedAt: null, from: 'Duolingo', to: loggedinUser.email },
            { id: 'm113', createdAt: 1632565920000, subject: 'Steam - Summer Sale starts now 🎮', body: 'Thousands of titles up to 80% off. Your wishlist has 6 items on sale right now.', isRead: false, isStared: true, sentAt: 1632565925900, removedAt: null, from: 'Steam', to: loggedinUser.email },
            { id: 'm114', createdAt: 1633633440000, subject: 'Discord - You have unread messages in #general', body: '3 new messages from your server "Coding Academy Sprint 3" while you were away.', isRead: true, isStared: false, sentAt: 1633633445900, removedAt: null, from: 'Discord', to: loggedinUser.email },
            { id: 'm115', createdAt: 1637448900000, subject: 'Nike - Your order has shipped 📦', body: 'Your Air Max 90s are on the way! Estimated delivery: Thursday.', isRead: true, isStared: false, sentAt: 1637448905900, removedAt: null, from: 'Nike', to: loggedinUser.email },
            { id: 'm116', createdAt: 1641028380000, subject: 'Uber - Your trip receipt', body: 'Thanks for riding with us! Trip total: ₪34.50. Rate your driver in the app.', isRead: true, isStared: false, sentAt: 1641028385900, removedAt: null, from: 'Uber', to: loggedinUser.email },
            { id: 'm117', createdAt: 1653161700000, subject: 'Airbnb - Your reservation is confirmed', body: 'Your stay at "Cozy Loft near Rothschild" is booked for April 2–5. Check-in instructions attached.', isRead: false, isStared: true, sentAt: 1653161705900, removedAt: null, from: 'Airbnb', to: loggedinUser.email },
            { id: 'm118', createdAt: 1654684320000, subject: 'Coursera - Continue where you left off', body: 'You\'re 68% through "Machine Learning Specialization". Pick up where you stopped in Week 4.', isRead: false, isStared: false, sentAt: 1654684325900, removedAt: null, from: 'Coursera', to: loggedinUser.email },
            { id: 'm119', createdAt: 1658331180000, subject: 'Twitch - StarCityGamer just went live!', body: 'Your favorite streamer is live now playing Elden Ring. 2.4k viewers watching.', isRead: false, isStared: false, sentAt: 1658331185900, removedAt: null, from: 'Twitch', to: loggedinUser.email },
            { id: 'm120', createdAt: 1682275440000, subject: 'Amazon - Your package was delivered', body: 'Your package was left at your front door at 2:14 PM. Was everything okay with your delivery?', isRead: true, isStared: false, sentAt: 1682275445900, removedAt: null, from: 'Amazon', to: loggedinUser.email },
            { id: 'm121', createdAt: 1685038860000, subject: 'H&M - Weekend flash sale, 30% off', body: 'This weekend only. New drops in menswear, womenswear, and home. Free returns always.', isRead: false, isStared: false, sentAt: 1685038865900, removedAt: 1551200220000, from: 'H&M', to: loggedinUser.email },
            { id: 'm122', createdAt: 1688830620000, subject: 'Slack - You were mentioned in #dev-team', body: 'Maya mentioned you: "@Or can you take a look at the PR when you get a chance?"', isRead: false, isStared: false, sentAt: 1688830625900, removedAt: null, from: 'Slack', to: loggedinUser.email },
            { id: 'm123', createdAt: 1702031340000, subject: 'Wine.com - Meet your new favorite bottle 🍷', body: 'Based on your taste, we picked a bold Cabernet from Napa Valley. 15% off your first case.', isRead: false, isStared: false, sentAt: 1702031345900, removedAt: null, from: 'Wine.com', to: loggedinUser.email },
            { id: 'm124', createdAt: 1723589880000, subject: 'MongoDB - Join us for our Intro to Atlas Search webinar', body: 'We\'ll cover different data types, index strategies, and query performance. Nov 16th, 4pm.', isRead: false, isStared: false, sentAt: 1723589885900, removedAt: null, from: 'MongoDB', to: loggedinUser.email },
            { id: 'm125', createdAt: 1728945420000, subject: 'Miss you already 😢', body: 'It\'s been way too long since we last caught up. Coffee this weekend? Found a great little place near the old apartment.', isRead: true, isStared: true, sentAt: 1728945425900, removedAt: null, from: 'Noa Levi', to: loggedinUser.email },
            { id: 'm126', createdAt: 1733338560000, subject: 'Welcome to the team, Or! 🎉', body: 'We\'re thrilled to have you join us! Your laptop will be ready at reception on your first day.', isRead: true, isStared: false, sentAt: 1733338565900, removedAt: null, from: 'TechFlow HR', to: loggedinUser.email },
            { id: 'm127', createdAt: 1734514620000, subject: 'Draft: Project status update for stakeholders', body: 'Hi team, wanted to share where we\'re at with the Q3 roadmap. So far we\'ve completed the auth rewrite...', isRead: false, isStared: false, sentAt: null, removedAt: null, from: loggedinUser.email, to: 'stakeholders@techflow.io' },
            { id: 'm128', createdAt: 1738779000000, subject: 'Re: Can you review the PR when you get a sec?', body: 'Just pushed the fix for the sidebar bug you flagged. Let me know if the approach makes sense.', isRead: true, isStared: true, sentAt: 1738779005900, removedAt: null, from: loggedinUser.email, to: 'maya.dev@techflow.io' },
            { id: 'm129', createdAt: 1749216120000, subject: 'You\'re invited! 🎈 Ronit\'s 30th', body: 'Come celebrate with us! Saturday the 14th, 8pm, rooftop bar downtown. Bring your dancing shoes!', isRead: false, isStared: false, sentAt: 1749216125900, removedAt: null, from: 'Ronit Bar', to: loggedinUser.email },
            { id: 'm130', createdAt: 1749816240000, subject: 'Adidas - Your favorites are back in stock', body: 'The Samba OG in your size just came back. Don\'t wait, they sell out fast.', isRead: false, isStared: false, sentAt: 1749816245900, removedAt: null, from: 'Adidas', to: loggedinUser.email },
            { id: 'm131', createdAt: 1763139840000, subject: 'Dropbox - Yaron and 3 others made changes', body: 'Follow specific folders to get focused updates. Reported changes include 5 new files and 2 edits.', isRead: false, isStared: false, sentAt: 1763139845900, removedAt: null, from: 'Dropbox', to: loggedinUser.email },
            { id: 'm132', createdAt: 1767906120000, subject: 'eBay - You won! "Vintage Leather Jacket - Size M"', body: 'Congratulations! Your winning bid of ₪210 was successful. Complete payment within 48 hours.', isRead: true, isStared: false, sentAt: 1767906125900, removedAt: null, from: 'eBay', to: loggedinUser.email },
            { id: 'm133', createdAt: 1769294760000, subject: 'Instagram - Someone you may know just joined', body: 'Danny Cohen joined Instagram. Follow them to see their photos and videos.', isRead: false, isStared: false, sentAt: 1769294765900, removedAt: null, from: 'Instagram', to: loggedinUser.email },
            { id: 'm134', createdAt: 1769973420000, subject: 'Ten Bis - You have ₪38 left this month', body: 'Don\'t forget to use your remaining balance before the 1st. Browse restaurants near you.', isRead: false, isStared: false, sentAt: 1769973425900, removedAt: null, from: 'Ten Bis', to: loggedinUser.email },
            { id: 'm135', createdAt: 1770975300000, subject: 'Bank Hapoalim - Your monthly statement is ready', body: 'Your account statement for last month is now available in the app. No action needed.', isRead: true, isStared: false, sentAt: 1770975305900, removedAt: null, from: 'Bank Hapoalim', to: loggedinUser.email },
            { id: 'm136', createdAt: 1771611000000, subject: 'IKEA - Your favorites are on sale', body: 'Selected furniture and home decor up to 20% off this week. Members get free delivery.', isRead: false, isStared: false, sentAt: 1771611005900, removedAt: 1551200290000, from: 'IKEA', to: loggedinUser.email },
            { id: 'm137', createdAt: 1772279700000, subject: 'Waze - Traffic alert on your usual route', body: 'Heavy traffic reported on Ayalon Highway. We found you a faster route, 12 minutes saved.', isRead: false, isStared: false, sentAt: 1772279705900, removedAt: null, from: 'Waze', to: loggedinUser.email },
            { id: 'm138', createdAt: 1776445260000, subject: 'Figma - Yotam shared a file with you', body: 'Appsus Final Designs was shared with you. Click to view and leave comments.', isRead: false, isStared: true, sentAt: 1776445265900, removedAt: null, from: 'Figma', to: loggedinUser.email },
            { id: 'm139', createdAt: 1779138000000, subject: 'Re: Dinner this Thursday?', body: 'Yes! 8pm works great for me. Should we try that new sushi place or stick to the usual?', isRead: true, isStared: false, sentAt: 1779138005900, removedAt: null, from: 'Tomer Azoulay', to: loggedinUser.email },
            { id: 'm140', createdAt: 1783771740000, subject: 'Holmes Place - Your membership renews in 5 days', body: 'Your monthly membership will renew automatically on the 20th. Manage your plan anytime in the app.', isRead: true, isStared: false, sentAt: 1783771745900, removedAt: null, from: 'Holmes Place', to: loggedinUser.email },
            { id: 'm141', createdAt: 1785787380000, subject: 'Vercel - Your deployment is live', body: 'appsus-sprint3.vercel.app was successfully deployed. Build completed in 42 seconds.', isRead: false, isStared: false, sentAt: 1785787385900, removedAt: null, from: 'Vercel', to: loggedinUser.email },
            { id: 'm142', createdAt: 1785931680000, subject: 'Re: Are you free for a quick call?', body: 'Sure, I have 15 minutes around 3pm. Does that work? We can go over the API changes.', isRead: false, isStared: false, sentAt: 1785931685900, removedAt: null, from: loggedinUser.email, to: 'maya.dev@techflow.io' }
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

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        isStared: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        to: ''
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