export default {
    template: `<div class="card shadow" style="max-width: 400px; margin: 50px auto;">
    <div class="card-body">
        <h2 class="card-title" style="text-align: center;">Create Service</h2>
        <form @submit.prevent="createService">
            <div class="mb-3">
                <label for="serviceName" class="form-label">Service Name</label>
                <input type="text" id="serviceName" class="form-control" placeholder="Enter service name" v-model="service.name" required>
            </div>
            <div class="mb-3">
                <label for="servicePrice" class="form-label">Price</label>
                <input type="text" id="servicePrice" class="form-control" placeholder="Enter price" v-model="service.price" required>
            </div>
            <div class="mb-3">
                <label for="serviceDuration" class="form-label">Duration</label>
                <input type="text" id="serviceDuration" class="form-control" placeholder="Enter duration" v-model="service.duration" required>
            </div>
            <div class="mb-3">
                <label for="serviceDescription" class="form-label">Description</label>
                <textarea id="serviceDescription" class="form-control" placeholder="Enter description" v-model="service.description" rows="3" required></textarea>
            </div>
            <button type="button" class="btn btn-success" @click="createService" style="width: 100%;">Create Service</button>
        </form>
    </div>
</div>


    `,
    data(){
        return{
            service:{
                name: null,
                price: null,
                duration: null,
                description: null,
            },
            token: localStorage.getItem('auth-token'),
        }
    },
    methods: {
        async createService(){
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: {
                    'Authentication-Token' : this.token,
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(this.service), 
            })

            const data = await res.json()
            if(res.ok){
                alert(data.message)
            }
        },
    },
}