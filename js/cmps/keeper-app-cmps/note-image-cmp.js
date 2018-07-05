export default {
    props:['note'],
    data() {
        return {
            myNotes:this.notes

        }
    },
    methods: {

    },
    template: `
    <section class="note-text">
    <div class="note-container":style="{color: note.color, fontSize: note.size + 'px', backgroundColor: note.background}">
      {{note.text}}
     </div>
    </section>

    `,
    created(){
        
    }
}