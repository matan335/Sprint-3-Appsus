import emailService from '../services/email-service.js';
import emailList from '../cmps/email-app-cmps/email-list-cmp.js';

export default {
    template: `
    <section class="email-app">
        <h2>welcome to email!</h2>
        <email-list :emails="emailsToShow" :x="emailsToShow">
		</email-list>
    </section>
    
    `,
    data() {
        return {
            emails: [],
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails;
            })
    },
    computed: {
        emailsToShow() {
            let emailsToShow = this.emails;
            console.log(emailsToShow);
            return emailsToShow;
            
        }    
    },
    methods: {
                
    },
    components: {
		emailList,
	},
}