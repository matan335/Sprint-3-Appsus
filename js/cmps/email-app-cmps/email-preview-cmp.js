import emailService from '../../services/email-service.js'
import utiles from '../../services/utiles-service.js'

export default {
	props: ['email'],
	template: `
		<article v-if="email" class = "email-preview">
			 <div class="from-message">{{email.from}}</div>
			  <div class="sub-message">{{email.subject}}</div>
			  <div class="body-message">{{email.body}}</div>
			 <div class="date-message">{{this.date}}</div>
		</article>
	`,
	components:{
		emailService,
		utiles
	},
	created(){
		

	},
	data(){
		return{
			date:utiles.timestampToOrigin(this.email.sentAt)
		}
	},
	computed:{
		//originDate : function (){
		//	return utiles.timestampToOrigin(thid.email.sentAt)
		//}
	
	}
	
}