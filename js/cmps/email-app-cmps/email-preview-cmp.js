import emailService from '../../services/email-service.js'

export default {
	props: ['email'],
	template: `
		<article class = "email-preview">
			<h3>  {{email.from}} &nbsp;&nbsp;&nbsp; {{email.subject}} &nbsp;&nbsp;&nbsp; 
			      {{email.body}}  &nbsp;&nbsp;&nbsp; {{email.sentAt}} &nbsp;&nbsp;&nbsp
			</h3>
		</article>
    `,
}