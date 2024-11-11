export default {
    template: `
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-lg-6 col-md-8 col-12">  
      <div class="card shadow-sm p-4 mb-4 bg-light">
        <div class="card-body">
        <h3 style="text-align:center;"> Customer Signup</h3>
          <form @submit.prevent="register"
      
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="cred.email" required>
          </div>
  
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="cred.password" required>
          </div>
  
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="customer.name" required>
          </div>
  
          <div class="mb-3">
            <label for="contact" class="form-label">Contact</label>
            <input type="tel" class="form-control" id="contact" v-model="customer.contact" maxlenght="10" required>
          </div>

          <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <input type="text" class="form-control" id="address" v-model="customer.address" required>
          </div>

          <div class="mb-3">
            <label for="pincode" class="form-label">Pincode</label>
            <input type="number" class="form-control" id="pincode" v-model="customer.pincode" maxlenght="6" required>
          </div>
  
          <button class="btn btn-primary" @click='register'>Register</button>
  
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          </form>

          <div class="mt-3 text-center">
              <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>  
    `,
    data() {
      return {
        cred: {
          email: null,
          password: null,
        },
        customer: {
          name: '',
          contact: '',
          address:'',
          pincode:''
        },
        error: null,
      };
    },
    methods: {
      async register() {
        const Data = {
          email: this.cred.email,
          password: this.cred.password,
          role: 'customer',
          ...this.customer,
        };
  
        const res = await fetch(location.origin+'/register/customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Data),
        });
  
        const data = await res.json();
        if (res.ok) {
          console.log("registeration-success")
          //this.$emit('registration-success');
        } else {
          this.error = data.message;
        }
      },
    },
  };
  

//   data(){
//     return {
//         email : null,
//         password : null,
//         role : null,
//     } 
// },
// methods : {
//     async submitLogin(){
//         const res = await fetch(location.origin+'/register', 
//             {method : 'POST', 
//                 headers: {'Content-Type' : 'application/json'}, 
//                 body : JSON.stringify({'email': this.email,'password': this.password, 'role' : this.role})
//             })
//         if (res.ok){
//             console.log('we are register')
//         }
//     }
// }
// }