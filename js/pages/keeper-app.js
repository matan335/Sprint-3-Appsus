
import utiles from '../services/utiles-service.js'
import service from '../services//kepper-service.js'
import noteText from '../cmps/keeper-app-cmps/note-text-cmp.js'


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
        <note-text>
        </note-text>
    </section>
   
    `,
    created(){
        if(utiles.loadFromStorage(this.KeeperApp_Key)) this.notes=utiles.loadFromStorage(this.KeeperApp_Key)
        else this.notes=service.query()

    },
    components:{
        utiles,
        noteText,
        service
        
    }
}