<template>
  <div class="view">
    <input type="checkbox" class="toggle" :checked="todo.completed"
           @change="onToggle(todo)" :id="`todo-${todo.id}`"/>
    <label @dblclick="onEditMode(todo.id)">
      {{ todo.title }}
    </label>
    <button class="destroy" name="destroy" @click="onRemove(todo.id)"></button>
    <input type="text"
           class="edit"
           v-model="todo.title"
           @blur="exitEditMode"
           @keyup.esc.exact="exitEditMode"
    >
  </div>
</template>

<script setup lang="ts">
import {useTodoStore} from '@/stores/todo-list.store';
import type {Todo} from './Todo';

defineProps<{ todo: Todo, isEditing: boolean }>();

const {deleteOne, update} = useTodoStore();

const onToggle = async (todo: Todo) => {
  await update(todo.id, {...todo, completed: !todo.completed})
}

const onRemove = async (id: number) => {
  await deleteOne(id);
}

const emit = defineEmits<{
  onEditMode: [id: number]
}>();
const onEditMode = (id: number) => {
  emit('onEditMode', id);
}

const exitEditMode = () => {
  onEditMode(-1)
}
</script>