import utiles from './utiles-service.js'


var KeeperApp_Key = 'KeeperApp_Key'
var notes = [
    {
        id:utiles.makeid(),
        type: 'text',
        text: 'We learn JS',
        size: 25,
        color: 'blue',


    },
    {
        id:utiles.makeid(),
        type: 'image',
        text: 'We want an explanation!',
        size: 25,
        color: 'blue'
    },
    {
        id:utiles.makeid(),
        type: 'image',
        text: 'We want an seess!',
        size: 25,
        color: 'blue'
    },

]
function emptyNote(){
    var emptyNote={
        id:utiles.makeid(),
        type: '',
        text: '',
        size: 25,
        color: 'black',
    }
}
function query() {
    if (utiles.loadFromStorage(KeeperApp_Key)) notes = utiles.loadFromStorage(KeeperApp_Key)
    return notes;
}

function getNotesByType(type) {
    if (!type) return
    var notes = query()
    var notesOfType;
    notesOfType = notes.filter(note => {
        return note.type === type

    })

        
    console.log('notesOfType',type,notesOfType)

return notesOfType

}

export default {
    query,
    getNotesByType

}
