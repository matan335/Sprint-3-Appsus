import service from '../../services/kepper-service.js'

export default {
    data() {
        return {
            note:null,
            text:'',
            error:false,
            selected:'',
            backgroundColor:'white',
            color:'black',

        }
    },
    methods: {

    },
    template: `
    <section class="note-text">
        <div class="note-container">
        Type to add a new note!
            <input type="text" v-model="text" placeholder="Please fill in your note">

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

            <div v-if="note" class="note-container":style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}">
                {{note.text}}
            </div>
            <span v-if="error" :style="{color:'red'}">
                fill in the note type
            </span>
            <button @click="addNote">save</button>
        </div>
     
    </section>

    `,
    created(){
        service.getEmptyNote()
        .then(note =>{this.note=note})   
    },
    watch:{
        text(newVal) {
            // console.log('Quest changed from', newVal);
            this.note.text=newVal
        },
        selected(newVal){
            console.log('Quest changed to', newVal);
            this.note.type=newVal;
            
        },
        backgroundColor(newVal){
            this.note.background=newVal;
        },
        color(newVal){
            this.note.color=newVal;
        }

    },
    methods:{
        addNote(){
            if(this.note.type){
                this.error=false;
                service.addNote(this.note)
                service.getEmptyNote()
                .then(newNote=>
                    this.note=newNote
                )
                this.text=''
                this.selected=''
                this.$emit('render-new-note',this.note)            
            }
            else this.error=true;

        }
    }
}