import router from "./router.js"
import Navbar from "./components/Navbar.js"


// Route guard to check authentication
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('auth-token'); 
   if(!isAuthenticated && (!["Login", "RegisterProfessional", "RegisterCustomer"].includes(to.name))){
    next({name:"Login"})
   }
    else {
        next();
 }
 });

new Vue({
    el: "#app",
    router,
    template: `
    <div class="m-3">
        <Navbar :key="routeKey" />
        <router-view />
    </div>
    `,
    components: {
        Navbar,
    },
    data() {
        return {
            routeKey: 0, // Initialize with a number to toggle
        };
    },
    watch: {
        $route(to, from) {
            this.routeKey++; // Increment to force Navbar to re-render
        },
    },
});
