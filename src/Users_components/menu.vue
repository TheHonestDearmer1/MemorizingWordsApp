<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="主页" name="first">主页</el-tab-pane>
      <el-tab-pane label="banners" name="second"><banners :DataList="Banners_DataList"></banners></el-tab-pane>
      <el-tab-pane label="用户评论" name="third"><User_custom :DataList="Custom_DataList"></User_custom></el-tab-pane>
      <el-tab-pane label="关于" name="fourth">about</el-tab-pane>
      <el-tab-pane label="后台管理" name="five"></el-tab-pane>
    </el-tabs>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import User_custom from './custom.vue'
  import banners from './banners.vue'
  import { onBeforeMount, reactive } from 'vue'
  import axios from 'axios';
  import { ElMessage } from 'element-plus'

  let Custom_DataList = reactive([])
  const Custom_fetchData = () => {
  axios
    .get('http://127.0.0.1:5000/admin/custom')
    .then( (response)=> {
      if (response.data.status_code !== 0) {
        ElMessage({
    message: response.data.status_msg,
    type: 'warning',
        })
        
      } else {
        Custom_DataList.splice(0, Custom_DataList.length); // 清空数组
        Custom_DataList.push(...response.data.DataList);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    Banners_fetchData();
};
let Banners_DataList = reactive([])
  const Banners_fetchData = () => {
  axios
    .get('http://127.0.0.1:5000/admin/banners/action')
    .then( (response)=> {
      if (response.data.status_code !== 0) {
        ElMessage({
    message: response.data.status_msg,
    type: 'warning',
        })
        
      } else {
        Banners_DataList.splice(0, Banners_DataList.length); // 清空数组
        Banners_DataList.push(...response.data.DataList);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
onBeforeMount(()=>{
  Custom_fetchData();
})
  var activeName = ref('first')
  const handleClick = (tab: TabsPaneContext, event: Event) => {
   if(tab['props'].name=='five'){
    window.location.href='#/admin'
   }else{
    activeName.value = tab['props'].name as string
   }
  }
  </script>
  <style>
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  </style>