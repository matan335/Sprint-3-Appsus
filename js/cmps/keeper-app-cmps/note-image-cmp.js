export default {
    props:['note'],
    data() {
        return {
            myNotes:this.notes,


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
      <button @click.stop="setNoteToTop">top</button>
     </div>
    </section>

    `,
    created(){
        
    },
    methods:{
        setNoteToEdit(){
            this.$emit('edit-note',this.note)

        },
        setNoteToTop(){
            this.$emit('note-to-top',this.note) 
        }
    }
}