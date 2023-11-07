<template>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="单词" prop="word" />
      <el-table-column label="翻译" prop="mean" />
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
import { Url } from '../untils/IsWap';


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
  
  </script>