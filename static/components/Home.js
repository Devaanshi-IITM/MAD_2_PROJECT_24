import AdminDashboard from "./AdminDashboard.js"
import ProfessionalHome from "./ProfessionalHome.js"
import CustomerHome from "./CustomerHome.js"
import Services from "./Services.js"

export default {
    template: `<div>
    
    <AdminDashboard v-if="userRole == 'admin'"/>
    <ProfessionalHome v-if="userRole == 'professional'"/>
    <CustomerHome v-if="userRole === 'customer'"/>
    <Services v-for="(service, index) in services" :key='index' :service = "service" />
    </div>`,
    data() {
        return {
            userRole: localStorage.getItem('role'),
            authToken: localStorage.getItem('auth-token'),
            services: [],
        }
    },
    components: {
        AdminDashboard,
        ProfessionalHome,
        CustomerHome,
        Services,
    },
    async mounted(){
        const res = await fetch('/api/services', {
            headers: {
                "Authentication-Token": this.authToken,
            }
        })
        const data = await res.json()
        if(res.ok){
            this.services = data
        }
        else{
            alert(data.message)
        }
    },
}
