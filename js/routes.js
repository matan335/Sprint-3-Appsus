import home from './pages/home.js'
import email from './pages/email.js'
import keeper from './pages/keeper.js'



const routes = [
    { path: '/', component: home },
    { path: '/email', component: email },
    { path: '/keeper', component: keeper },
];

Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })

export default myRouter;
