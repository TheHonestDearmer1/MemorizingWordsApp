<template>
  
<div :style="classObject">
  <div style="height: 100%;">
    <n-layout has-sider    
    style="height: 100%;"
   >
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="200"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        @mouseover="collapsed = false;classObject['grid-template-columns'] = '215px auto' "
        @mouseout="collapsed = true;classObject['grid-template-columns'] = '79px auto'"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
        />
      </n-layout-sider>
      </n-layout>
   </div>
   <slot />
   <div> 
      </div>
</div>
</template>


<script>
import { h, ref, defineComponent,reactive,onBeforeMount } from "vue";
import { NIcon,useMessage } from "naive-ui";
import {
  AccessibilitySharp,
  CaretDownOutline,
  HomeOutline,
  LogIn,
  ChatboxOutline,
  Person,
} from "@vicons/ionicons5";
import cookies from 'vue-cookies'
var menuOptions = reactive([
  {
    label: "主页",
    key: "home",
    href: "#/",
    onClick:()=>{
      window.location.href="#/"
      window.location.reload();
    }
  },
  {
    label: "banners",
    key: "banners",
    href: "#/admin/banners",
  },
  {
    label: "用户评论",
    key: "usermsg",
    href: "#/admin/custom",
  },
  {
    label: "登录",
    key: "login",
    href: "#/admin/login",
  },
]);

export default defineComponent({
  setup() {
    onBeforeMount(() => {
  console.log(`the component is now mounted.`)
  var token = cookies.get('token');
  if (token != null) {
  console.log('执行');
  if(menuOptions.length == 4){
    menuOptions.pop();
  }else{
    menuOptions.pop();
    menuOptions.pop();
  }
  menuOptions.push(
    {
    label: "用户信息",
    key: "userinfo",
    href: "#/admin",
  },
    {
    label: "登出",
    key: "loginOut",
    onClick:()=>{
      cookies.remove('token');
      if(menuOptions.length == 4){
    menuOptions.pop();
  }else{
    menuOptions.pop();
    menuOptions.pop();
    window.location.href="/#/admin/login"
  }
      menuOptions.push({
    label: "登录",
    key: "login",
    href: "/#/admin/login",
  });
  message.success("退出登录成功")
    },
  }
   )
}
})
    const message = useMessage();
    const collapsed = ref(false);
    const classObject = reactive({
  'height':'100%',
'display': 'grid',
'grid-template-columns':'200px auto',/*三列，列宽*/
'grid-template-rows': '1fr'
});
    const renderMenuLabel = (option) => {
      if ("onClick" in option) {
          return h(
            "a",
            option.onClick,
            option.label
          );
        }
      if ("href" in option) {
          return h(
            "a",
            { href: option.href },
            option.label
          );
        }
    };

    const renderMenuIcon = (option) => {
      if (option.key === "home")
        return h(NIcon, null, { default: () => h(HomeOutline) });
      if (option.key === "banners")
        return h(NIcon, null, { default: () => h(AccessibilitySharp) });
      if (option.key === "usermsg")
        return h(NIcon, null, { default: () => h(ChatboxOutline) });
      if (option.key === "login")
        return h(NIcon, null, { default: () => h(LogIn) });
      if (option.key === "loginOut")
        return h(NIcon, null, { default: () => h(LogIn) });
      if (option.key === "userinfo")
        return h(NIcon, null, { default: () => h(Person) });
    
    };

    const expandIcon = () => {
      return h(NIcon, null, { default: () => h(CaretDownOutline) });
    };

    return {
      classObject,
      collapsed,
      menuOptions,
      renderMenuLabel,
      renderMenuIcon,
      expandIcon,
      message,
      Person
    };
  },
});
</script>