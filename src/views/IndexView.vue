<!-- 页面入口 -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header
        class="flex items-center justify-between box-border el-header-patch"
      >
        <TopIndexNav />
      </el-header>
      <el-main class="p-0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import TopIndexNav from "../components/TopIndexNav.vue";
</script>

<style scoped>
.el-header-patch {
  background: #f6f6f6;
  height: 8vh;
  min-height: 56px;
  border: 1px solid #dcdfe6;
}
</style>
