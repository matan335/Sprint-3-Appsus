import service from '../services/kepper-service.js'

export default {
    template: `
    <section class="note-edit">
      <div class="editor-container">
         Type to edit the note

          <div v-if="note.type !== 'todo'" class="note-display-container">
                <input v-if="note" 
                class="todo-container-input"
                :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
                contenteditable="true" placeholder="Please type.."
                v-html="note.text" v-model="text">
                <div class="img-container">
                    <img class="upload-img" ref="imgToUplad" :src="setImg"> 
                    <button v-if="note.img" class="upload-img-btn " @click="deleteImg">x</button>               
                </div>
            </div>

            <div v-else class="note-container">
                <button @click="addTodo" class="editor-btn">+</button>
              <div class="note-display-container" v-for=" (todo,idx) in todos">
                <input v-if="note" 
                class="todo-container-input "
                :style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}"
                contenteditable="true" placeholder="Please type.."
                v-html="note.text" v-model="todos[idx].text">
                <button class="delete-todo-btn-edit"  @click="deleteTodo(idx)">x</button>     
               </div>
            </div>

            <div class="size-ctrl">
             <button @click="increaseTextSize" class="editor-btn">+</button>
             {{size}}
             <button @click="decreaseTextSize" class="editor-btn">-</button>
            </div>

            <div class="editor-edit-opns">

                <div class="type-ctrl">
                    <span>Choose note type: {{ type }}</span>
                    <select v-model="type">
                    <option >text</option>
                    <option >todo</option>
                    <option>image</option>
                    </select>
                </div>

               <div class="background-ctrl">
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
                </div>

                <div class="color-ctrl">
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
                </div>

             <input v-if="type === 'image'" type="file" name="image" class="import-img" 
                @input="handleFileSelect" 
                multiple="false" accept="image/*"/>
          </div>

            <router-link to="/keeper" >
                <button @click="saveNote" class="editor-btn" >save</button>
             </router-link>
        </div>
    </section>
    `,
    data() {
        return {
            note: null,
            text: '',
            type: '',
            backgroundColor: 'white',
            color: 'black',
            size: 15,
            todos:[],
            todo:'',


        }
    },
    created() {
        this.note = service.getNoteById(this.$route.params.noteId)
        if (this.note) {
            this.text = this.note.text
            this.type = this.note.type
            this.backgroundColor = this.note.background
            this.color = this.note.color
            this.size = this.note.size
            this.todos=this.note.todo
        }
    },
    watch: {
        todo(newVal){
            console.log(newVal)

        },
        text(newVal) {
            this.note.text = newVal
        },
        type(newVal, oldVal) {
            if(newVal !== 'image' &&this.$refs.imgToUplad){
                this.$refs.imgToUplad.src=''
                this.note.img=''
            }
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
                    then.$refs.imgToUplad.src =e.target.result
                    then.img=e.target.result
                    then.note.img=e.target.result
                    then.note.type='image'
                };
            })(files[0]);
            reader.readAsDataURL(files[0]);
        },
        deleteImg(){
            console.log('delet img')
            this.note.img=''
            this.note.type='text'

        },
        increaseTextSize() {
            if (this.size === 75 || this.text === '' && this.todos === []) return
            this.size += 5
            this.note.size = this.size
        },
        decreaseTextSize() {
            if (this.size ===  5 || this.text === '' && this.todos === []) return
            this.size -= 5
            this.note.size = this.size
        },
        saveNote() {
            if(this.note.type !== 'todo') this.note.todo=['']
            service.saveEditNote(this.note)
        },
        addTodo(){
            this.note.todo.push('')
        },
        deleteTodo(idx){
            this.note.todo.splice(idx, 1);
        }

    },
    computed:{
        setImg(){
            return this.note.img
        },
        
    }


}