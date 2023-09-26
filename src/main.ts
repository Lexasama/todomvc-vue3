import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { createStore } from './stores/todo-list.store'
import { useFetchTodo } from './composables/todo/useFetchTodo'

const { useFetchAll } = useFetchTodo()
const todos = await useFetchAll()

createApp(App).use(router).use(createStore(todos)).mount('#app')
