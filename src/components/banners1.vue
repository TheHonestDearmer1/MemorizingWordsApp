<template>
  <div id="menu" style="height:100%;">
    <MNG_Menu>
    <div style="width: auto;
    display: grid;
    grid-template-columns: 3fr 7fr;
    ">
       <div style="display: flex;
       justify-content: center;
       align-items: center;
       ">
      <div style="display: grid;">
        <h1 style="display: flex;
        justify-content: center;margin: 4px;">添加banners</h1>
        <n-space vertical style="
        width: 300px;
        "> 
    <n-input placeholder="标题" :disabled="change_open" v-model:value="banners_title">
      <template #prefix>
      </template>
    </n-input>
    <n-input placeholder="描述" :disabled="change_open" v-model:value="banners_description">
      <template #prefix>
      </template>
    </n-input>
    <n-input placeholder="链接" :disabled="change_open" v-model:value="banners_href" >
      <template #prefix>
      </template>
    </n-input>
    <div style="display: flex; justify-content:center;">
        <n-button type="primary" style="width: 100%;" @click="add_banners" :disabled="change_open">
      添加
    </n-button>
    </div>
  </n-space>
      </div>  
       </div>
       <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <Demo v-model:addBannersChange="addBannersChange" @changeButton="changeButton"/>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
    </div>
</MNG_Menu>
</div>

<Teleport to="#menu">
  <Transition name="slide-fade">
  <div v-if="change_open" class="demo modal-demo">
    <div>
      <div style="display: flex;
       justify-content: center;
       align-items: center;
       ">
      <div style="display: grid;">
        <h1 style="display: flex;
        justify-content: center; margin: 4px;">修改banners</h1>
        <n-space vertical style="
        width: 300px;
        "> 
    <n-input placeholder="标题" v-model:value="change_banners_title">
      <template #prefix>
      </template>
    </n-input>
    <n-input placeholder="描述" v-model:value="change_banners_description">
      <template #prefix>
      </template>
    </n-input>
    <n-input placeholder="链接" v-model:value="change_banners_href">
      <template #prefix>
      </template>
    </n-input>
    <div style="display: flex; justify-content:space-between;">
        <n-button type="primary" style="width: 100px;" @click="change_banners">
      修改
    </n-button>
    <n-button type="primary" style="width: 100px;" @click="change_open = false" >
      返回
    </n-button>
    </div>
  </n-space>
      </div>  
       </div>
    </div>
  </div>
</Transition>
</Teleport>
  </template>
  
    <script>
    import { defineComponent} from 'vue';
    import { useMessage } from 'naive-ui'
    import Demo from "./banners_Data.vue";
    import axios from "axios";

  //请求函数
    export default defineComponent({
    
    components: {
      Demo,
    },
    data(){
      return{
        banners_title: '',
        banners_description:'',
        banners_href:'',
        change_banners_ID: '',
        change_banners_title: '',
        change_banners_description:'',
        change_banners_href:'',
        addBannersChange: true,
        message : useMessage(),
        change_open: false
      }
    },
    methods:{
      changeButton(id){
           this.change_banners_ID = id;
           this.change_open = true;
          },
      //添加函数
      add_banners(){
        //请求函数
    console.log(this.banners_title);
    console.log(this.banners_description);
    console.log(this.banners_href);
      axios.post('http://127.0.0.1:5000/admin/banners/action',
      {
        title:this.banners_title,
        description:this.banners_description,
        href : this.banners_href
      }) 
      .then((response)=> {
    console.log(response);
    if(response.data.status_code != 0){
      this.message.warning(response.data.status_msg);
    }else{
      this.message.success("添加成功");
      this.banners_title = '';
      this.banners_description = '';
      this.banners_href = '';
      //使得监听器知道改变了状态
      this.addBannersChange = !this.addBannersChange
    }
  })
  .catch(function (error) {
    console.log(error);
  });
},
//改变函数
change_banners(){
  console.log(this.change_banners_ID);
  console.log(this.change_banners_title);
  console.log(this.change_banners_description);
  console.log(this.change_banners_href);
      axios.post('http://127.0.0.1:5000/admin/banners/action/change',
      {
        ID : this.change_banners_ID,
        title:this.change_banners_title,
        description:this.change_banners_description,
        href : this.change_banners_href
      }) 
      .then((response)=> {
    console.log(response);
    if(response.data.status_code != 0){
      this.message.warning(response.data.status_msg);
    }else{
      this.message.success(response.data.status_msg);
      this.change_banners_title = '';
      this.change_banners_description = '';
      this.change_banners_href = '';
      this.change_banners_ID = ''
      this.change_open = false;
      //使得监听器知道改变了状态
      this.addBannersChange = !this.addBannersChange
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
    }
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
    top: 32%;
    left: 50%;
    width: auto;
    margin-left: -150px;
    background-color: var(--vt-c-bg);
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
</style>