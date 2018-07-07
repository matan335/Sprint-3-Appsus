export default {
    data() {
        return {

        }
    },
    methods: {

    },
    template: `
    <section class="home">
        <div class="title-container">
            <img class="horse-img" src="./img/horse.jpg">
            <h1>Welcome to Appsus!</h1>
        </div>

        <div class="apps-container">    
            <div class="app-link">
                <router-link to="/email">
                <img class="homeImg" src="../../img/email.png">
            </router-link>
            Click for our email app
            </div>
            
            <div class="app-link">
                <router-link to="/keeper">
                <img class="homeImg" src="../../img/keeper.png">
            </router-link>
            Click for our email keeper app
            </div>
        </div>

    </section>


    
    `
}