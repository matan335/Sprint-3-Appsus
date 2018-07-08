import emailService from '../../services/email-service.js'

export default {

	template: `
	<section class="new-email"  v-if="email">
			<h1> Create New Mail </h1>
			<h3> {{email.subject}} </h3>
			<p> To: {{email.from}} </p>
			<p> Body: {{email.body}} </p> 
	
	</section>
	`,
	
	data() {
		return {
			email: null
		}
	},
	created() {
		
		this.newEmail();

	},
	methods: {
		newEmail() {
			this.email = emailService.emptyEmail();
		},
		
	}
}