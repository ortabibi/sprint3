// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    duplicate,
    getEmptyNote,
    getDefaultFilter,
    // getSpeedStats,
    // getVendorStats,
    getFilterFromSearchParams,
    trimObj: utilService.trimObj,
}
// For Debug (easy access from console):
// window.cs = noteService

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => {const txt = note.info.txt || ''
                     const title = note.info.title || ''
                    return regExp.test(txt) || regExp.test(title)
                })
            }
            if(filterBy.type){
                notes = notes.filter(note => note.type === filterBy.type )
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            note = _setNextPrevNoteId(note)
            return note
        })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}
function duplicate(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    .then(note => {
        const duplicateNote ={...note, createdAt: Date.now()}
        return storageService.post(NOTE_KEY, duplicateNote)
    }) 
}
function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}
function getEmptyNote(txt = '') {
    return {
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            txt
        }
    }
}

function getDefaultFilter(filterBy = { txt: '', type: '' }) {
    return { 
        txt: filterBy.txt || '', 
        type: filterBy.type || '' 
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}

    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

// function getSpeedStats() {
//     return storageService.query(NOTE_KEY)
//         .then(notes => {
//             const noteCountBySpeedMap = _getNoteCountBySpeedMap(notes)
//             const data = Object.keys(noteCountBySpeedMap).map(speedName => ({ title: speedName, value: noteCountBySpeedMap[speedName] }))
//             return data
//         })
// }

// function getVendorStats() {
//     return storageService.query(NOTE_KEY)
//         .then(notes => {
//             const noteCountByVendorMap = _getNoteCountByVendorMap(notes)
//             const data = Object.keys(noteCountByVendorMap)
//                 .map(vendor =>
//                 ({
//                     title: vendor,
//                     value: Math.round((noteCountByVendorMap[vendor] / notes.length) * 100)
//                 }))
//             return data
//         })
// }

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [ 
  { 
    id: 'n101', 
    createdAt: 1112222, 
    type: 'NoteTxt', 
    isPinned: true, 
    style: { 
      backgroundColor: '#00d' 
    }, 
    info: { 
      txt: 'Fullstack Me Baby!' 
    } 
  }, 
  { 
    id: 'n102', 
    createdAt: 1112223, 
    type: 'NoteImg', 
    isPinned: false, 
    style: { 
      backgroundColor: '#0d0' 
    }, 
    info: { 
      url: 'http://some-img/me', 
      title: 'Bobi and Me' 
    } 
  }, 
  { 
    id: 'n103', 
    createdAt: 1112224, 
    type: 'NoteTodos', 
    isPinned: false, 
    style: { 
      backgroundColor: '#d00' 
    }, 
    info: { 
      title: 'Get my stuff together', 
      todos: [ 
        { txt: 'Driving license', isDone: true }, 
        { txt: 'Coding power', isDone: false } 
      ] 
    } 
  } 
]     
utilService.saveToStorage(NOTE_KEY, notes)
        }

    } 
 

function _createNote(title, content) {
    const note = getEmptyNote(title, content)
    note.id = utilService.makeId()
    return note
}

function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}

// function _getNoteCountBySpeedMap(notes) {
//     const noteCountBySpeedMap = notes.reduce((map, note) => {
//         if (note.maxSpeed < 120) map.slow++
//         else if (note.maxSpeed < 200) map.normal++
//         else map.fast++
//         return map
//     }, { slow: 0, normal: 0, fast: 0 })
//     return noteCountBySpeedMap
// }

// function _getNoteCountByVendorMap(notes) {
//     const noteCountByVendorMap = notes.reduce((map, note) => {
//         if (!map[note.vendor]) map[note.vendor] = 0
//         map[note.vendor]++
//         return map
//     }, {})
//     return noteCountByVendorMap
// }