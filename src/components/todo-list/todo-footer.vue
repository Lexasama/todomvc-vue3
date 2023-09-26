<template>
  <footer class="footer" v-if="hasTodos">
    <span class="todo-count"></span>
    <ul class="filters">
      <li>
        <router-link to="#/" class="selected">All</router-link>
      </li>
      <li>
        <router-link to="#/active">Active</router-link>
      </li>
      <li>
        <router-link to="#/completed">Completed</router-link>
      </li>
    </ul>
    <button class="clear-completed" v-if="hasCompletedItems" @click="deleteCompleted">Clear completed</button>
  </footer>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todo-list.store';
import {storeToRefs} from "pinia";


const todoStore = useTodoStore()

const { hasTodos, hasCompletedItems} = storeToRefs(todoStore);
const {deleteCompleted} = useTodoStore()

</script>