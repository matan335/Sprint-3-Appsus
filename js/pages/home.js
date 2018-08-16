export default {
    template: `
    <section class="home">
        <div class="title-container">
            <h1>Welcome to Appsus!</h1>
            <p>We hope you will have a wonderfull experience with our app, 
                We offer only the best for our clients and hopfully you will 
                leave a feedback and let us know what we can do better!
                So? what are you waiting for!
                click one of the links below and prepare to be glued to your seat!
            </p>
        </div>

        <div class="apps-container">    
            <div class="app-link">
                <router-link to="/email">
                <img class="homeImg" src="../../img/email.png">
            </router-link>
            </div>
            
            <div class="app-link">
                <router-link to="/keeper">
                <img class="homeImg" src="../../img/keeper.png">
            </router-link>
            </div>
        </div>

    </section>
    `
}