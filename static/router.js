import Home from './components/Home.js'
import Login from './components/Login.js'
import Users from './components/Users.js'
import ServicesForm from './components/ServicesForm.js'


const routes = [
    {path: '/', component: Home, name: 'Home' },
    {path: '/login', component: Login, name: 'Login'},
    {path: '/users', component: Users},
    {path: '/create-service', component: ServicesForm}
]


export default new VueRouter({
    routes,
})
