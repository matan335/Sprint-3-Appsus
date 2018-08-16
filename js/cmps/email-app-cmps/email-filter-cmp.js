

export default {
    props: ['emails'],
    template: `
        <section class="email-filter">
            <input placeholder="type to filter" v-model="filter">
            <button @click="setFilter">Search</button>
		</section>
    `,
    components: {
    
    },
    data() {
        return {
            filter : ''
        }
    },
    methods: {
        setFilter(){
            this.$emit('filtered',this.filter);        
        }
    }
}