<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { useServiceListStore } from "@/store/serviceStore";

export default {
  data() {
    // added constant values from the service store
    const originalList = useServiceListStore();
    const list = originalList;
    return {
      queryData: [],
      // Parameter for search to occur
      searchBy: '',
      name: '',
      status: '',
      services: [],
      originalList,
      list
    }
  },
  created() {
    this.getServices()
  },
  methods: {
    handleSubmitForm() {
      let endpoint = ''
      if (this.searchBy === 'Service Name') {
        console.log(this.list)
        //makes list that has name of service that user wants by using the original one as the source
        this.list = this.originalList.serviceList.filter(obj => obj.name.includes(this.name));
        console.log(this.list)
      } else if (this.searchBy === 'Service Status') {
        //makes list that has name of service that user wants by using the original one as the source
        this.list = this.originalList.serviceList.filter(obj => obj.status.includes(this.status));
        console.log(this.list)
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.queryData = res.data
      })
    },
    // abstract get service call
    getServices() {
      this.list = this.originalList
      window.scrollTo(0, 0)
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.status = ''
 

      // get all services
      this.getServices()
    },
    editService(servicesID) {
      //when list item is clicked, it routes user to the edit page with its ID
      this.$router.push({ name: 'servicedetails', params: { id: servicesID } })
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
        Find Service
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Search Service By </h2> 
        <!-- Displays Service Name search field -->
        
        <!-- Search Service By isn't fully working but edit and delete service both work -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Name">Service Name</option>
            <option value="Service Status">Service Status</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="name"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter name"
            />
          </label>
        </div>

        <!-- Displays Service Status search field -->
        <div class="flex flex-col" v-if="searchBy === 'Service Status'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="status"
            v-on:keyup.enter="handleSubmitForm"
            placeholder="Enter service status"
          />
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div></div>
        <div></div>
        <!-- clears the search bar -->
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          <!-- submit bar for search for services  -->
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >
            Search Service
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
    <!-- Everything in this section is working -->
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-6 text-left">Name</th>
              <th class="p-6 text-left">Status</th>
              <th class="p-6 text-left">Description</th>
            </tr>
          </thead>
          <!-- a loop that iterates over imported service list and allows to click them to edit them-->
          <tbody class="divide-y divide-gray-300">
            <!-- Displays the users newly created services using the @click -->
            <tr
              @click="editService(serviceObject.id)"
              v-for="serviceObject in list.serviceList"
              :key="serviceObject.id"
            >
              <td class="p-2 text-left">
                {{ serviceObject.name }}
              </td>
              <td class="p-2 text-left">
                {{ serviceObject.status }}
              </td>
              <td class="p-2 text-left">
                {{ serviceObject.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
