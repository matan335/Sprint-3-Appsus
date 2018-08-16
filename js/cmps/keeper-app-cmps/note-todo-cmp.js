export default {
    props: ['note', 'filter'],
    template: `
    <section class="note-todo">
     <div class="note" @click="setNoteToEdit" :style="{color: note.color, backgroundColor: note.background}">
        <div class="note-content">
            <div v-if="note.todos" v-for="(todo, idx) in note.todos">
                <div v-if="todo" :style="{fontSize: note.size + 'px'}" :class="{'done-todo': todo.done }">
                    <span @click.stop="toggleDoneTodo(todo.id)">{{todo.text}}</span>
                </div>
            </div>
        </div>
      <button v-if="!filter" @click.stop="setNoteToTop" class="top-btn">📌</button>
     </div>
    </section>

    `,
    methods: {
        setNoteToEdit() {
            this.$emit('edit-note', this.note);
        },
        setNoteToTop() {
            this.$emit('note-to-top', this.note);
        },
        toggleDoneTodo(id) {
            this.$emit('done-todo', this.note, id);
        }
    }
}