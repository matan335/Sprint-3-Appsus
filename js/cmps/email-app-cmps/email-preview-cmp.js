import emailService from '../../services/email-service.js'

export default {
	props: ['email'],
	template: `
		<article>
		<router-link :to="'/email/'+email.id">
		<h3>  {{email.from}} &nbsp;&nbsp; {{email.subject}} </h3>
		</router-link>

		</article>
    `,
}