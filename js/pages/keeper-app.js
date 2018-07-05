
import utiles from '../services/utiles-service.js'
import service from '../services//kepper-service.js'
import noteText from '../cmps/keeper-app-cmps/note-text-cmp.js'
import noteImage from '../cmps/keeper-app-cmps/note-image-cmp.js'


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

     <div v-for="note in notes">
        <component :is="'note-'+note.type" :note="note">
        </component>
     </div>

    </section>
   
    `,
    created(){
     this.notes=service.query()

    },
    components:{
        utiles,
        noteText,
        noteImage,
        service,
        
    },
    methods:{
        getCommponentByType(){
            return 'note-text'
        }
    }
}