import emailService from '../../services/email-service.js'
import utiles from '../../services/utiles-service.js'

export default {
	props: ['email'],
	template: `
		<article v-if="email" class = "email-preview">
			 <div class="from-message">{{email.from}}</div>
			  <div class="sub-message">{{email.subject}}</div>
			  <div class="body-message">{{this.body}}</div>
			 <div class="date-message">{{this.date}}</div>
		</article>
	`,
	components: {
		emailService,
		utiles
	},
	created() {
		if (this.email.body.length > 20) this.show20letters();
	},
	data() {
		return {
			date: utiles.timestampToOrigin(this.email.sentAt),
			body: this.email.body
		}
	},
	methods: {
		show20letters() {
			this.body = this.email.body;
			this.body = this.body.substring(0, 20) + '...';
		}
	}
}