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
                    <i class="bi bi-house-door"></i> Home
                </router-link>
            </li>
            <li class="nav-item" v-if="role=='admin'">
                <router-link class="nav-link" to="/users">
                    <i class="bi bi-person"></i> Users
                </router-link>
            </li>
            <li class="nav-item" v-if="role=='admin'">
                <router-link class="nav-link" to="/create-service">
                    <i class="bi bi-plus-circle"></i>Create Service
                </router-link>
            </li>
            <li class="nav-item" v-if="role=='customer'">
                <router-link class="nav-link" to="/api/services">Services</router-link>
            </li>
            <li class="nav-item" v-if='is_login' style="margin-left:650px;">
                <a class="nav-link" @click="logout" style="cursor: pointer;">
                    <i class="bi bi-power"></i> Logout
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
    }
},
methods: {
    logout(){
        localStorage.removeItem('auth-token')
        localStorage.removeItem('role')
        this.$router.push('/login')
    },
},

}