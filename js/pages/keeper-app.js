
import utiles from '../services/utiles-service.js'
import service from '../services/kepper-service.js'
import noteText from '../cmps/keeper-app-cmps/note-text-cmp.js'
import noteImage from '../cmps/keeper-app-cmps/note-image-cmp.js'
import noteTodo from '../cmps/keeper-app-cmps/note-todo-cmp.js'
import addNote from '../cmps/keeper-app-cmps/add-note-cmp.js'
import filterNote from '../cmps/keeper-app-cmps/filter-note-cmp.js'


export default {
    template: `
    <section class="keeper-app">
        <h2>welcome to keeper</h2>
        <div :class="{'heather-btns':!addNewNote}">
            <add-note v-if="addNewNote" @render-new-note="renderNewNote" 
            @close-add-note-cmp="closeAddNoteCmp" @hide-note-adder="hideNoteAdder"></add-note>

            <div v-else  class="open-editor-btn-container">
                <button @click="openAddNote" class="open-editor-btn">add a new note</button>
            </div>
            <filter-note @filtered="setFilter" ></filter-note>
        </div>
        

    <div class="notes-display-container">
        <div v-for="note in notes">
            <component v-if="note" :is="'note-'+note.type" :filter="filter" 
                :note="note" :imgUrl="imgUrl" @edit-note="editNote" @note-to-top="sendToTop"
                @done-todo="toggleDoneTodo">
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
            imgUrl:null,
            addNewNote:false,
            doneTodo:false,
        }
    },
    created(){
        this.showNotes()
    },
    methods:{
        toggleDoneTodo(note,todoIdx){
            var noteIdx
            this.notes.forEach((currNote,idx) =>{
                if(currNote.id === note.id) noteIdx=idx
            })
            this.notes[noteIdx].todo[todoIdx].done=!this.notes[noteIdx].todo[todoIdx].done
            utiles.saveToStorage(this.KeeperApp_Key,this.notes)           
        },
        closeAddNoteCmp(){
            this.addNewNote=false;
        },
        openAddNote(){
            this.addNewNote=true;
        },
        showNotes(){
            service.query()
            .then(notes =>{
                if (!this.filter) this.notes=notes;
                else {
                    var res=notes.filter(note =>{
                        var filterTodo=note.todo.filter(currTodo =>{
                            return currTodo.text.toLowerCase().includes(this.filter.toLowerCase())
                        })
                        return (note.text.toLowerCase().includes(this.filter.toLowerCase())) || filterTodo[0]
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
            this.showNotes()       
        },
        sendToTop(note){
            service.query()
            .then(notes =>{
                service.sendToTop(note,notes)
                this.showNotes()

            })
        },
        hideNoteAdder(){
           this.addNewNote=false;
        }
    },
    components:{
        utiles,
        noteText,
        noteImage,
        noteTodo,
        service,
        addNote,
        filterNote,
        
    },
}