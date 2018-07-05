export default {
    data() {
        return {

        }
    },
    methods: {

    },
    template: `
    <section class="home">
        
            <h1>Welcome to Appsus!</h1>
            
        <div>
         Go to our email app!
            <router-link to="/email">
            <img class="homeImg" src="../../img/email.png">
        </router-link>
        </div>
        
        <div>
        Go to our email keeper app!!
            <router-link to="/keeper">
            <img class="homeImg" src="../../img/keeper.png">
        </router-link>
        </div>

    </section>


    
    `
}