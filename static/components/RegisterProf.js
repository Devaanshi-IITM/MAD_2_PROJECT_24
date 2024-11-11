export default {
    template: `
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8 col-12">  
        <div class="card shadow-sm p-4 mb-4 bg-light">
          <div class="card-body">
          <h3 style="text-align:center;"> Professional Signup</h3><br>
          <form @submit.prevent="register">
            <!-- Email Address -->
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="cred.email" required>
            </div>

            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="cred.password" required>
            </div>

            <!-- Name -->
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="professional.name" required>
            </div>

            <!-- Service Name -->
            <div class="mb-3">
              <label for="service_name" class="form-label">Service Type</label>
              <input type="text" class="form-control" id="service_name" v-model="professional.service_name" required>
            </div>

            <!-- Experience -->
            <div class="mb-3">
              <label for="experience" class="form-label">Experience (Years)</label>
              <input type="number" class="form-control" id="experience" v-model="professional.experience" required>
            </div>

            <!-- Document URL -->
            <div class="mb-3">
              <label for="document" class="form-label">Upload Document (URL)</label>
              <input type="text" class="form-control" id="document" v-model="professional.documents" required>
            </div>

            <!-- Contact Number -->
            <div class="mb-3">
              <label for="contact" class="form-label">Contact</label>
              <input type="text" class="form-control" id="contact" v-model="professional.contact" required>
            </div>

            <!-- Address -->
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <input type="text" class="form-control" id="address" v-model="professional.address" required>
            </div>

            <!-- Pincode -->
            <div class="mb-3">
              <label for="pincode" class="form-label">Pincode</label>
              <input type="text" class="form-control" id="pincode" v-model="professional.pincode" required>
            </div>

            <!-- Register Button -->
            <button class="btn btn-primary" >Register</button>

            <!-- Error Message -->
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
  emits: ["registration_success"],
    data() {
      return {
        cred: {
          email: null,
          password: null,
        },
        professional: {
          name: '',
          service_name: '',
          experience: '',
          documents:'',
          contact:'',
          address:'',
          pincode:''
        },
        error: null,
      };
    },
    created(){
      this.$emit('registration_success')
    },
    methods: {
      async register() {
        const Data = {
          email: this.cred.email,
          password: this.cred.password,
          role: 'professional',
          ...this.professional,
        };
  
        const res = await fetch('/register/prof', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Data),
        });
  
        const data = await res.json();
        if (res.ok) {
          this.$emit('registration_success');
        } else {
          this.error = data.message;
        }
      },
    },
  };
  