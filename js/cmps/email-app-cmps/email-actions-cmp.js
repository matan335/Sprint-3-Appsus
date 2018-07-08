import emailService from '../../services/email-service.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-actions">
            <h3> New eMails ({{sumUnread}}) </h3>
            <button @click="createNewEmail()">Create New eMail</button>
		</section>
    `,
    components: {
        emailService,
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

       createNewEmail(){
           this.$emit('isNewEmail');

       }

    },
    created() {
        this.getSumUnReadEmails();
    }

}