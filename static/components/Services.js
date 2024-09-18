export default {
    template: `<div style="margin-left: 400px"> 

    <h3> {{service.name}} </h3>
    <p>{{service.price}}</p>
    <p>{{service.duration}}</p>
    <p>{{service.description}}</p>
    <button v-if="role=='customer'" class="btn btn-primary" @click="requestService"> Request Service </button>

    </div>`,
    props: ['service'],
    data(){
        return{
            role: localStorage.getItem('role'),
            authToken: localStorage.getItem('auth-token')
        }
    },
    methods: {
        async requestService(id){
            const res = await fetch(`/service/${this.service.id}/request`, {
                headers: {
                    "Authentication-Token": this.authToken
                },
            })
            const data = await res.json()
            if (res.ok){
                alert(data.message)
                this.$router.go(0)
            }
            else{
                alert(data.message)
            }
        },
    },
}