<template>
  <div class="new" style="display:grid;">
   <word-list @CAWord="CAWord" ></word-list>
  <AddWord v-if="boolwordadd" style="position: fixed;
  bottom: 0%;"  @CAWord="CAWord"></AddWord>
  <ChangeWord  v-if="!boolwordadd" style="position: fixed;
  bottom: 0%;"  @CAWord="CAWord" :ID="changeID"></ChangeWord>
  </div>
</template>
<script setup>
import AddWord from './AddWord.vue'
import ChangeWord from './ChangeWord.vue';
import WordList from './WordList.vue'
import { ref } from 'vue';
var boolwordadd = ref(true)
var changeID = ref(0)
function CAWord(ChangeID){
  boolwordadd.value = !boolwordadd.value;
changeID.value = ChangeID;
}
</script>