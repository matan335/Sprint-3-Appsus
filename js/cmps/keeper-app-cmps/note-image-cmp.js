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
    <div :style="{color: note.color, fontSize: note.size + 'px' }">
      {{note.text}}
     </div>
    </section>

    `,
    created(){
        console.log('note-text created')
    }
}