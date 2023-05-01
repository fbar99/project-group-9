<!-- Added Login Page -->
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { useLoggedInUserStore } from "@/store/loggedInUser";

export default {
  setup() {
    const store = useLoggedInUserStore()
    return { 
      v$: useVuelidate({ $autoDirty: true }), 
      store
    }
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
  //gets org data so it can be associated with a username
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.org = res.data._id
    })
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    login() {
      this.v$.$validate().then((valid) => {
        //if form is valid, then the pinia store login method is executed with email and password params
        if (valid) {
          this.store.login(this.user.email, this.user.password);
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
    <!-- Page Title -->
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Welcome Back!
    </h1>
    <h3
      class="text-2xl text-red-700 tracking-widest text-center"
    >
    Please Sign-In 
    </h3>
    <br>
    <div class="container">
      <form @submit.prevent="login">
            <label class="block">
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
            <!-- form field: password -->
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
              <br><br>
            <!-- submit button: login -->
            <button class="bg-red-700 text-white rounded" type="submit">
              Login
            </button>
          <!-- login credentials -->
          <p><br></p>
          <p>Editor account: <strong>editor@gmail.com</strong></p>
          <p>Viewer account: <strong>viewer@gmail.com</strong></p>
          <p>Password for both accounts: <strong>default</strong></p>
        </form>
    </div>
  </main>
</template>

<style>
    /* container for login form makets it so it's formatted in the center */
    .container {
      margin: 0 auto;
      max-width: 400px;
    }
  </style>
