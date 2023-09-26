<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <todo-header />
    </header>
    <todo-list />

    <todo-footer />

  </section>
</template>

<script setup lang="ts">
import TodoHeader from "@cmp/todo-list/todo-header.vue";
import TodoList from "@/components/todo-list/todo-list.vue";
import TodoFooter from "@/components/todo-list/todo-footer.vue";
</script>