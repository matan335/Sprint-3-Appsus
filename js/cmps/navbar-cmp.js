export default {
    data() {
        return {

        }
    },
    methods: {

    },
    template: `
    <nav class="nav-bar">
      <img class="horse-img" src="../../img/horse.png">
        <router-link exact to="/">Home</router-link> |
        <router-link to="/email">email</router-link> |
        <router-link to="/keeper">keeper</router-link>
    </nav>
    `
}