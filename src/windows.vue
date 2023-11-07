<script setup> 
import banners from './components/banners1.vue';
import login from './components/login.vue'
import home from './components/home.vue'
import custom from './components/custom.vue'
import user_home from './Users_components/menu.vue'
import { ref, computed } from 'vue'

const routes = {   
  '/admin': home,      //创建路由指定的位置
  '/admin/banners': banners,
  '/admin/login':login,
  '/admin/custom':custom,
  '/': user_home
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>

<template>
<n-message-provider>
    <component :is="currentView"/>
</n-message-provider>
</template>

