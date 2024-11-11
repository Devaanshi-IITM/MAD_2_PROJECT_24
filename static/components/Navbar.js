export default {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">
        <img src="static/logo.png" alt="Logo" width="100" class="d-inline-block align-top" style="margin-left: 20px;">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link active" to="/">
                    <i class="fas fa-home"></i> Home
                </router-link>
            <li class="nav-item" v-if="role=='admin'">
                <router-link class="nav-link" to="/users">
                    <i class="fas fa-users"></i> Users
                </router-link>
            </li>
            <li class="nav-item" v-if="role=='admin'">
                <router-link class="nav-link" to="/create-service">
                    <i class="fas fa-plus-circle"></i> Create Service
                </router-link>
            </li>
            <li class="nav-item" v-if="role=='customer'">
                <router-link class="nav-link" to="/api/services">
                    <i class="fas fa-concierge-bell"></i> Services
                </router-link>
            </li>

            <!-- Register Dropdown -->
            <li class="nav-item dropdown" v-if="!is_login" style="margin-left:850px;">
                <a class="nav-link dropdown-toggle" to="#" id="registerDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user-plus"></i> Register
                </a>
                <ul class="dropdown-menu" aria-labelledby="registerDropdown">
                    <li>
                        <router-link class="dropdown-item" to="/register/prof">Register as Professional</router-link>
                    </li>
                    <li>
                        <router-link class="dropdown-item" to="/register/customer">Register as Customer</router-link>
                    </li>
                </ul>
            </li>


            <li class="nav-item" v-if='is_login' style="margin-left:650px;">
                <a class="nav-link" @click="logout" style="cursor: pointer;">
                    <i class="fas fa-power-off"></i> Logout
                </a>
            </li>
        </ul>
    </div>
</nav>

    `,
data(){
    return {
        role: localStorage.getItem('role'),
        is_login : localStorage.getItem('auth-token'),
        showRegistration: false,  // Toggle the registration form
        isProfessional: true, 
    }
},
methods: {
    logout(){
        localStorage.removeItem('auth-token')
        localStorage.removeItem('role')
        this.$router.push('/login')
    },
    toggleRegistration() {
        this.showRegistration = !this.showRegistration; // Toggle registration visibility
      },
    toggleRole(isProfessional) {
    this.isProfessional = isProfessional; // Set the registration role type
    },
},

}