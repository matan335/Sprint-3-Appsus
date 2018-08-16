export default {
	template: `
		<section class="book-filter">

			<div class="keeper-filter">
				<label class="keeper-filter-lable">Search:</label> 
				<input type="text"
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
         this.$emit('filtered', this.filter);
		}
	}
}
