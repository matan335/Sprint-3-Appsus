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
		this.setEmailRead()
		this.loadEmail();

	},
	methods: {
		loadEmail() {
			emailService.getEmailById(this.$route.params.emailId)
			.then(email => this.email = email)
		},
		setEmailRead() {
			console.log('updating', this.$route.params.emailId);
			emailService.setEmailReadById(this.$route.params.emailId)
				.then(()=>{
					console.log('email updated as read!');
				})
				.catch(err=>{
					console.log('Failed to update');
				})
		}
	}
}