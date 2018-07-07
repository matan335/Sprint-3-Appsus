export default {
    props:['note','filter'],
    data() {
        return {
            todos:[],

        }
    },
    methods: {

    },
    template: `
    <section class="note-todo">
     <div class="note-container" @click="setNoteToEdit" :style="{color: note.color, backgroundColor: note.background}">
        <div  v-for="todo in todos">
            <div v-if="todo" :style="{fontSize: note.size + 'px'}">
                {{todo}}
            </div>
        </div>
      <button v-if="!filter" @click.stop="setNoteToTop" class="top-btn">top</button>
     </div>
    </section>

    `,
    created(){
        this.todos=this.note.todo
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