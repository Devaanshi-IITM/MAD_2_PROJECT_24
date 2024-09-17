export default {
    template: `
    <div class="sidenav">
        <h2 class="text-center"></h2>
        <ul class="nav flex-column">

            <img src="static/logo.png" alt="Logo" style="margin-left: 50 px; "width="200"  class="d-inline-block align-top">

            <li class="nav-item">
                <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="role=='admin'">
                <router-link class="nav-link" to="/users">Users</router-link>
            </li>
            <li class="nav-item" v-if="role=='admin'">
                <router-link class="nav-link" to="/create-service">Create Service</router-link>
            </li>
            <li class="nav-item " v-if='is_login'>
               <a class="nav-link" @click="logout" style="text-decoration: none; color: #007bff; cursor: pointer;">Logout</a>
            </li>
        </ul>
    </div>
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