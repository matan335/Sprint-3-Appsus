export default {
    props:['note','filter'],
    data() {
        return {

        }
    },
    methods: {

    },
    template: `
    <section class="note-text">
     <div class="note" 
     :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
     @click="setNoteToEdit">
        <div class="note-content">
            {{note.text}}
        </div>
      <button v-if="!filter" @click.stop="setNoteToTop" class="top-btn">📌</button>
     </div>
    </section>

    `,
    created(){
        console.log('note-text created')
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