export default {
    template: `
    <nav class="nav-bar">
      <img class="horse-img" src="../../img/horse.png">
        <div class="nav-links">
          <router-link exact to="/">Home</router-link> |
          <router-link to="/email">Email</router-link> |
          <router-link to="/keeper">Keeper</router-link>
        </div>
    </nav>
    `
}