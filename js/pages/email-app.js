import emailService from '../services/email-service.js';
import emailList from '../cmps/email-app-cmps/email-list-cmp.js';
import emailActions from '../cmps/email-app-cmps/email-actions-cmp.js';
import newEmail from '../cmps/email-app-cmps/new-email-cmp.js';

export default {
    template: `
    <section class="email-app">
        <h2>welcome to email!</h2>
        <email-actions @filtered="renderFilter" @isNewEmail="onCreateEmail">
        
        </email-actions>
        <email-list :emails="emails" v-if="isList"></email-list>
        <new-email @saveEmail="saveEmail" @backToEmails="backToEmails"  v-if="isNewEmail"> </new-email>
    </section>
    
    `,
    data() {
        return {
            emails: [],
            isList : true,
            isNewEmail : false,
            filter:null,
        }
    },
    created() {
        this.emailsToShow()
    },
    computed: {
        
    },
    methods: {
        onCreateEmail(){
            this.isNewEmail = true;
            this.isList = false;
        },
        emailsToShow() {
            emailService.query()
            .then(emails => {
            if(this.filter){
                var res=emails.filter(email =>{
                    return email.from.toLowerCase().includes(this.filter.toLowerCase())
                })
                console.log('res:',res)
                this.emails=res;
            }
            else{
              
                    this.emails = emails;
                    console.log('emails',this.emails)
                }
            }
        )
            
        } ,
        renderFilter(filterBy){
            this.filter=filterBy
            this.emailsToShow()
        },
        saveEmail(email){
            console.log('email:',email)
            emailService.saveEmail(email);
            this.isNewEmail = false;
            this.isList = true;
        },
        backToEmails(){
            this.isNewEmail = false;
            this.isList = true;
        },
                
    },
    components: {
        emailService,
        emailList,
        emailActions,
        newEmail,
	},
}