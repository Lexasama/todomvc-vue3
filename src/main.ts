import './assets/main.css'

import {createApp} from 'vue'

import App from './App.vue'
import router from './router'
import {createStore} from './stores/todo-list.store'
import {useFetchTodo} from './composables/todo/useFetchTodo'

const {useFetchAll} = useFetchTodo()
const todos = await useFetchAll()

const app = createApp(App)
app.use(router)
app.use(createStore(todos))


app.mount('#app')
