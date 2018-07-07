import emailService from '../../services/email-service.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-actions">
			<h3> Actions </h3>
		</section>
    `,
    components: {
        emailService,
    },
    data() {
        return {
            
        }
    },
    methods: {
       

    },

}