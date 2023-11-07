<template>
  <div id="menu" style="height:100%;">
    <MNG_Menu>
        <div style="width: auto;
        display: grid;
        grid-template-columns: 3fr 7fr;
        ">
    <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin: 0px;">
     <div style="display: grid; gap: 10px; width: 100%;"> 
      <h1 style="display: flex; justify-content: center; align-items: center;">用户评论</h1>
      <n-input placeholder="标题" v-model:value="custom_title" :disabled="change_open">
      <template #prefix>
      </template>
    </n-input>
    <n-input placeholder="描述" v-model:value="custom_description" :disabled="change_open">
      <template #prefix>
      </template>
    </n-input>
     <el-upload
     style="display: flex; justify-content:space-around;"
    ref="uploadRef"
    class="upload-demo"
    :auto-upload="false"
    :before-upload="Get_file"
    :show-file-list="false"
    :on-change="Showfilename"
    :limit = "1"
  >
    <template #trigger>
      <el-button type="success" :disabled="change_open" >上传文件</el-button>
    </template>

    <el-button class="ml-3" type="success" :disabled="change_open" @click="submitUpload">
      添加
    </el-button>
  </el-upload>
  <p style="word-wrap: break-word; overflow-wrap: break-word;">{{ Show_filename }}</p>
     </div>
    </div>
           <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <custom_Data :addBannersChange="addBannersChange" @changeButton="changeButton"/>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
        </div>
    </MNG_Menu>
  </div>
  <Teleport to="#menu">
  <Transition name="slide-fade">
  <div v-if="change_open" class="demo modal-demo" style="width: 350px;">
    <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin: 0px;">
     <div style="display: grid; gap: 10px; width: 100%;"> 
      <h1 style="display: flex; justify-content: center; align-items: center;">用户评论</h1>
      <n-input placeholder="标题" v-model:value="change_custom_title">
      <template #prefix>
      </template>
    </n-input>
    <n-input placeholder="描述" v-model:value="change_custom_description">
      <template #prefix>
      </template>
    </n-input>
    <el-upload
     style="display: grid; gap: 5px; "
    ref="uploadRef"
    class="upload-demo"
    :auto-upload="false"
    :before-upload="Get_file"
    :show-file-list="false"
    :on-change="Showfilename"
    :limit = "1"
  >
    <template #trigger>
      <el-button class="ml-3" style="width: 100%;" type="success">上传文件</el-button>
    </template>

    <el-button class="ml-3" style="width: 100%;" type="success" @click="change_action">
      修改
    </el-button>
   
    <el-button  style="width: 100%; margin: 0%;" type="success" @click="change_open=!change_open">
      返回
    </el-button>
  </el-upload>
  <p style="word-wrap: break-word; overflow-wrap: break-word;">{{ Show_filename }}</p>
     </div>
    </div>
  </div>
</Transition>
</Teleport>
      </template>
      
      <script setup>
      import custom_Data from "./custom_Data.vue";
      import { ref, onMounted } from 'vue';
      import { useMessage } from 'naive-ui';
      import axios from "axios";
      
      const custom_ID = ref('');
      const custom_title = ref('');
      const custom_description = ref('');
      const change_custom_title = ref('');
      const change_custom_description = ref('');
      const addBannersChange = ref(true);
      const  message  = useMessage();
      const change_open = ref(false);
      const old_file = ref(null);
      const uploadRef = ref(null);
      const Show_filename=ref("");

      const changeButton = (id) => {
        custom_ID.value = id;
        change_open.value = true;
      };
      
      const Get_file = (file) => {
        old_file.value = file;
        return false;
      };
      const Showfilename = (file)=>{
        Show_filename.value = "上传的文件名为"+file.name;
      };
      const submitUpload = () => {
        console.log("提交");
        uploadRef.value.submit();
        const formData = new FormData();
        if(old_file.value !== null){
          formData.append("file", old_file.value);
        }
        formData.append("title", custom_title.value);
        formData.append("description", custom_description.value);
        axios.post('http://127.0.0.1:5000/admin/custom', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          if (response.data.status_code !== 0) {
            message.warning(response.data.status_msg);
          } else {
            message.success(response.data.status_msg);
            window.location.reload();
          }
        })
        .catch((error) => {
          message.warning(error);
        });
      };
      
      const change_action = () => {
        console.log("修改");
        uploadRef.value.submit();
        const formData = new FormData();
        formData.append("file", old_file.value);
        formData.append("ID", custom_ID.value);
        formData.append("title", change_custom_title.value);
        formData.append("description", change_custom_description.value);
        axios.post('http://127.0.0.1:5000/admin/custom/action/change', formData, {
          headers: {
            'Content-Type': 'multipart/form-data;'
          }
        })
        .then((response) => {
          if (response.data.status_code !== 0) {
            message.warning(response.data.status_msg);
          } else {
            message.success(response.data.status_msg);
            window.location.reload();
          }
        })
        .catch((error) => {
          message.warning(error);
        });
      };
      
      onMounted(() => {
        console.log(uploadRef.value);
      });
      </script>
      
      <style>
      .demo {
          padding: 22px 24px;
          border-radius: 8px;
          box-shadow: var(--vt-shadow-2);
          margin-bottom: 1.2em;
          transition: background-color .5s ease;
      }
      .modal-demo {
          position: fixed;
          z-index: 999;
          top: 20%;
          left: 50%;
          width: auto;
          margin-left: -150px;
          background-color:rgb(255, 255, 255);
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 16px #00000026;
      }
      .slide-fade-enter-active {
        transition: all 0.3s ease-out;
      }
      
      .slide-fade-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
      }
      
      .slide-fade-enter-from,
      .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
      }
      .wrap{ word-wrap: break-word; word-break: break-all; white-space: pre-wrap; } 
      </style>