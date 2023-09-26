<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" :checked="!allDone"
           @click="markAllAsCompleted"
    >
    <label for="toggle-all" v-if="hasTodos">Mark all as complete</label>
    <ul class="todo-list">
      <li v-for="todo in todoList" :key="todo.id"
          :class="{ 'completed': todo.completed, 'editing': editValue.isEditing && (editValue.id === todo.id)}">
        <todo-item :todo="todo"/>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import todoItem from "./todo-item.vue";
import {useTodoStore} from "@/stores/todo-list.store";
import {storeToRefs} from "pinia";

const todoStore = useTodoStore()

const {todoList, hasTodos, allDone, editValue} = storeToRefs(todoStore)

const {completeAll} = useTodoStore();
const markAllAsCompleted = async () => {
  await completeAll(!allDone.value)
}

</script>