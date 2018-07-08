import emailService from '../services/email-service.js'
import utiles from '../services/utiles-service.js'
import emailActions from '../cmps/email-app-cmps/email-actions-cmp.js'


export default {

	template: `
	<section class="email-details"  v-if="email">
		<div class="email-info">
			<h3> {{email.subject}} </h3>
			<p> <b>From</b>: {{email.from}} </p>
			<p> <b>At</b>: {{email.sentAt}} </p>
			<p> <b>Body<b>: </p> 
			<p> {{email.body}} </p> 
		</div>
		<router-link :to="'/email/'">
		   <button class="Button-Back">Back</Button>
	    </router-link>
		
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
	components:{
		emailActions,
		utiles,
	},
	methods: {
		loadEmail() {
			emailService.getEmailById(this.$route.params.emailId)
			.then(email => this.email = email)
		},
		setEmailRead() {
			console.log('updating', this.$route.params.emailId);
			emailService.setEmailReadById(this.$route.params.emailId)
				// .then(()=>{
				// 	//utiles.saveToStorage(emailService.EMAILS)
				// 	//console.log(emailService.EMAILS);
				// 	console.log('email updated as read!');
				// })
				// .catch(err=>{
				// 	console.log('Failed to update');
				// })
		}
	}
}