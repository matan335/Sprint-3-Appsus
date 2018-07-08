import utiles from './utiles-service.js'


var KeeperApp_Key = 'KeeperApp_Key'
var notes = [
    {
        id: 'RXmfE',
        type: 'text',
        text: 'We learn JS',
        size: 45,
        color: 'blue',
        background: 'grey',
        img:'',
        todo:[
            {text:'',done:false},
        ],
    },
    {
        id: 'DXwfE',
        type: 'image',
        text: 'We want an explanation!',
        size: 35,
        color: 'grey',
        background: 'black',
        img:'../../../img/img1.png',
        todo:[
            {text:'',done:false},
        ],
    },
    {
        id: 'JqwfP',
        type: 'image',
        text: 'We want an seess!',
        size: 15,
        color: 'orange',
        background: 'white',
        img:'../../../img/img0.png',
        todo:[
            {text:'',done:false},
        ],
    },
    {
        id: 'sqjfD',
        type: 'todo',
        text: '',
        size: 15,
        color: '',
        background: '',
        img:'',
        todo:[
            {text:'go to the beach',done:false},
            {text:'play tenis',done:true},
        ],
    },

]

function addNote(note,img) {
    console.log(img)
    query()
        .then(StorageNotes => {
            if(img)note.image=img
            console.log(note)
            StorageNotes.push(note)
            utiles.saveToStorage(KeeperApp_Key, notes)
        })

}
function getEmptyNote() {
    var emptyNote = {
        id: utiles.makeid(),
        type: 'text',
        text: '',
        size: 15,
        color: 'black',
        background: 'white',
        img:'',
        todo:[
            {text:'',done:false},
        ],
    }
    return Promise.resolve(emptyNote);
}
function query() {
    if (utiles.loadFromStorage(KeeperApp_Key)) notes = utiles.loadFromStorage(KeeperApp_Key)
    return Promise.resolve(notes);
}
function getNoteById(noteId) {
    var note;
    if (utiles.loadFromStorage(KeeperApp_Key)) notes = utiles.loadFromStorage(KeeperApp_Key)
    note = notes.find(currNote => {
        return currNote.id === noteId
    })
    return note
}
function saveEditNote(editedNote) {
    query()
        .then(notes => {
            var editedNoteId;
            notes.forEach((note, idx) => {
                if (editedNote.id === note.id) editedNoteId = idx

            });

            notes[editedNoteId] = editedNote
            utiles.saveToStorage(KeeperApp_Key, notes)

        })
}
function sendToTop(currNote, notes) {
    var editedNoteIdx;
    notes.forEach((note, idx) => {
        if (currNote.id === note.id) editedNoteIdx = idx
    });
    notes.unshift(currNote)
    notes.splice(editedNoteIdx + 1, 1);
    utiles.saveToStorage(KeeperApp_Key, notes)
}

export default {
    query,
    getEmptyNote,
    addNote,
    getNoteById,
    saveEditNote,
    sendToTop

}
