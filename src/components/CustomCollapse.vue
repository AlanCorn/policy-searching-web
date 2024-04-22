<template>
  <div class="flex flex-col w-full">
    <div class="collapse-title mb-1">
      <!-- 插槽出口 -->
      <slot name="title"></slot>
    </div>
    <!-- <Transition name="slide-fade"> -->
    <div class="collapse-content" v-show="isCollapsed">
      <slot name="content"></slot>
    </div>
    <!-- </Transition> -->
  </div>
  <el-button text @click="handleChange" class="mr-4">展开</el-button>
</template>

<script setup>
import { ref } from "vue";

const isCollapsed = ref(false);

const handleChange = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style lang="scss" scoped>
.collapse-title {
}

.collapse-content {
}
</style>
