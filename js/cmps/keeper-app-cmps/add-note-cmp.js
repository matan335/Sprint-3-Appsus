import service from '../../services/kepper-service.js'

export default {
    data() {
        return {
            note: null,
            text: '',
            type: 'text',
            backgroundColor: 'white',
            color: 'black',
            size: 15,
            img: '',
            imgOn: false,
            selected: 'text'
        }
    },
    template: `
    <section class="note-text">
        <div v-if="note" class="notes-container">
         Type to add a new note!

         <div v-if="type !== 'todo'" class="note-display-container">
               <input v-if="note" 
               class="todo-container-input"
               :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
               contenteditable="true" placeholder="Please type.."
               @input="addText" v-html="note.text" ref="myInput">
               <img  v-if="type === 'image'"class="upload-img" ref="imgToUplad" src="">
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
             {{size}}
             <button @click="decreaseTextSize" class="editor-btn">-</button>
            </div>

            <div class="editor-edit-opns"> 
               <div class="text-edit-btn-container">
                    <div class="text-container">
                        <span>Choose note type: {{ type }}</span>
                        <br>
                        <span>Choose background color: {{ backgroundColor }}</span>
                        <br>
                        <span>Choose text color: {{ color }}</span>
                    </div>


                    <div class="change-text">
                        <div class="type-ctrl">
                            <select v-model="type">
                                <option v-if="!imgOn" >text</option>
                                <option v-if="!imgOn">todo</option>
                                <option>image</option>
                            </select>
                        </div>
                    

                        <div class="background-ctrl">
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
                        </div>
                    

                        <div>
                            <div class="color-ctrl">
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
                            </div>
                        </div>
                    </div>
                </div>
                    
                <input v-if="type === 'image'" type="file" name="image" class="import-img" 
                @input="handleFileSelect" 
                multiple="false" accept="image/*"/>
            </div>

            <button @click="hide" class="editor-btn">hide</button>
            <button @click="addNote" class="editor-btn add-note-btn">add note</button>
        </div>
    </section>
    `,
    created() {
        service.getEmptyNote()
            .then(note => {
                this.note = note;
            })

    },
    watch: {
        type(newVal) {
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
        addNote() {
            if (this.note.type === 'text' && this.note.text === '' ||
                this.note.type === 'todo' && this.note.todos[0].text === '') return;
            service.addNote(this.note);
            service.getEmptyNote()
                .then(newNote => {
                    this.note = newNote;
                })
            this.text = '';
            if (this.type === 'image') this.$refs.imgToUplad.src = '';
            if (this.type !== 'todo') this.$refs.myInput.value = '';
            this.type = '';
            this.color = 'black';
            this.backgroundColor = 'white';
            this.size = 25;
            this.img = '';
            this.$emit('render-new-note', this.note);
            this.$emit('close-add-note-cmp');
            this.imgOn = false;
        },
        addText(event) {
            this.note.text = event.target.value;
            this.text = this.note.text;
            this.note.todos[0].text = event.target.value
        },
        increaseTextSize() {
            if (this.size === 75 || this.text === '' && this.note.todos[0].text === '') return;
            this.size += 5;
            this.note.size = this.size
        },
        decreaseTextSize() {
            if (this.size === 5 || this.text === '' && this.note.todos[0].text === '') return;
            this.size -= 5;
            this.note.size = this.size;
        },
        addTodo() {
            this.note.todos.push(service.getEmptyTodo())
        },
        deleteTodo(id) {
            this.note.todos = this.note.todos.filter(currTodo => currTodo.id !== id)
        },
        hide() {
            this.$emit('hide-note-adder')
        }

    }
}