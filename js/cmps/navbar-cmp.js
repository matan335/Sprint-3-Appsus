export default {
    data() {
        return {

        }
    },
    methods: {

    },
    template: `
    <nav class="nav-bar">
        <router-link exact to="/">Home</router-link> |
        <router-link to="/email">email</router-link>
        <router-link to="/keeper">keeper</router-link>
    </nav>
    `
}