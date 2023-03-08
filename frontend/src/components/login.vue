<script>
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      org: '',
      user: {
        email: '',
        password: ''
      }
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.org = res.data._id
      console.log(this.org)
    })
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    login() {
      this.v$.$validate().then((valid) => {
        if (valid) {
          if (this.user.email == "editor@gmail.com" && this.user.password == "default")
            this.$router.push({ name: 'homePage' })
          else if (this.user.email == "viewer@gmail.com" && this.user.password == "default")
            this.$router.push({ name: 'homePage' })
          else
          alert('Username/Password is incorrect.')
          // axios
          //   .get(`${apiURL}/users/lookup/${this.user}`)
          //   .then((res) => {
          //     if (res.data) {
          //       if (res.data.orgs.includes(this.org)) {
          //         alert('Sign in successfull')
          //         this.$router.push({ name: 'homePage' })
          //       }
          //     } else {
          //           alert('Username/Password is incorrect.')
          //           this.user.email = '';
          //           this.user.password = '';
          //     }
          //   })
        }
      })
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      user: {
        email: { email, required },
        password: { required }
      }
    }
  }
}
</script>
<template>
  <main>
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Sign In
    </h1>
    <!-- style="display: flex;align-items: center;justify-content: center;" -->
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="login">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <!-- <div></div> -->
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <!-- <span class="text-gray-700">Email</span> -->
              <input
                type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder="Email"
                v-model="user.email"
              />
              <span class="text-black" v-if="v$.user.email.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.user.email.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
            <br>
            <!-- form field -->
            <input
                type="password"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Password"
                v-model="user.password"
              />
              <span class="text-black" v-if="v$.user.password.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.user.password.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
              <br>
            <!-- submit button -->
            <button class="bg-red-700 text-white rounded" type="submit">
              Login
            </button>
          </div>
          <!-- <div></div> -->
        </div>
      </form>
    </div>
  </main>
</template>
