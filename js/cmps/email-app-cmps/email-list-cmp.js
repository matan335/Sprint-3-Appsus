import emailPreview from './email-preview-cmp.js';

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
			<ul>
                <li v-for="(email, idx) in emails" :key="email.id">
                <router-link :to="'/email/'+email.id">
                    <email-preview :email="email" v-bind:class = "{bold:email.isRead}">
                    </email-preview>
                </router-link>
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