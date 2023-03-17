import { defineStore } from 'pinia'

//defining a store
export const useServiceListStore= defineStore({
  // id is only required for devtools with the Pinia store
  id: 'serviceList',
  //central part of the store
  state: () => {
    const newService = {
      id: 1,
      name: "Test",
      status: "Active",
      description: "My description"
    }
    return {
      serviceList: [newService],
      idIndex: 2
    }
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
     add(name, status, description) {
      try {
        //const response = await apiLogin(email, password);
        const newService = {
          id: this.idIndex,
          name: name,
          status: status,
          description: description
        }
        this.serviceList.push(newService)
        this.$patch()
        this.$patch(
          {
          idIndex: this.idIndex+1
        })
        alert('Service added successfully.');
        console.log(this.serviceList);
        this.$router.push("/");
      } catch(error) {
        console.log(error)
        alert('Service ADD FAILED, check log.')
      }
    },
     edit(id, name, status, description) {
      try {
        const index = this.serviceList.findIndex((dict) => dict.id == id);
        console.log(index)

        if (index !== -1) {
          this.serviceList[index].name = name;
          this.serviceList[index].status = status;
          this.serviceList[index].description = description;
        }
        console.log(this.serviceList[index].name)

        this.$patch()

        alert('Service edited successfully.')
        this.$router.push("/");
      } catch(error) {
        alert('Service EDIT error, check log.')
        console.log(error)
      }
    },
     delete(id) {
      try {
        //const index = this.serviceList.findIndex((dict) => dict.id == id);
        //console.log(index)
        this.serviceList = this.serviceList.filter((dict) => dict.id !== id);
        this.$patch()
        console.log(this.serviceList)
        alert('Service deleted successfully.')
        this.$router.push("/");
      } catch(error) {
        console.log(error)
        alert('Service DELETE error, check log.')
      }
    }
  }
});

