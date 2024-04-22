<template>
  <div v-if="role == 'user'">
    <el-button
      type="primary"
      link
      v-if="store.state.user.state != 5"
      @click="toRegister"
      class="mt-5 ml-14"
      >还没有注册完成？前往完善信息</el-button
    >
    <div v-else class="mt-5"></div>
    <el-tabs
      :tab-position="'left'"
      type="border-card"
      class="w-11/12 ml-14"
      style="height: 39rem"
      :stretch="true"
      v-model="activeName"
    >
      <!-- 个人中心 -->
      <!-- <el-tab-pane label="个人中心" disabled></el-tab-pane> -->
      <!-- 我的信息 -->
      <el-tab-pane label="我的信息" name="first">
        <my-information />
      </el-tab-pane>
      <!-- 我的收藏 -->
      <el-tab-pane label="我的收藏" name="second">
        <my-favourite />
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="third">
        <history />
      </el-tab-pane>
      <el-tab-pane label="设置" name="fourth">
        <setting />
      </el-tab-pane>
    </el-tabs>
  </div>
  <div v-else>
    <el-tabs
      :tab-position="'left'"
      type="border-card"
      class="w-11/12 ml-14 mt-5"
      style="height: 39rem"
      :stretch="true"
      v-model="activeName"
    >
      <!-- 个人中心 -->
      <!-- <el-tab-pane label="个人中心" disabled></el-tab-pane> -->
      <!-- 我的信息 -->
      <el-tab-pane label="我的信息" name="first">
        <my-information />
      </el-tab-pane>
      <!-- 我的收藏 -->
      <el-tab-pane label="用户管理" name="second">
        <user-manage />
      </el-tab-pane>
      <el-tab-pane label="设置" name="third">
        <setting />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import MyInformation from "@/components/PersonalCenter/MyInformation.vue";
import MyFavourite from "@/components/PersonalCenter/MyFavourite.vue";
import History from "@/components/PersonalCenter/History.vue";
import Setting from "@/components/PersonalCenter/Setting.vue";
import UserManage from "@/components/PersonalCenter/UserManage.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const activeName = ref("first");
const store = useStore();
const router = useRouter();

const toRegister = () => {
  router.push("register");
};

const role = computed(() => {
  return store.state.user.role;
});

const isLogin = computed(() => {
  return store.state.user.isLogin;
});

onMounted(() => {
  if (!isLogin.value) {
    router.push("homePage");
  }
});
watch(isLogin, (newVal, oldVal) => {
  if (!newVal) {
    router.push("homePage");
  }
});
</script>

<style lang="scss" scoped>
/* .el-tabs--border-card {
  :deep(.el-tabs__item.is-disabled) {
    cursor: default;
    color: #8d95a0e5;
    font-family: 庞门正道标题体 !important;
    // font-weight: 600;
  }
} */
</style>