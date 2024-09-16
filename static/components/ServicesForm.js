export default {
    template: `<div style="margin-left: 400px">
    <input type="text" placeholder="name" v-model="service.name"></input>
    <input type="text" placeholder="price" v-model="service.price"></input>
    <input type="text" placeholder="duration" v-model="service.duration"></input>
    <input type="text" placeholder="description" v-model="service.description"></input>
    <button @click="createService"> Create Service</button>
    </div>`,
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