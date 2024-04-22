<template>
  <div class="login-form-container">
    <el-row justify="center" align="middle">
      <el-col :span="4">
        <div class="login-form-title">手机号</div>
      </el-col>
      <el-col :span="18" :push="1">
        <el-input v-model="input" placeholder="请输入手机号" />
      </el-col>
    </el-row>
    <el-row justify="center" align="middle">
      <el-col :span="4">
        <div class="login-form-title">验证码</div>
      </el-col>
      <el-col :span="18" :push="1">
        <el-input v-model="input" placeholder="请输入短信验证码">
          <template #append>
            <el-button @click="onShow"> 获取验证码 </el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row justify="center" align="middle">
      <el-col :span="6" :offset="12">
        <el-button type="primary"> 登录 </el-button>
      </el-col>
      <el-col :span="5">
        <el-button> 返回 </el-button>
      </el-col>
    </el-row>
  </div>
  <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
</template>

<script setup>
import { ref } from "vue";
import Vcode from "vue3-puzzle-vcode";

const isShow = ref(false);

const onShow = () => {
  isShow.value = true;
};

const onClose = () => {
  isShow.value = false;
};

const onSuccess = () => {
  onClose(); // 验证成功，需要手动关闭模态框
  // TODO:发送后端请求，向用户手机号发送验证码
  alert(1);
};
</script>

<style lang="scss">
.login-form-container {
  @apply w-80 mx-4 my-4;
  .el-row {
    @apply my-2;
  }

  .login-form-title {
    @apply text-right font-semibold whitespace-nowrap truncate;
  }
}
</style>
