<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { useServiceListStore } from "@/store/serviceStore";
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    const list = useServiceListStore();
    return {
      // removed unnecessary extra array to track services
      org: '',
      services: {
        name: '',
        status: '',
        description: ''
      }
    }
  },
  methods: {
    async add() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
        if (isFormCorrect) {
        this.store.add(this.services.name, this.services.status, this.services.description);
        alert('Service has been added.')
        .catch((error) => {
          console.log(error)
        })
        }

        // axios
        //   .post(`${apiURL}/services`, this.newService)
        //   .then(() => {
        //     alert('Service has been added.')
        //     this.$router.push({ name: 'findservices' })
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
      
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      services: {
        name: { required },
        status: { required }
      }
    }
  }
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Create New Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <!-- <form @submit.prevent="handleSubmitForm"> -->
        <form @submit.prevent="add">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Service Details</h2>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="services.name"
              />
              <span class="text-black" v-if="v$.services.name.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.services.name.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Status</span>
              <span style="color: #ff0000">*</span>
          </label>
              <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="services.status"
          >
            <option value="Service Active">Active</option>
            <option value="Service Not Active">Not Active</option>
          </select>
              <span class="text-black" v-if="v$.services.status.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.services.name.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            <!-- </label> -->
          </div>

          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
              ></textarea>
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>

        </div>


        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Add New Service
          </button>
        </div>
      </form>
    </div>
  </main>
</template>