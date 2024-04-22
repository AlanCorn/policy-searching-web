<template>
  <div class="bg-container">
    <div class="login-dialog">
      <div>
        <component :is="tabs[currentTab - 1]" ref="childData"></component>
        <div class="w-full flex">
          <div class="text-xs ml-auto" v-show="currentTab == 1">
            *为必须填写项
          </div>
        </div>
        <div class="w-full flex">
          <div class="w-full"></div>
          <el-button v-show="currentTab != 1" @click="toBack">上一步</el-button>
          <el-button type="primary" @click="toNext">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RegisterInfo from "@/components/Register/RegisterInfo.vue";
import RefinePersonInfo from "@/components/Register/RefinePersonInfo.vue";
import Habit from "@/components/Register/Habit.vue";
import PolicyHaibt from "@/components/Register/PolicyHabit.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import router from "@/router/index.js";
import { useStore } from "vuex";
let currentTab = computed(() => {
  return store.state.user.state;
});
let isLogin = computed(() => {
  return store.state.user.isLogin;
});
let state = computed(() => {
  return store.state.user.state;
});
const store = useStore();
const childData = ref(null);
onMounted(() => {
  if (!isLogin.value) {
    router.push("login");
  }
  if (store.state.user.state == 5) {
    // 信息完善完毕
    router.push("homePage");
  }
});
const tabs = [RegisterInfo, RefinePersonInfo, Habit, PolicyHaibt];

const toNext = () => {
  // currentTab.value++;
  let form = childData.value.form;
  form.id = store.state.user.profile.id;
  form.state = currentTab.value;
  store.dispatch("user/register", form);
};
const toBack = () => {
  currentTab.value--;
};
watch(isLogin, (newVal, oldVal) => {
  router.push("login");
});
watch(state, (newVal, oldVal) => {
  if (newVal == 5) {
    router.push("homePage");
  }
});
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
  max-width: 400px;
  @apply w-fit h-fit p-2 md:mr-48;
}
</style>
