<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" :checked="!allDone"
           @click="markAllAsCompleted"
    >
    <label for="toggle-all" v-if="hasTodos">Mark all as complete</label>
    <ul class="todo-list">
      <li v-for="todo in todoList" :key="todo.id"
          :class="{ 'completed': todo.completed, 'editing': (editStatus.isEditing && (editStatus.id === todo.id))}">
        <todo-item :todo="todo"
                   :is-editing="editStatus.isEditing"
                   @onEditMode="toggleEditingMode"/>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import todoItem from "./todo-item.vue";
import {useTodoStore} from "@/stores/todo-list.store";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const todoStore = useTodoStore()

const {todoList, hasTodos, allDone} = storeToRefs(todoStore)


const {completeAll} = useTodoStore();
const markAllAsCompleted = async () => {
  await completeAll(!allDone.value)
}
const defaultEditStatus = {isEditing: false, id: -1};
const editStatus = ref<{ isEditing: boolean, id: number }>({...defaultEditStatus});
const toggleEditingMode = (id: number) => {

  editStatus.value.isEditing = !editStatus.value.isEditing;
  editStatus.value.id = id;

  console.log(editStatus)
}

</script>