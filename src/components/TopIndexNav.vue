<template>
  <div class="flex items-center logo-container">
    <!-- <img src="@/assets/logo.png" class="h-20" /> -->
    <div class="logo-title hover:text-blue-400">智能政策信息检索系统</div>
  </div>
  <div class="flex items-center left-menu gap-4">
    <div class="nav-container">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
        class="transprant-border"
      >
        <el-menu-item index="1" @click="handleHomePage">首页</el-menu-item>
        <el-menu-item index="2" @click="handleSearchPage"
          >政策检索</el-menu-item
        >
        <el-menu-item
          index="3"
          @click="handleDataManage"
          v-show="data.role == 'admin'"
          >数据管理</el-menu-item
        >
      </el-menu>
    </div>
    <div class="flex justify-center">
      <div class="flex" v-if="data.isLogin">
        <el-tooltip content="主页" effect="light">
          <div class="flex">
            <el-avatar
              :size="40"
              :src="userAvatar"
              @click="toPersonalCenter"
              class="hover:cursor-pointer"
            />
            <span class="mt-2 ml-2 username" @click="toPersonalCenter">{{
              data.name
            }}</span>
          </div>
        </el-tooltip>
        <!-- <el-tooltip content="主页">
          <span class="mt-2 mr-2 username" @click="toPersonalCenter">{{
            data.name
          }}</span>
        </el-tooltip> -->
        <el-tooltip content="退出登录" effect="light">
          <el-icon @click="logout" class="mt-3 ml-2 icon" color="#409EFC"
            ><SwitchButton
          /></el-icon>
        </el-tooltip>
      </div>

      <!-- <template #dropdown>
          <el-dropdown-menu v-if="data.isLogin">
            <el-dropdown-item @click.native="toPersonalCenter"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template> -->

      <el-button v-else @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();

const store = useStore();
let userAvatar = computed(() => {
  return store.getters["user/getUserAvatar"];
});
let data = reactive({
  role: computed(() => {
    return store.state.user.role;
  }),
  isLogin: computed(() => {
    return JSON.parse(store.state.user.isLogin);
  }),
  name: computed(() => {
    return store.state.user.name;
  }),
});

let activeIndex = computed(() => {
  return store.state.indexNav.activeIndex;
});

onMounted(() => {
  if (router.currentRoute._rawValue.path == "/homePage") {
    store.dispatch("indexNav/setIndexNav", "1");
  } else if (router.currentRoute._rawValue.path == "/search") {
    store.dispatch("indexNav/setIndexNav", "2");
  } else if (router.currentRoute._rawValue.path == "/dataManage") {
    store.dispatch("indexNav/setIndexNav", "3");
  } else {
    store.dispatch("indexNav/setIndexNav", "0");
  }
});

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

const handleLogin = () => {
  store.dispatch("indexNav/setIndexNav", "0");
  router.push("login");
};

const handleHomePage = () => {
  store.dispatch("indexNav/setIndexNav", "1");
  router.push("homePage");
};

const handleSearchPage = () => {
  store.dispatch("indexNav/setIndexNav", "2");
  router.push("search");
};

const handleDataManage = () => {
  store.dispatch("indexNav/setIndexNav", "3");
  router.push("dataManage");
};

const logout = () => {
  if (activeIndex.value == 3) {
    store.dispatch("indexNav/setIndexNav", "1");
    store.dispatch("user/logout");
    router.push("/login");
  } else {
    store.dispatch("user/logout");
  }
};

const toPersonalCenter = () => {
  store.dispatch("indexNav/setIndexNav", "0");
  router.push("/personalCenter");
};
</script>

<style lang="scss" scoped>
.logo-title {
  font-family: 正库超级黑 !important;
  font-size: 150%;
}
.transprant-border {
  background: none;
  /* border: 1px solid transparent; */
}
.el-menu--horizontal {
  :deep(.el-menu-item.is-active) {
    border-bottom: 0px;
  }
  :deep(.el-menu-item) {
    border-bottom: 0px;
  }
}
.icon {
  cursor: pointer;
}
.icon:hover {
  color: #79bbff;
}
.username {
  cursor: pointer;
  color: #409efc;
}
.username:hover {
  color: #79bbff;
}
</style>
