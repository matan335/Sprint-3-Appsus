import service from '../services/kepper-service.js'
export default {
    template: `
    <section class="note-edit">
        edit

    </section>
    
    `,
    data() {
        return {
            note:null
           
        }
    },
    created() {
        console.log('note in edit',service.getNoteById(this.$route.params.noteId))



    },
    computed: {
  
    },
    methods: {
                
    },

}