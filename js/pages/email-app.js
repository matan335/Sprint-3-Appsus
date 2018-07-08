import emailService from '../services/email-service.js';
import emailList from '../cmps/email-app-cmps/email-list-cmp.js';
import emailActions from '../cmps/email-app-cmps/email-actions-cmp.js';
import newEmail from '../cmps/email-app-cmps/new-email-cmp.js';

export default {
    template: `
    <section class="email-app">
        <h2>welcome to email!</h2>
        <email-actions @isNewEmail="onCreateEmail"></email-actions>
        <email-list :emails="emailsToShow" :x="emailsToShow" v-if="isList"></email-list>
        <new-email> v-if="isNewMail"</new-email>
    </section>
    
    `,
    data() {
        return {
            emails: [],
            isNewEmail : false,
            isList : true,
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
        onCreateEmail(){
            console.log('btn cliced');
            this.isNewEmail = true;
            this.isList = false;
        },
                
    },
    components: {
        emailService,
        emailList,
        emailActions,
        newEmail,
	},
}