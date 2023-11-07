<template>
    <div class="demo-collapse" style="width: 100%" >
      <el-collapse>
        <el-collapse-item title="添加单词" name="1" style="width: 100%; ">
            <el-form
    :label-position="top"
    :model="formLabelAlign"
    style=" margin-left:20px; margin-right:20px;"
  >
    <el-form-item label="单词">
      <el-input v-model="formLabelAlign.word" />
    </el-form-item>
    <el-form-item label="含义">
      <el-input
    :rows="2"
    type="textarea"
    v-model="formLabelAlign.mean" 
  />
    </el-form-item>
    <el-button type="primary" @click="addword">添加</el-button>
  </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </template>
  
  <script lang="ts" setup>
  import axios from 'axios'
  import { reactive} from 'vue'
  import { ElMessage } from 'element-plus'
import { Url } from '../untils/IsWap'
  const formLabelAlign = reactive({
  word: '',
  mean: '',
})

function addword(){
    axios.post('http://'+Url+'/addWord',
      {
       word:formLabelAlign.word,
       mean:formLabelAlign.mean
      }) 
      .then((response)=> {
    console.log(response);
    if(response.data.status_code != 0){
        ElMessage({
    message: response.data.status_msg,
    type: 'error',
  })
    }else{
        ElMessage({
    message: response.data.status_msg,
    type: 'success',
  });
  window.location.reload();
    }
  })
  .catch(function (error) {
    ElMessage({
    message: error,
    type: 'error',
  })
  });
}
  </script>
  