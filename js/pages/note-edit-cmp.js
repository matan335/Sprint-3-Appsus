import service from '../services/kepper-service.js'

export default {
    data() {
        return {
            note: null,
            img: '',
            imgOn: false,
        }
    },
    template: `
    <section class="note-text">
        <div v-if="note" class="notes-container">
         Type to add a new note!

            <div v-if="note.type !== 'todo'" class="note-display-container">
               <input v-if="note" 
               class="todo-container-input"
               :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
               contenteditable="true" placeholder="Please type.." :value="note.text"
               @input="addText" v-html="note.text" ref="myInput">
               <img v-if="note.type==='image'" class="upload-img" ref="imgToUplad" :src="note.img">
               <button v-if="imgOn" @click="deleteImg">x</button>  
            </div>

            <div v-else class="note-container">
                <button @click="addTodo" class="editor-btn">+</button>
              <div v-if="note" class="note-display-container" 
              v-for="(todo,idx) in note.todos">
                <input  
                class="todo-container-input" placeholder="Please type.."
                :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
                contenteditable="true" 
                v-html="note.text" v-model="todo.text">
                <button @click="deleteTodo(todo.id)" class="delete-todo-btn">x</button>     
               </div>
            </div>
         
            <div class="size-ctrl">
             <button @click="increaseTextSize" class="editor-btn">+</button>
             {{note.size}}
             <button @click="decreaseTextSize" class="editor-btn">-</button>
            </div>

            <div class="editor-edit-opns"> 
               <div class="text-edit-btn-container">
                    <div class="text-container">
                        <span>Choose note type: {{ note.type }}</span>
                        <br>
                        <span>Choose background color: {{ note.background }}</span>
                        <br>
                        <span>Choose text color: {{ note.color }}</span>
                    </div>


                    <div class="change-text">
                        <div class="type-ctrl">
                            <select v-model="note.type">
                                <option v-if="!imgOn" >text</option>
                                <option v-if="!imgOn">todo</option>
                                <option>image</option>
                            </select>
                        </div>
                    

                        <div class="background-ctrl">
                            <select v-model="note.background">
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
                        </div>
                    

                        <div>
                            <div class="color-ctrl">
                                <select v-model="note.color">
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
                            </div>
                        </div>
                    </div>
                </div>
                    
                <input v-if="note.type === 'image'" type="file" name="image" class="import-img" 
                @input="handleFileSelect" 
                multiple="false" accept="image/*"/>
            </div>

            <button v-if="!$route.params.noteId" @click="hide" class="editor-btn">Hide</button>
            <button @click="addNewNote" class="editor-btn add-note-btn">
                {{$route.params.noteId? 'Save note' : 'Add note' }}
            </button>
        </div>
    </section>
    `,
    created() {
        var id = this.$route.params.noteId
        if (id) {
            this.note = service.getNoteById(id)
            this.type = this.note.type
        }
        else {
            service.getEmptyNote()
                .then(note => {
                    this.note = note;
                    this.type = this.note.type
                })
        }

    },
    watch: {
        note(newVal) {
            this.note = newVal;
        }
    },
    methods: {
        handleFileSelect(ev) {
            var files = ev.target.files;
            var reader = new FileReader();
            var then = this;
            reader.onload = (() => {
                return e => {
                    then.$refs.imgToUplad.src = e.target.result
                    then.img = e.target.result
                    then.note.img = e.target.result
                    then.note.type = 'image'
                    then.imgOn = true
                };
            })(files[0]);
            reader.readAsDataURL(files[0]);
        },
        deleteImg() {
            this.$refs.imgToUplad.src = '';
            this.note.img = '';
            this.note.type = 'text';
            this.imgOn = false;
        },
        addNewNote() {
            if (this.note.type === 'text' && this.note.text === '' ||
                this.note.type === 'todo' && this.note.todos[0].text === '') return;

            switch (this.note.type) {
                case 'text':
                    this.note.img = ''
                    this.note.todos = [service.getEmptyTodo()]
                    break;
                case 'todo':
                    this.note.text = ''
                    this.note.img = ''
                    break;
                case 'img':
                    this.note.text = ''
                    this.note.todos = [service.getEmptyTodo()]
                    break;

            }

            if (this.$route.params.noteId) {
                service.saveEditNote(this.note)
                this.$router.push('/keeper')
            }
            else service.addNote(this.note);
            if (this.note.type === 'image') this.$refs.imgToUplad.src = '';
            if (this.note.type !== 'todo') this.$refs.myInput.value = '';
            this.img = '';
            this.$emit('close-edit-note-cmp');
            this.imgOn = false;
        },
        addText(event) {
            this.note.text = event.target.value;
            this.note.todos[0].text = event.target.value;
        },
        increaseTextSize() {
            if (this.note.size === 75 || this.note.text === '' && this.note.todos[0].text === '') return;
            this.note.size += 5;
        },
        decreaseTextSize() {
            if (this.note.size === 5 || this.note.text === '' && this.note.todos[0].text === '') return;
            this.note.size -= 5;
        },
        addTodo() {
            this.note.todos.push(service.getEmptyTodo());
        },
        deleteTodo(id) {
            this.note.todos = this.note.todos.filter(currTodo => currTodo.id !== id)
        },
        hide() {
            this.$emit('hide-note-edit');
        }

    }
}