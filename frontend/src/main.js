import { createApp, markRaw } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'

const app = createApp(App)

// app.config.globalProperties = {
//     usrRole: "guest"
// }

//app.config.globalProperties.$usrRole = "guest"

//create a pinia root store
const pinia = createPinia();
//pinia should be able to use router - has to be setup as plugin
pinia.use(({ store }) => {
  store.$router = markRaw(router)
});

app.use(pinia)
app.use(router)
app.mount('#app')
