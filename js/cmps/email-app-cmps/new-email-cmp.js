import emailService from '../../services/email-service.js'

export default {
	template: `
	<section class="new-email"  v-if="email">
			<h1> Create New Mail </h1>
			<p>Subject: </p>
			<input v-model="email.subject" placeholder="No Subject">
			<p> To: {{email.from}} </p>
			<p> Body:  </p> 
			<textarea v-model="email.body" placeholder="Enter text"></textarea>
			<div class = "new-email-buttons">
				<button @click="saveEmail()">Send eMmail</button>
				<button @click="backToEmails()">Back to eMails</button>
			</div>

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
		saveEmail() {
			this.$emit('saveEmail', this.email);
		},
		backToEmails() {
			this.$emit('backToEmails');
		}

	}
}