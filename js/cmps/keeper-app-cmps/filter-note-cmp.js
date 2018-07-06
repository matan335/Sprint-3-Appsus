export default {
	template: `
		<section class="book-filter">

			<div>
				<label for="q">Search:</label> 
				<input type="text" id="q" 
					v-model="filter" 
					@input="updateFilter"/>
			</div>

		</section>
	`,
	data() {
		return {
			filter: '',
		}
	},
	methods: {
		updateFilter(ev) {
			console.log('current filter:',this.filter)
         this.$emit('filtered', this.filter);
		}
	},
	computed: {
	}
}
