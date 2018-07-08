import emailService from '../services/email-service.js';
import emailList from '../cmps/email-app-cmps/email-list-cmp.js';
import emailActions from '../cmps/email-app-cmps/email-actions-cmp.js';
import newEmail from '../cmps/email-app-cmps/new-email-cmp.js';

export default {
    template: `
    <section class="email-app">
        <h2>welcome to email!</h2>
        <email-actions @isNewEmail="onCreateEmail" ></email-actions>
        <email-list :emails="emailsToShow" :x="emailsToShow" v-if="isList"></email-list>
        <new-email @saveEmail="saveEmail"   v-if="isNewEmail"> </new-email>
    </section>
    
    `,
    data() {
        return {
            emails: [],
            isList : true,
            isNewEmail : false,
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
            return emailsToShow;
            
        }    
    },
    methods: {
        onCreateEmail(){
            this.isNewEmail = true;
            this.isList = false;
        },
        saveEmail(email){
            console.log('email:',email)
            emailService.saveEmail(email);
            this.isNewEmail = false;
            this.isList = true;
        }
                
    },
    components: {
        emailService,
        emailList,
        emailActions,
        newEmail,
	},
}