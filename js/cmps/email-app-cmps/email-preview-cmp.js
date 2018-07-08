import emailService from '../../services/email-service.js'
import utiles from '../../services/utiles-service.js'

export default {
	props: ['email'],
	template: `
		<article class = "email-preview">
			 <div class="from-message">{{email.from}}</div>
			  <div class="sub-message">{{email.subject}}</div>
			  <div class="body-message">{{email.body}}</div>
			 <div class="date-message">{{this.originDate}}</div>
		</article>
	`,
	components:{
		emailService,
		utiles
	},
	data(){
		return{
			originDate: this.email.sentAt
		}
	},
	computed:{
		//originDate : function (){
		//	return utiles.timestampToOrigin(thid.email.sentAt)
		//}
	
	}
	
}