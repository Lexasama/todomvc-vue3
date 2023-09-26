<template>
  <div class="view">
    <input type="checkbox" class="toggle" :checked="todo.completed"
           @change="onToggle(todo)" :id="`todo-${todo.id}`"/>
    <label @dblclick="toEditMode">
      {{ todo.title }}
    </label>
    <button class="destroy" name="destroy" @click="onRemove(todo.id)"></button>
  </div>

  <input v-if="isEditMode &&( editStatus.id === todo.id) "
         v-model="newTitle"
         class="edit"
         type="text"
         @focusout="console.log('ééé')"
         @blur="editTodo"
         @keyup.enter.exact="editTodo"
         @keyup.esc.exact="cancelEdit"
         v-focus
  />
</template>

<script setup lang="ts">
import {useTodoStore} from '@/stores/todo-list.store';
import type {Todo} from './Todo';
import {ref} from "vue";
import {storeToRefs} from "pinia";

const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus()
}


const props = defineProps<{ todo: Todo }>();

const todoStore = useTodoStore();
const {editStatus, isEditMode} = storeToRefs(todoStore);

const {deleteOne, update, exitEditMode, enterEditMode} = useTodoStore();

const newTitle = ref<string>(props.todo.title)

const onToggle = async (todo: Todo) => {
  await update(todo.id, {...todo, completed: !todo.completed})
}

const onRemove = async (id: number) => {
  await deleteOne(id);
}

const editTodo = async () => {
  const title = newTitle.value.trim();
  if (title.length > 0) {
    await update(props.todo.id, {...props.todo, title: title})
  } else {
    await deleteOne(props.todo.id);
  }

  exitEditMode();
}

const cancelEdit = () => {
  newTitle.value = props.todo.title;
  exitEditMode();

}

const toEditMode = () => {
  enterEditMode(props.todo.id)
}

</script>