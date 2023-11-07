<template>
    <el-row style="display: grid; gap: 15px;">
      <div v-if="DataList.length == 0">没有数据</div>
      <el-col
        v-for="(o) in DataList"
        :key="o"
      >
        <el-card :body-style="{ padding: '0px'}">
<div style="padding: 20px; display: grid; grid-template-columns: 60px auto; grid-template-rows: auto auto;">
  <el-avatar :size="50" :src="o.src" style="grid-column: 1/2; grid-row: 1/3;"/>
            <span style="grid-column: 2/3; grid-row: 1/2; display: flex; justify-content: center;">{{o.title}}</span>
            <span style="font-size: medium; grid-column: 2/3; grid-row: 2/3;font-weight:400">{{o.description}}</span>
</div>
        </el-card>
      </el-col>
    </el-row>
  </template>
  
  <script setup>
const props = defineProps({
DataList:{
type:Array,
requre: true
}
})
  </script>
  
  <style>
  </style>