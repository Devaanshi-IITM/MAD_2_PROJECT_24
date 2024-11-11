export default {
    template: `
    <div class="login-form-container">
      <form class="p-4 border rounded shadow-sm bg-light">
        <div class="mb-3">
          <label for="user-email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="user-email" placeholder="name@example.com" v-model="cred.email">
        </div>

        <div class="mb-3">
          <label for="user-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="user-password" v-model="cred.password">
        </div>

        <button class="btn btn-primary" @click='login' >Login</button>


        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </form>
      
    </div>
    `,
    data(){
      return{
        cred: {
          email: null,
          password: null,
        },
        error: null,
      }

    },
    methods: {
      async login(){
        const res = await fetch('/user-login',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(this.cred),
      })
      const data = await res.json()
      if(res.ok){
        localStorage.setItem('auth-token', data.token)
        localStorage.setItem('role', data.role) 
        this.$router.push({path: '/'})
        this.$emit('login-success')
      }else {
        this.error = data.message
      }
    },
  },
}