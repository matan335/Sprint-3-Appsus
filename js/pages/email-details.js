import emailService from '../services/email-service.js'

export default {

	template: `
	<section class="email-details"  v-if="email">
			<h3>  {{email.from}} &nbsp;&nbsp; {{email.subject}} </h3>

		</section>
	`,
	
	data() {
		return {
			email: null
		}
	},
	created() {
		this.loadEmail();
	},
	methods: {
		loadEmail() {
			emailService.getEmailById(this.$route.params.emailId)
			.then(email => this.email = email)
		}
	}
}