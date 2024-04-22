<template>
  <div class="bg-container">
    <div class="login-dialog">
      <CustomTabMenu :tabList="ctmList" :clickEvt="ctmHandleClick" />
      <div>
        <component :is="tabs[currentTab]"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomTabMenu from "../../components/CustomTabMenu.vue";
import LoginCode from "../../components/Login/LoginCode.vue";
import LoginPwd from "../../components/Login/LoginPwd.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// 配置Tab列表与点击事件
const ctmList = ["验证码登录", "密码登录"];
const ctmHandleClick = (index) => {
  currentTab.value = index;
};
const store = useStore();
const router = useRouter();
const isLogin = computed(() => {
  return store.state.user.isLogin;
});

onMounted(() => {
  if (isLogin == "true") {
    router.push("homePage");
  }
});

// 动态组件实现标签切换
const currentTab = ref(0);
const tabs = [LoginCode, LoginPwd];
</script>

<style scoped>
.bg-container {
  background-image: url("@/assets/login-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 92vh;
  @apply flex justify-end items-center;
}

.login-dialog {
  /* background-color: black; */
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  @apply w-fit h-fit p-2 md:mr-48;
}
</style>
