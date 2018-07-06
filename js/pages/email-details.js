import emailService from '../services/email-service.js'

export default {

	template: `
	<section class="email-details"  v-if="email">
		<div class="email.info">
			<h3> {{email.subject}} </h3>
			<p> From: {{email.from}} </p>
			<p> At: {{email.sentAt}} </p>
			<p> Body: {{email.body}} </p> 
		</div>
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