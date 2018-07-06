import emailService from '../../services/email-service.js'

export default {
	props: ['email'],
	template: `
		<article>
			<h3>  {{email.from}}  {{email.subject}} </h3>

		</article>
    `,
}