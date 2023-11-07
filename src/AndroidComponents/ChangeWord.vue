<template>
    <div class="demo-collapse" style="width: 100%" >
      <el-collapse v-model="activeNames" >
        <el-collapse-item title="修改单词" name="1" style="width: 100%; ">
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
    <div>    <el-button type="primary" @click="changeword">修改</el-button>
    <el-button type="primary" @click="CAWord('CAWord')">返回</el-button></div>
  </el-form>
        </el-collapse-item>
      </el-collapse>
      
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { reactive,ref} from 'vue'
  import { ElMessage } from 'element-plus'
import { Url } from '../untils/IsWap'
const props = defineProps({
ID:{
type: Number,
requre: true
}
})
const CAWord = defineEmits(['CAWord'])

const activeNames = ref(['1'])
  const formLabelAlign = reactive({
  word: '',
  mean: '',
})

function changeword(){
    axios.post('http://'+Url+'/ChangeWord',
      {
       ID : props.ID,
       word:formLabelAlign.word,
       mean:formLabelAlign.mean
      },{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
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
  