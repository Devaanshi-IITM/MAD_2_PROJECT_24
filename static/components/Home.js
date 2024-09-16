import AdminDashboard from "./AdminDashboard.js"
import ProfessionalHome from "./ProfessionalHome.js"
import CustomerHome from "./CustomerHome.js"

export default {
    template: `<div>
    {{$route.query}}
    <AdminDashboard v-if="userRole == 'admin'"/>
    <ProfessionalHome v-if="userRole == 'professional'"/>
    <CustomerHome v-if="userRole === 'customer'"/>
    
    </div>`,
    data() {
        return {
            userRole: localStorage.getItem('role'),
        }
    },
    components: {
        AdminDashboard,
        ProfessionalHome,
        CustomerHome,
    }
}
