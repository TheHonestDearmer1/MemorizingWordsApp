<template>
    <el-row style="display: grid; gap: 15px;">
        <div v-if="DataList.length == 0">没有数据</div>
      <el-col
        v-for="(o) in DataList"
        :key="o"
      >
        <el-card :body-style="{ padding: '0px'}">
<div style="padding: 20px; display: grid;">
            <span style="display: flex; justify-content: center;">{{o.title}}</span>
            <span style="font-size: medium; font-weight:400">{{o.description}}</span>
            <el-link type="success" :href="'https://'+o.href" target="_blank" >点击了解详细</el-link>
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