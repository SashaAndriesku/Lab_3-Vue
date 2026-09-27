<script setup lang="ts">
import { ref, computed } from 'vue'
import usersData from '../data/user.json'
import UserCard from './UserCard.vue'
import type { User } from '../types/user'

const users = ref<User[]>(usersData as User[])


const searchQuery = ref('')
const genderFilter = ref<'all' | 'male' | 'female'>('all')
const ageFilter = ref<'all' | '18+'>('all')
const sortBy = ref<'none' | 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc'>('none')


const filteredUsers = computed(() => {
  let result = [...users.value]

  
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(u => {
      const fullName = `${u.name.first} ${u.name.last}`.toLowerCase()
      const email = u.email.toLowerCase()
      return fullName.includes(query) || email.includes(query)
    })
  }

  
  if (genderFilter.value === 'male') {
    result = result.filter(u => u.gender === 'male')
  } else if (genderFilter.value === 'female') {
    result = result.filter(u => u.gender === 'female')
  }

  
  if (ageFilter.value === '18+') {
    result = result.filter(u => u.dob.age >= 18)
  }

  
  if (sortBy.value === 'name-asc') {
    result.sort((a, b) => a.name.first.localeCompare(b.name.first))
  } else if (sortBy.value === 'name-desc') {
    result.sort((a, b) => b.name.first.localeCompare(a.name.first))
  } else if (sortBy.value === 'age-asc') {
    result.sort((a, b) => a.dob.age - b.dob.age)
  } else if (sortBy.value === 'age-desc') {
    result.sort((a, b) => b.dob.age - a.dob.age)
  }

  return result
})


function resetAll() {
  searchQuery.value = ''
  genderFilter.value = 'all'
  ageFilter.value = 'all'
  sortBy.value = 'none'
}

function removeUser(id: number) {
  users.value = users.value.filter(u => u.id !== id)
}
</script>

<template>
  <div class="users-container">
    
    <div class="toolbar">
      
      <div class="filter-group">
        <span class="label">Пошук:</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Введіть ім'я або email..."
          class="search-input"
        />
      </div>

      
      <div class="filter-group">
        <span class="label">Стать:</span>
        <button :class="{ active: genderFilter === 'all' }" @click="genderFilter = 'all'">Всі</button>
        <button :class="{ active: genderFilter === 'male' }" @click="genderFilter = 'male'">Чоловіки</button>
        <button :class="{ active: genderFilter === 'female' }" @click="genderFilter = 'female'">Жінки</button>
      </div>

      
      <div class="filter-group">
        <span class="label">Вік:</span>
        <button :class="{ active: ageFilter === 'all' }" @click="ageFilter = 'all'">Всі</button>
        <button :class="{ active: ageFilter === '18+' }" @click="ageFilter = '18+'">18 +</button>
      </div>

      
      <div class="filter-group">
        <span class="label">Сортування:</span>
        <button :class="{ active: sortBy === 'name-asc' }" @click="sortBy = 'name-asc'">Ім’я ↑</button>
        <button :class="{ active: sortBy === 'name-desc' }" @click="sortBy = 'name-desc'">Ім’я ↓</button>
        <button :class="{ active: sortBy === 'age-asc' }" @click="sortBy = 'age-asc'">Вік ↑</button>
        <button :class="{ active: sortBy === 'age-desc' }" @click="sortBy = 'age-desc'">Вік ↓</button>
      </div>

      
      <div class="filter-group">
        <button class="reset-btn" @click="resetAll">Очистити все</button>
      </div>
    </div>

    
    <div v-if="filteredUsers.length > 0" class="users-list">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        @delete="removeUser"
      />
    </div>

    
    <p v-else class="empty-message">Список юзерів пустий</p>
  </div>
</template>

<style scoped>
.users-container {
  max-width: 960px;
  margin: 0 auto;
}

.toolbar {
  background: #ffffff;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.label {
  font-weight: 600;
  color: #475569;
  min-width: 100px;
  font-size: 0.9rem;
}

.search-input {
  padding: 6px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.875rem;
  width: 100%;
  max-width: 320px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #2563eb;
}

button {
  padding: 6px 14px;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  color: #334155;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #e2e8f0;
}

button.active {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.reset-btn {
  background-color: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
  font-weight: 600;
}

.reset-btn:hover {
  background-color: #dc2626;
}

.users-list {
  display: flex;
  flex-direction: column;
}

.empty-message {
  text-align: center;
  color: #64748b;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 40px;
}
</style>