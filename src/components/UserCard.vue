<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '../types/user'

const props = defineProps<{
  user: User
}>()

defineEmits<{
  (e: 'delete', id: number): void
}>()


const isOpen = ref(true)

function toggleOpen() {
  isOpen.value = !isOpen.value
}


const formattedDob = computed(() => {
  if (!props.user.dob?.date) return ''
  const d = new Date(props.user.dob.date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
})


const formattedGender = computed(() => {
  if (!props.user.gender) return ''
  return props.user.gender.charAt(0).toUpperCase() + props.user.gender.slice(1)
})


const defaultHobbies = [
  { name: 'Travel', color: '#e0f2fe', textColor: '#0369a1' },
  { name: 'Photography', color: '#f3e8ff', textColor: '#6b21a8' },
  { name: 'Hiking', color: '#dcfce7', textColor: '#15803d' },
  { name: 'Reading', color: '#fef3c7', textColor: '#b45309' },
  { name: 'Cooking', color: '#ffe4e6', textColor: '#be123c' },
  { name: 'Music', color: '#e0f2fe', textColor: '#0284c7' }
]
</script>

<template>
  <div class="user-card-container">
    
    <div class="profile-sidebar">
      <img :src="user.picture" :alt="user.name.first" class="avatar" />
      
      <h2 class="full-name">
        {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
      </h2>

      <div class="meta-row">
        <span>♀ {{ formattedGender }}</span>
        <span class="divider">|</span>
        <span>📅 {{ user.dob.age }} years</span>
      </div>

      <div class="info-list">
        <div class="info-item">
          <span class="icon">📍</span>
          <span>{{ user.location.city }}, {{ user.location.state }}, {{ user.location.country }}</span>
        </div>
        <div class="info-item">
          <span class="icon">✉️</span>
          <span>{{ user.email }}</span>
        </div>
        <div class="info-item">
          <span class="icon">📞</span>
          <span>{{ user.phone }}</span>
        </div>
        <div class="info-item">
          <span class="icon">📱</span>
          <span>{{ user.cell }}</span>
        </div>
      </div>

      <button class="delete-btn" @click="$emit('delete', user.id)">Видалити користувача</button>
    </div>

    
    <div class="profile-details">
      
      <div class="accordion-header" @click="toggleOpen">
        <div class="title-group">
          <span class="header-icon">👤</span>
          <h3>About me</h3>
        </div>
        <span class="chevron" :class="{ rotated: !isOpen }">⌄</span>
      </div>

      
      <div v-show="isOpen" class="details-content">
        
        <section class="section-block">
          <div class="section-title">
            <span class="section-icon">🪪</span>
            <h4>Personal Information</h4>
          </div>
          <div class="data-grid">
            <div class="data-row">
              <span class="label">Full name</span>
              <span class="value">{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</span>
            </div>
            <div class="data-row">
              <span class="label">Gender</span>
              <span class="value">{{ formattedGender }}</span>
            </div>
            <div class="data-row">
              <span class="label">Date of birth</span>
              <span class="value">{{ formattedDob }} (age {{ user.dob.age }})</span>
            </div>
            <div class="data-row">
              <span class="label">Email</span>
              <span class="value">{{ user.email }}</span>
            </div>
            <div class="data-row">
              <span class="label">Phone</span>
              <span class="value">{{ user.phone }}</span>
            </div>
            <div class="data-row">
              <span class="label">Cell</span>
              <span class="value">{{ user.cell }}</span>
            </div>
          </div>
        </section>

        
        <section class="section-block">
          <div class="section-title">
            <span class="section-icon">📍</span>
            <h4>Location</h4>
          </div>
          <div class="data-grid">
            <div class="data-row">
              <span class="label">Street</span>
              <span class="value">{{ user.location.street.number }} {{ user.location.street.name }}</span>
            </div>
            <div class="data-row">
              <span class="label">City</span>
              <span class="value">{{ user.location.city }}</span>
            </div>
            <div class="data-row">
              <span class="label">State</span>
              <span class="value">{{ user.location.state }}</span>
            </div>
            <div class="data-row">
              <span class="label">Country</span>
              <span class="value">{{ user.location.country }}</span>
            </div>
            <div class="data-row">
              <span class="label">Postcode</span>
              <span class="value">{{ user.location.postcode }}</span>
            </div>
            <div class="data-row">
              <span class="label">Timezone</span>
              <span class="value">{{ user.location.timezone.offset }} ({{ user.location.timezone.description }})</span>
            </div>
          </div>
        </section>

        
        <section class="section-block">
          <div class="section-title">
            <span class="section-icon">⭐</span>
            <h4>Hobbies</h4>
          </div>
          <div class="tags-container">
            <span 
              v-for="hobby in defaultHobbies" 
              :key="hobby.name"
              class="hobby-tag"
              :style="{ backgroundColor: hobby.color, color: hobby.textColor }"
            >
              {{ hobby.name }}
            </span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-card-container {
  display: flex;
  gap: 24px;
  background: #f8fafc;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  max-width: 960px;
  margin: 0 auto 30px auto;
  color: #1e293b;
  text-align: left;
}

.profile-sidebar {
  width: 280px;
  flex-shrink: 0;
}

.avatar {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 16px;
}

.full-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #0f172a;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.divider {
  color: #cbd5e1;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.875rem;
  color: #475569;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  word-break: break-all;
}

.delete-btn {
  margin-top: 24px;
  width: 100%;
  padding: 10px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.delete-btn:hover {
  background-color: #dc2626;
}

.profile-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}


.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.accordion-header:hover {
  background-color: #f1f5f9;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-group h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.chevron {
  font-size: 1.2rem;
  transition: transform 0.2s ease;
  display: inline-block;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.details-content {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 8px;
}

.section-title h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
}

.data-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.875rem;
}

.data-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: center;
}

.label {
  color: #64748b;
}

.value {
  color: #0f172a;
  font-weight: 500;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hobby-tag {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .user-card-container {
    flex-direction: column;
  }
  .profile-sidebar {
    width: 100%;
  }
}
</style>