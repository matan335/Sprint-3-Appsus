
import utiles from '../services/utiles-service.js'
import service from '../services//kepper-service.js'
import noteText from '../cmps/keeper-app-cmps/note-text-cmp.js'
import noteImage from '../cmps/keeper-app-cmps/note-image-cmp.js'
import addNote from '../cmps/keeper-app-cmps/add-note-cmp.js'


export default {
    data(){
        return {
            KeeperApp_Key:'KeeperApp_Key',
            notes:[],
            
        }
    },
    methods: {

    },
    template: `
    <section class="keeper-app">
        <h2>welcome to keeper</h2>
        <add-note @render-new-note="renderNewNote"></add-note>

     <div v-for="note in notes">
        <component :is="'note-'+note.type" :note="note">
        </component>
     </div>

    </section>
   
    `,
    created(){
        service.query()
        .then(notes =>
            this.notes=notes
        )

    },
    components:{
        utiles,
        noteText,
        noteImage,
        service,
        addNote,
        
    },
    methods:{
        renderNewNote(newNote){
            this.notes.push(newNote)
        }

    }
}