<template>
  <div>
    <input type="text" class="new-todo" placeholder="What needs to be done?" v-model="title"
           @keydown.esc.exact="resetInput" @keydown.enter.exact="handleAdd"
           :autofocus="!isEditMode"
           @focus="exitEditMode"/>
  </div>
</template>
<script setup lang="ts">
import {useTodoStore} from "@/stores/todo-list.store";
import { ref} from "vue";
import {storeToRefs} from "pinia";

const title = ref("");

const resetInput = () => {
  title.value = "";
}

const todoStore = useTodoStore();
const {isEditMode} = storeToRefs(todoStore)

const {create, exitEditMode} = useTodoStore();

const handleAdd = async () => {

  const input = title.value.trim();

  if (input.length === 0) {
    return;
  }
  await create(title.value);
  resetInput();
}

</script>