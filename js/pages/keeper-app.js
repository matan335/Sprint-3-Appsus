
import utiles from '../services/utiles-service.js'
import service from '../services/kepper-service.js'
import noteText from '../cmps/keeper-app-cmps/note-text-cmp.js'
import noteImage from '../cmps/keeper-app-cmps/note-image-cmp.js'
import addNote from '../cmps/keeper-app-cmps/add-note-cmp.js'
import filterNote from '../cmps/keeper-app-cmps/filter-note-cmp.js'


export default {
    template: `
    <section class="keeper-app">
        <h2>welcome to keeper</h2>
        <add-note @render-new-note="renderNewNote"></add-note>
        <filter-note @filtered="setFilter" ></filter-note>
        

    <div class="notes-display-container">
        <div v-for="note in notes">
            <component v-if="note" :is="'note-'+note.type" :filter="filter" 
                :note="note" :imgUrl="imgUrl" @edit-note="editNote" @note-to-top="sendToTop">
            </component>
        </div>
    </div>
    </section>
   
    `,
     data(){
        return {
            notes:[],
            filter: null,
            KeeperApp_Key:'KeeperApp_Key',
            imgUrl:null
        }
    },
    created(){
        this.showNotes()
    },
    methods:{
        showNotes(){
            service.query()
            .then(notes =>{
                if (!this.filter) this.notes=notes;
                else {
                    var res=notes.filter(note =>{
                        return note.text.toLowerCase().includes(this.filter.toLowerCase())
                    })
                    this.notes=res;
                }
            })
        },
        renderNewNote(newNote){
            this.notes.push(newNote)
        },
        editNote(note){
            this.$router.push(`keeper/${note.id}`)
        },
        setFilter(filter){
            this.filter=filter 
            console.log(filter)
            this.showNotes()       
        },
        sendToTop(note){
            service.query()
            .then(notes =>{
                service.sendToTop(note,notes)
                this.showNotes()

            })
        },
    },
    components:{
        utiles,
        noteText,
        noteImage,
        service,
        addNote,
        filterNote,
        
    },
}