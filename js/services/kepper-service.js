import utiles from './utiles-service.js'


var KeeperApp_Key = 'KeeperApp_Key'
var notes = [
    {
        id:utiles.makeid(),
        type: 'text',
        text: 'We learn JS',
        size: 25,
        color: 'blue',
        background: 'grey',



    },
    {
        id:utiles.makeid(),
        type: 'image',
        text: 'We want an explanation!',
        size: 35,
        color: 'grey',
        background: 'black',
    },
    {
        id:utiles.makeid(),
        type: 'image',
        text: 'We want an seess!',
        size: 25,
        color: 'orange',
        background: 'white',
    },

]

function addNote(note){
    query()
    .then(StorageNotes =>{
        StorageNotes.push(note)
        utiles.saveToStorage(KeeperApp_Key,notes)
    })
    
}
function getEmptyNote(){
    var emptyNote={
        id:utiles.makeid(),
        type: '',
        text: '',
        size: 25,
        color: 'black',
        background: 'white',
    }
    return Promise.resolve(emptyNote);
}
function query() {
    if (utiles.loadFromStorage(KeeperApp_Key)) notes = utiles.loadFromStorage(KeeperApp_Key)
    return Promise.resolve(notes);
}


export default {
    query,
    getEmptyNote,
    addNote,

}
