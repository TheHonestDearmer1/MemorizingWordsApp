<template>
    <el-table 
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)"
    empty-text="暂无数据"
    :data="filterTableData" style="width: 100%" @expand-change="GetApiOfBaidu">
      <el-table-column label="单词" prop="word" />
      <el-table-column type="expand"
       >
      <template 
      #default="props" >
        <div m="4" >
          <p m="t-0 b-2">百度翻译: {{props.row.RealMean}}</p>
        </div>
      </template>
    </el-table-column>
      <el-table-column label="翻译" prop="mean"/>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="搜索单词" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script setup>
  import axios from 'axios';
import { ElMessage } from 'element-plus';
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { appid, FANYIAPI, MIYAO, Url } from '../untils/IsWap';
import md5 from 'js-md5';

const BaiduMean = ref(true);
const loading = ref(true);
const min = 0;
const max = 1000000;
const CAWord = defineEmits(['CAWord'])
const data = reactive([]);
  onBeforeMount(() => {
    axios.get('http://'+Url+'/GetWordList')
      .then((response)=> {
    console.log(response);
    if(response.data.status_code !== 0){
        ElMessage({
    message: response.data.status_msg,
    type: 'error',
  })
    }else{
      data.splice(0, data.length); // 清空数组
      data.push(...response.data.DataList);
      loading.value = false;
    }
  })
  .catch(function (error) {
    ElMessage({
    message: error,
    type: 'error',
  })
  });
    });

  
  const search = ref('')
  const filterTableData = computed(() =>
    data.filter(
      (data) =>
        !search.value ||
        data.word.toLowerCase().includes(search.value.toLowerCase())
    )
  )

  //修改按钮
  const handleEdit = (index, row) => {
    console.log(index, row.id)
    CAWord('CAWord',row.id);
  }
  const handleDelete = (index, row) => {
    axios.get('http://'+Url+'/WordDelete',{
      params: {
      ID: row.id
    }
    })
      .then((response)=> {
    console.log(response);
    if(response.data.status_code !== 0){
        ElMessage({
    message: response.data.status_msg,
    type: 'error',
  })
    }else{
      data.splice(0, data.length); // 清空数组
      data.push(...response.data.DataList);
    }
    ElMessage({
    message: response.data.status_msg,
    type: 'success',
  })
  window.location.reload();
  })
  .catch(function (error) {
    ElMessage({
    message: error,
    type: 'error',
  })
  });
    console.log(index, row.id)
  }
  //展开详细的单词信息自动读取翻译
  function GetApiOfBaidu(row){
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    const str = appid+row.word+randomInt+MIYAO
    const sign = md5(str).toLowerCase();
    axios.get('./demo',{
    params: {
      q: row.word,
      from:"en",
      to:"zh",
      appid: appid,
      salt:randomInt,
      sign
    },headers:{
		'Access-Control-Allow-Origin':'*',//允许跨域
        'Content-Type':'application/x-www-form-urlencoded'
    }
  }).then(response=>{
    row.RealMean = response.data.trans_result[0].dst;
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  
  </script>