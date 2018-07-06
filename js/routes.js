import home from './pages/home.js'
import email from './pages/email-app.js'
import keeper from './pages/keeper-app.js'
import editNotes from './pages/note-edit-cmp.js'
import emailDetails from './pages/email-details.js'



const routes = [
    { path: '/', component: home },
    { path: '/email', component: email },
    { path: '/email/:emailId', component: emailDetails },
    { path: '/keeper', component: keeper },
    { path: '/keeper/:noteId', component: editNotes },
];


Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })

export default myRouter;
