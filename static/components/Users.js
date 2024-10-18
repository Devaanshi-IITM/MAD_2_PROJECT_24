export default {
    template: `
    <div style="margin-top: 40px;">
        <div v-if="error"> {{ error }} </div>

        <h3>Customers</h3>
        <div>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="customers.length === 0">
                    <td colspan="3">No customers found.</td>
                </tr>
                <tr v-for="(user, index) in customers" :key="user.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.email }}</td>
                    <td>
                        <button class="btn btn-success" v-if="!user.active" @click="approve(user.id)">Approve</button>
                    </td>  
                </tr>
            </tbody>
        </table>
        </div>
        <br><br>

        <h3>Professionals</h3>
        <div>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="professionals.length === 0">
                    <td colspan="3">No professionals found.</td>
                </tr>
                <tr v-for="(user, index) in professionals" :key="user.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.email }}</td>
                    <td>
                        <button class="btn btn-success" v-if="!user.active" @click="approve(user.id)">Approve</button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
</div>`,
    
    data() {
        return {
            allUsers: null,
            token: localStorage.getItem("auth-token"),
            error: null,
            customers: [],
            professionals: [],
        };
    },
    
    methods: {
        async approve(prof_id) {
            const res = await fetch(`/activate/professional/${prof_id}`, {
                headers: {
                    "Authentication-Token": this.token
                },
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                this.fetchUsers(); // Refresh users after approval
            }
        },
        
        async fetchUsers() {
            const res = await fetch('/users', {
                headers: {
                    "Authentication-Token": this.token,
                },
            });
            const data = await res.json().catch((e) => {});
            if (res.ok) {
                this.allUsers = data;
                this.customers = data.filter(user => user.role.includes('customer'));
                this.professionals = data.filter(user => user.role.includes('professional'));
            } else {
                this.error = res.status;
            }
        }
    },
    
    async mounted() {
        await this.fetchUsers();
    }
}
