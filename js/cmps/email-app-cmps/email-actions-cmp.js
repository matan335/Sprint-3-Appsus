import emailService from '../../services/email-service.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-actions">
            <h3> Inbox ({{sumUnread}}) </h3>
            <button @click="createNewEmail()">New Mail</button>
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
            console.log('x=',sumUnread)
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