<script setup> 

import { ref, computed } from 'vue'
import Home from './AndroidComponents/Home.vue'
const routes = {   
  '/': Home
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

