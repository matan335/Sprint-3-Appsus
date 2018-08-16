
import utiles from '../services/utiles-service.js'
import service from '../services/kepper-service.js'
import noteText from '../cmps/keeper-app-cmps/note-text-cmp.js'
import noteImage from '../cmps/keeper-app-cmps/note-image-cmp.js'
import noteTodo from '../cmps/keeper-app-cmps/note-todo-cmp.js'
import editNote from './note-edit-cmp.js'
import filterNote from '../cmps/keeper-app-cmps/filter-note-cmp.js'


export default {
    template: `
    <section class="keeper-app">
        <h2>welcome to keeper</h2>
        <div :class="{'heather-btns':!addNewNote}">
            <edit-note v-if="addNewNote" @close-edit-note-cmp="closeAddNoteCmp" 
            @hide-note-edit="hideNoteEdit"></edit-note>

            <div v-else  class="open-editor-btn-container">
                <button @click="openAddNote" class="open-editor-btn">add a new note</button>
            </div>
            <filter-note @filtered="setFilter" ></filter-note>
        </div>

        <transition-group name="elements-animation" tag="div" class="notes-display-container ">
            <div v-for="note in notes" :key="note.id">
                <component v-if="note" :is="'note-'+note.type" :filter="filter" 
                    :note="note" :imgUrl="imgUrl" @edit-note="editNote" @note-to-top="sendToTop"
                    @done-todo="toggleDoneTodo">
                </component>
            </div>
        </transition-group>
    </section>
   
    `,
    data() {
        return {
            notes: [],
            filter: null,
            KeeperApp_Key: 'KeeperApp_Key',
            imgUrl: null,
            addNewNote: false,
            doneTodo: false,
        }
    },
    created() {
        this.showNotes()
    },
    methods: {
        toggleDoneTodo(note, todoId) {
            var noteIdx = this.notes.findIndex((currNote, idx) => currNote.id === note.id)
            note.todos.map(todo => (todo.id === todoId) ? todo.done = !todo.done : todo)
            this.notes[noteIdx] = note
            utiles.saveToStorage(this.KeeperApp_Key, this.notes)
        },
        closeAddNoteCmp() {
            this.addNewNote = false;
        },
        openAddNote() {
            this.addNewNote = true;
        },
        showNotes() {
            service.query()
                .then(queryNotes => {
                    if (!this.filter) this.notes = queryNotes;
                    else {
                        this.notes = queryNotes.filter(note => {
                            var filterTodo = note.todos.filter(currTodo => {
                                return currTodo.text.toLowerCase().includes(this.filter.toLowerCase())
                            })
                            return note.text.toLowerCase().includes(this.filter.toLowerCase()) || filterTodo[0]
                        })
                    }
                })
        },
        editNote(note) {
            this.$router.push(`keeper/${note.id}`);
        },
        setFilter(filter) {
            this.filter = filter;
            this.showNotes();
        },
        sendToTop(note) {
            service.query()
                .then(notes => {
                    service.sendToTop(note, notes);
                    this.showNotes();
                })
        },
        hideNoteEdit() {
            this.addNewNote = false;
        }
    },
    components: {
        utiles,
        noteText,
        noteImage,
        noteTodo,
        service,
        editNote,
        filterNote,
    }
}