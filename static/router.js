import Home from './components/Home.js'
import Login from './components/Login.js'
import Users from './components/Users.js'
import ServicesForm from './components/ServicesForm.js'
import RegisterProf from './components/RegisterProf.js'
import RegisterCustomer from './components/RegisterCustomer.js'


const routes = [
    {path: '/', component: Home, name: 'Home' },
    {path: '/login', component: Login, name: 'Login'},
    {path: '/users', component: Users},
    {path: '/create-service', component: ServicesForm},
    {path:'/register/prof', component: RegisterProf, name: 'RegisterProfessional'},
    {path:'/register/customer', component: RegisterCustomer, name: 'RegisterCustomer'},
    

]


export default new VueRouter({
    routes,
})
