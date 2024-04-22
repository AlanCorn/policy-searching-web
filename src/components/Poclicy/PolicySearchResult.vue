<template>
  <div class="flex items-center justify-between px-4 py-2">
    <div>
      <div class="policy-title">
        广东省工业和信息化厅关于2022年专精特新中小企业和2019年到期复核通过企业名单的公示
      </div>
      <div class="flex">
        <div class="policy-tags">
          <div class="font-semibold">信息来源:</div>
          <div>广东省工业和信息化厅</div>
        </div>
        <div class="policy-tags">
          <div class="font-semibold">地区:</div>
          <div>广东省</div>
        </div>
      </div>
      <div class="flex">
        <div class="policy-tags">
          <el-icon><PriceTag /></el-icon>
          <div>科技成果奖励</div>
        </div>
        <div class="policy-tags">
          <el-icon><View /></el-icon>
          <div>阅读量:12312</div>
        </div>
      </div>
    </div>
    <div class="hover:text-blue-500 cursor-pointer">查看详情></div>
  </div>
</template>

<script setup>
import { View } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.policy-title {
  @apply hover:text-blue-500 cursor-pointer text-lg truncate mb-1;
}

.policy-tags {
  @apply flex items-center mb-1 px-1 mr-3;
}
</style>
