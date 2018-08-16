import utiles from './utiles-service.js'

var KeeperApp_Key = 'KeeperApp_Key';
var notes = utiles.loadFromStorage(KeeperApp_Key) || [
    {
        id: 'RXmfE',
        type: 'text',
        text: 'We learn JS',
        size: 45,
        color: 'blue',
        background: 'grey',
        img: '',
        todos: [
            { id: utiles.makeid(), text: '', done: false },
        ],
    },
    {
        id: 'DXwfE',
        type: 'image',
        text: 'We want an explanation!',
        size: 35,
        color: 'grey',
        background: 'black',
        img: '../../../img/img1.png',
        todos: [
            { id: utiles.makeid(), text: '', done: false },
        ],
    },
    {
        id: 'JqwfP',
        type: 'image',
        text: 'We want an seess!',
        size: 15,
        color: 'orange',
        background: 'white',
        img: '../../../img/img0.png',
        todos: [
            { id: utiles.makeid(), text: '', done: false },
        ],
    },
    {
        id: 'sqjfD',
        type: 'todo',
        text: '',
        size: 15,
        color: '',
        background: '',
        img: '',
        todos: [
            { id: utiles.makeid(), text: 'go to the beach', done: false },
            { id: utiles.makeid(), text: 'play tenis', done: true },
        ],
    },

]

function addNote(note, img) {
    query()
        .then(StorageNotes => {
            if (img) note.image = img;
            StorageNotes.push(note);
            utiles.saveToStorage(KeeperApp_Key, notes);
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
        img: '',
        todos: [
            { id: utiles.makeid(), text: '', done: false },
        ],
    }
    return Promise.resolve(emptyNote);
}

function getEmptyTodo() {
    return { id: utiles.makeid(), text: '', done: false };
}

function query() {
    return Promise.resolve(notes);
}

function getNoteById(noteId) {
    var note = notes.find(currNote => currNote.id === noteId)
    return note ? note : null;
}

function saveEditNote(editedNote) {
    query()
        .then(notes => {
            notes.forEach((note, idx) => {
                if (editedNote.id === note.id) {
                    notes[idx] = editedNote;
                    utiles.saveToStorage(KeeperApp_Key, notes);
                }
            });
        })
}

function sendToTop(currNote, notes) {
    var editedNoteIdx;
    notes.forEach((note, idx) => {
        if (currNote.id === note.id) editedNoteIdx = idx;
    });
    notes.unshift(currNote);
    notes.splice(editedNoteIdx + 1, 1);
    utiles.saveToStorage(KeeperApp_Key, notes);
}

export default {
    query,
    getEmptyNote,
    addNote,
    getNoteById,
    saveEditNote,
    sendToTop,
    getEmptyTodo

}
