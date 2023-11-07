<template>
  <MNG_Menu>
    <div style="
height: 100%;
display: flex;
align-items: center;
justify-content: center;
">
<div style="height: 400px; width: 400px;">
    <n-card>
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="登录">
          <n-form>
            <n-form-item-row label="用户名">
              <n-input type= "text" placeholder="输入用户名" v-model:value="login_username"/>
            </n-form-item-row>
            <n-form-item-row label="密码">
              <n-input type= "password" placeholder="输入密码" v-model:value="login_password"/>
            </n-form-item-row>
          </n-form>
          <n-button type="primary" @click="login" block secondary strong>
            登录
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="注册">
          <n-form>
            <n-form-item-row label="用户名" >
              <n-input type= "text" placeholder="输入用户名" v-model:value="username"/>
            </n-form-item-row>
            <n-form-item-row label="密码" >
              <n-input type= "password" placeholder="输入密码" v-model:value="password"/>
            </n-form-item-row>
            <n-form-item-row label="重复密码">
              <n-input type= "password" placeholder="再次输入密码" v-model:value="repassword"/>
            </n-form-item-row>
          </n-form>
          <n-button type="primary"  @click="register" block secondary strong>
            注册
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
</div>
</div>
  </MNG_Menu>
  </template>

<script setup>
import { useMessage } from 'naive-ui'
import axios from "axios"; // 导入 axios
import {ref} from "vue";
import MNG_Menu from "./MNG_Menu.vue";
import cookies from 'vue-cookies'
const username = ref('');
const password = ref('');
const repassword = ref('');
const login_password = ref('');
const login_username = ref('');
const message = useMessage()
//注册
function register(){
  console.log(username.value);
  console.log(password.value);
  console.log(repassword.value);
  axios.post('http://127.0.0.1:5000/admin/register', {
    username: username.value,       
    password: password.value,
    repassword: repassword.value
  })
  .then(function (response) {
    console.log(response);
    if(response.data.status_code != 0){
      message.warning(response.data.status_msg);
    }else{
      message.success("注册成功");
      cookies.set('token',response.data.token)
      window.location.href = "/#/admin";
    }
  })
  .catch(function (error) {
    message.warning(error);
  });
}
//登录
function login(){
  console.log(login_username.value);
  console.log(login_password.value);
  axios.get('http://127.0.0.1:5000/admin/login', {
    params: {
      username: login_username.value,       
      password: login_password.value,
    }
  })
  .then(function (response) {
    console.log(response);
    if(response.data.status_code != 0){
      message.warning(response.data.status_msg);
    }else{
      message.success("用户"+login_username.value+"登录成功");
      cookies.set('token',response.data.token);
      console.log(response.data.token);
      window.location.href = "/#/admin";
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

</script>

  <style scoped>
  .card-tabs .n-tabs-nav--bar-type {
    padding-left: 4px;
  }
  </style>