<template>
  <div class="login-form-container">
    <el-row justify="center" align="middle">
      <el-col :span="4">
        <div class="login-form-title">手机号</div>
      </el-col>
      <el-col :span="18" :push="1">
        <el-input v-model="loginForm.telephone" placeholder="请输入手机号" />
      </el-col>
    </el-row>
    <el-row justify="center" align="middle">
      <el-col :span="4">
        <div class="login-form-title">密码</div>
      </el-col>
      <el-col :span="18" :push="1">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
      </el-col>
    </el-row>
    <el-row justify="center" align="middle">
      <el-col :span="6" :offset="12">
        <el-button type="primary" @click="validate"> 登录 </el-button>
      </el-col>
      <el-col :span="5">
        <el-button> 返回 </el-button>
      </el-col>
    </el-row>
  </div>
  <!-- <Vcode :show="isShow" @success="onSuccess" @close="onClose" /> -->
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

let loginForm = reactive({
  telephone: "",
  password: "",
});

let isShow = ref(false);

const store = useStore();
const router = useRouter();

const validate = () => {
  handleLogin();
};
const handleLogin = () => {
  store.dispatch("user/login",loginForm).then(() => {
    if(store.state.user.state <= 4) {
      router.push("register");
    } else {
      router.back();
    }
  })
};
</script>