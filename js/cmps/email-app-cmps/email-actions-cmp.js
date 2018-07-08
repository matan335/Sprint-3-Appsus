import emailService from '../../services/email-service.js'
import emailFilter from './email-filter-cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-actions">
            <h3> New eMails ({{sumUnread}}) </h3>
            <button @click="createNewEmail()">Create New eMail</button>
            <email-filter @filtered="setFitler"> </email-filter>
		</section>
    `,
    components: {
        emailService,
        emailFilter,
    },
    data() {
        return {
            sumUnread: null
        }
    },
    methods: {
       getSumUnReadEmails(){
        var x = emailService.getSumUnReadEmails()
        .then ( sumUnread =>{
            this.sumUnread = sumUnread ;
        })
       },
       setFitler(filterBy){
           this.$emit('filtered',filterBy)
           

       },
       createNewEmail(){
           this.$emit('isNewEmail');

       }

    },
    created() {
        this.getSumUnReadEmails();
    }

}