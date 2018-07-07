export default {
    props: ['note', 'filter'],
    data() {
        return {
            myNotes: this.notes,


        }
    },
    methods: {

    },
    template: `
    <section class="note-text">
    <div class="note-container"
    :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
    @click="setNoteToEdit">
      <img v-if="note.img" ref="imgToUplad" class="upload-img" :src="setImg">
      {{note.text}}
      <button v-if="!filter" @click.stop="setNoteToTop" class="top-btn">top</button>
     </div>
    </section>

    `,
    created() {

    },
    methods: {
        setNoteToEdit() {
            this.$emit('edit-note', this.note)

        },
        setNoteToTop() {
            this.$emit('note-to-top', this.note)
        },
      
    },
    computed:{
        setImg(){
            return this.note.img
        },
        
    }
}