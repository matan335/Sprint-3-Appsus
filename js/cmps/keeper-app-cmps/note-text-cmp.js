export default {
    props:['note'],
    data() {
        return {

        }
    },
    methods: {

    },
    template: `
    <section class="note-text">
     <div class="note-container" 
     :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
     @click="setNoteToEdit">
      {{note.text}}
     </div>
    </section>

    `,
    created(){
        console.log('note-text created')
    },
    methods:{
        setNoteToEdit(){
            this.$emit('edit-note',this.note)

        }
    }
}