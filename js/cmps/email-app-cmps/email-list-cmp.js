import emailPreview from './email-preview-cmp.js';

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
			<ul>
				<li v-for="(email, idx) in emails" :key="email.id">
                    <email-preview :email="email">
                    </email-preview>
				</li>
			</ul>
		</section>
    `,
    components: {
		emailPreview,
	},
    data() {
        return {

        }
    },
    methods: {

    },
   
}