import AdminDashboard from "./AdminDashboard.js"
import ProfessionalHome from "./ProfessionalHome.js"
import CustomerHome from "./CustomerHome.js"
import Services from "./Services.js"
import Login from "./Login.js"
import RegisterProf from "./RegisterProf.js";       
import RegisterCustomer from "./RegisterCustomer.js";

export default {
    template: `<div>
    
    <AdminDashboard v-if="userRole === 'admin'"/>
    <ProfessionalHome v-if="userRole === 'professional'"/>
    <CustomerHome v-if="userRole === 'customer'"/>
    <Services v-for="(service, index) in services" :key='index' :service = "service" />

    <button v-if="!userRole" @click="toggleRegistration">Register</button>

        <!-- Conditional rendering of registration component based on role -->
        <RegisterProf v-if="showRegistration && isProfessional" @registration_success="RegistrationSuccess" />
        <RegisterCustomer v-if="showRegistration && !isProfessional" @registration_success="RegistrationSuccess" />

        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="loading">Loading services...</div>
</div>`,
    data() {
        return {
            userRole: localStorage.getItem('role'),
            authToken: localStorage.getItem('auth-token'),
            services: [],
            showRegistration: false,
            loading: false,
            error: null,
            isProfessional: true,
        };
    },
    components: {
        AdminDashboard,
        ProfessionalHome,
        CustomerHome,
        Services,
        Login,
        RegisterProf,
        RegisterCustomer,
    },
    async mounted() {
        this.loading = true;
        try {
            const res = await fetch('/api/services', {
                headers: {
                    "Authentication-Token": this.authToken,
                }
            });
            const data = await res.json();
            if (res.ok) {
                this.services = data;
            } else {
                this.error = data.message;
            }
        } catch (err) {
            this.error = "An error occurred while fetching services.";
        } finally {
            this.loading = false;
        }
    },
    methods: {
        LoginSuccess() {
            this.userRole = localStorage.getItem('role');
            this.authToken = localStorage.getItem('auth-token');
        },
        RegistrationSuccess() {
            this.userRole = localStorage.getItem('role');
            this.showRegistration = false;
            alert("Registered Successfully!")
            
        },
        toggleRegistration() {
            this.showRegistration = !this.showRegistration;
            this.isProfessional = true; // Reset to professional registration by default
        },
        // toggle between professional and customer registration
        toggleRole(isProfessional) {
            this.isProfessional = isProfessional;
        },
    },
};