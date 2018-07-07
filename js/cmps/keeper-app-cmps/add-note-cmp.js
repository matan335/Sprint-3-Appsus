import service from '../../services/kepper-service.js'

export default {
    data() {
        return {
            note: null,
            text: '',
            error: false,
            selected: '',
            backgroundColor: 'white',
            color: 'black',
            size: 25,
            img: '',
            imgOn: false,
            todos: [''],
            todo: '',

        }
    },
    methods: {

    },
    template: `
    <section class="note-text">
        <div class="note-container">
        Type to add a new note!

            <button @click="increaseTextSize">+</button>
            {{size}}
            <button @click="decreaseTextSize">-</button>

            <span>Choose note type: {{ selected }}</span>
            <select v-model="selected">
            <option v-if="!imgOn">text</option>
            <option v-if="!imgOn">todo</option>
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

            <input v-if="selected === 'image'" type="file" name="image" class="import-img" 
            @input="handleFileSelect" 
            multiple="false" accept="image/*"/>



           <div v-if="selected !== 'todo'" class="note-container">
               <input v-if="note" 
               class="note-container"
               :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
               contenteditable="true" 
               @input="addText" v-html="note.text" ref="myInput">
               <img class="upload-img" ref="imgToUplad" src="">
               <button v-if="imgOn" @click="deleteImg">x</button>  
            </div>

            <div v-else class="note-container">
                <button @click="addTodo">+</button>
              <div v-if="note" class="note-container" v-for="(todo,idx) in note.todo">
                <input  
                class="todo-container"
                :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
                contenteditable="true" 
                v-html="note.text" v-model="todos[idx]">
                <button @click="deleteTodo(idx)">x</button>     
               </div>
            </div>
            
            <span v-if="error" :style="{color:'red'}">
                fill in the note type
            </span>
            <button @click="addNote">save</button>
        </div>
    </section>

    `,
    created() {
        service.getEmptyNote()
            .then(note => {
                this.note = note
                this.todos=['']
            })

    },
    watch: {
        todo(newVal) {
            console.log(newVal)

        },
        selected(newVal) {
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
        handleFileSelect(evt) {
            var files = evt.target.files;
            var reader = new FileReader();
            var then = this;
            reader.onload = (function (theFile) {
                return function (e) {
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
            console.log('delet img')
            this.$refs.imgToUplad.src = ''
            this.note.img = ''
            this.note.type = 'text'
            this.imgOn = false

        },
        addNote(event) {
            console.log(event)
            if (this.note.type) {
                this.note.todo = this.todos
                this.error = false;
                service.addNote(this.note)
                service.getEmptyNote()
                    .then(newNote => {
                        this.note = newNote
                        this.todos=this.note.todo
                    })
                this.text = ''
                if (this.selected !== 'todo'){
                    this.$refs.imgToUplad.src = ''
                    this.$refs.myInput.value = ''
                }
                this.selected = ''
                this.color = 'black'
                this.backgroundColor = 'white'
                this.size = 25
                this.img = '',
                this.$emit('render-new-note', this.note)
                this.imgOn = false;
            }
            else this.error = true;

        },
        addText(event) {
            this.note.text = event.target.value;
            this.text = this.note.text;
        },
        increaseTextSize() {
            if (this.size === 75 || this.text === '' && this.todos === []) return;
            this.size += 5;
            this.note.size = this.size
        },
        decreaseTextSize() {
            if (this.size === 15 || this.text === '' && this.todos === []) return;
            this.size -= 5;
            this.note.size = this.size;
        },
        addTodo() {
            this.note.todo.push('')
            this.todos.push('')
        },
        deleteTodo(idx) {
            this.note.todo.splice(idx, 1);
        }

    }
}