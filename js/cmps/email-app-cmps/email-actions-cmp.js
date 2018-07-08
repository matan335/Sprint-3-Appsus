import emailService from '../../services/email-service.js'
import emailFilter from './email-filter-cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-actions">
            <h3> New eMails ({{sumUnread}}) </h3>
            <div class="action-btns">
                <button @click="createNewEmail()">Create New eMail</button>
                <email-filter @filtered="setFitler"> </email-filter>

                <div class="readOpns">
                    <input type="radio" id="all" value="all" v-model="picked"
                    @change="showRead">
                    <label for="all">all</label>
                    <br>
                    <input type="radio" id="read" value="read" v-model="picked"
                    @change="showRead">
                    <label for="read">read</label>
                    <br>
                    <input type="radio" id="unread" value="unread" v-model="picked"
                    @change="showRead">
                    <label for="unread">unread</label>
                    <br>
                </div>
            </div>


		</section>
    `,
    components: {
        emailService,
        emailFilter,
    },
    data() {
        return {
            sumUnread: null,
            picked:null,
        }
    },
    methods: {
        showRead(){
            if(this.picked === 'all') this.$emit('filtered')
            else this.$emit('show-read',this.picked)
            

        },
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