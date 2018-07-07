import myRouter from './routes.js'
import navBar from './cmps/navbar-cmp.js'

new Vue({
    el: '#app',
    router : myRouter,
    components: {
        navBar
      
    }
})