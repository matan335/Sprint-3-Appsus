import service from '../services/kepper-service.js'

export default {
    template: `
    <section class="note-edit">
      <div class="editor-container">
        Type to edit the note
            <input type="text" v-model="text" value="" >

            <button @click="increaseTextSize">+</button>
            {{size}}
            <button @click="decreaseTextSize">-</button>

            <span>Choose note type: {{ selected }}</span>
            <select v-model="selected">
            <option>text</option>
            <option>image</option>
            </select>

            <span>Choose background color: {{ backgroundColor }}</span>
            <select v-model="backgroundColor">
            <option>black</option>
            <option>yellow</option>
            <option>blue</option>
            <option>grey</option>
            <option>red</option>
            <option>white</option>
            <option>pink</option>
            <option>orange</option>
            <option>salmon</option>
            </select>


            <span>Choose text color: {{ color }}</span>
            <select v-model="color">
            <option>black</option>
            <option>yellow</option>
            <option>blue</option>
            <option>grey</option>
            <option>red</option>
            <option>white</option>
            <option>pink</option>
            <option>orange</option>
            <option>salmon</option>
            </select>

            <div v-if="note" 
            class="note-container"
            :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}">
                {{note.text}}
            </div>
            <router-link to="/keeper">
                <button @click="saveNote">save</button>
             </router-link>
        </div>
    </section>
    `,
    data() {
        return {
            note: null,
            text: '',
            selected: '',
            backgroundColor: 'white',
            color: 'black',
            size: 25,


        }
    },
    created() {
        this.note = service.getNoteById(this.$route.params.noteId)
        if (this.note) {
            this.text = this.note.text
            this.selected = this.note.type
            this.backgroundColor = this.note.background
            this.color = this.note.color
            this.size = this.note.size
        }
    },
    watch: {
        text(newVal) {
            this.note.text = newVal
        },
        selected(newVal) {
            console.log('Quest changed to', newVal);
            this.note.type = newVal;

        },
        backgroundColor(newVal) {
            this.note.background = newVal;
        },
        color(newVal) {
            this.note.color = newVal;
        }

    },
    methods: {
        increaseTextSize() {
            if (this.size === 75 || this.text === '') return
            this.size += 5
            this.note.size = this.size
        },
        decreaseTextSize() {
            if (this.size === 15 || this.text === '') return
            this.size -= 5
            this.note.size = this.size
        },
        saveNote() {
            service.saveEditNote(this.note)
        },

    },


}