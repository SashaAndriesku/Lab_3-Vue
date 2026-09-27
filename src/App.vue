<script setup lang="ts">
import Users from './components/Users.vue'
</script>

<template>
  <main class="app-main">
    <h1>Список користувачів</h1>
    
    <Users />
  </main>
</template>

<style scoped>
.app-main {
  min-height: 100vh;
  background-color: #f1f5f9;
  padding: 30px 20px;
}

h1 {
  text-align: center;
  color: #0f172a;
  margin-bottom: 24px;
}
</style>