import { defineStore } from 'pinia'

//defining a store
export const useServiceListStore= defineStore({
  // id is only required for devtools with the Pinia store
  id: 'serviceList',
  //central part of the store
  state: () => {
    const first = {
      id: 1,
      name: "Test1 - dynamically loaded",
      status: "Active",
      description: "My description one"
    }
    const second = {
      id: 2,
      name: "Test2 - dynamically loaded",
      status: "Active",
      description: "My description two"
    }
    const third = {
      id: 3,
      name: "Test3 - dynamically loaded",
      status: "Active",
      description: "My description three" 
    }
    const fourth = {
      id: 4,
      name: "Test4 - dynamically loaded",
      status: "Not Active",
      description: "My description four"
    }
    return {
      serviceList: [first,second,third,fourth],
      idIndex: 4
    }
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
     add(name, status, description) {
      try {
        //dictionary is created with passed values from user
        const newService = {
          id: this.idIndex,
          name: name,
          status: status,
          description: description
        }
        //values are pushed into array and index is increased
        this.serviceList.push(newService)
        this.$patch()
        this.$patch(
          {
          idIndex: this.idIndex+1
        })
        alert('Service added successfully.');
        console.log(this.serviceList);
        this.$router.push("findservices");
      } catch(error) {
        console.log(error)
        alert('Service ADD FAILED, check log.')
      }
    },
     edit(id, name, status, description) {
      try {
        const index = this.serviceList.findIndex((dict) => dict.id == id);
        console.log(index)

        //id index is passed by user into method and then used to find the correct dictionary in array
        //and then updates each value with passed in values
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
        //adds all dictionaries that don't contain the ID passed in
        //to the dictionary, effectively removing the one that matches the ID
        this.serviceList = this.serviceList.filter((dict) => dict.id !== id);
        this.$patch()
        console.log(this.serviceList)
        alert('Service deleted successfully.')
        this.$router.push("findservices");
      } catch(error) {
        console.log(error)
        alert('Service DELETE error, check log.')
      }
    }
  }
});

