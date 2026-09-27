<script setup lang="ts">
import { ref, computed } from 'vue'
import usersData from './data/user.json'
import UserCard from './components/UserCard.vue'
import type { User } from './types/user'

const users = ref<User[]>(usersData as User[])
const searchQuery = ref('')

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return users.value.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
    const email = user.email.toLowerCase()
    return fullName.includes(query) || email.includes(query)
  })
})

function removeUser(id: number) {
  users.value = users.value.filter((u) => u.id !== id)
}
</script>

<template>
  <main class="app-container">
    <h1>Управління користувачами</h1>
    
    <div class="controls">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Пошук за ім'ям або email..." 
        class="search-input"
      />
    </div>

    <div class="cards-list">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        @delete="removeUser"
      />
    </div>
    
    <p v-if="filteredUsers.length === 0" class="empty-msg">Користувачів не знайдено.</p>
  </main>
</template>

<style scoped>
.app-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Inter, system-ui, sans-serif;
  background-color: #f1f5f9;
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1.2rem;
  font-size: 1rem;
  margin-bottom: 2rem;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  outline: none;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #3b82f6;
}

.cards-list {
  display: flex;
  flex-direction: column;
}

.empty-msg {
  text-align: center;
  color: #64748b;
  margin-top: 2rem;
}
</style>