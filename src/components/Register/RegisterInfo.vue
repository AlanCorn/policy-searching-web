<template>
  <div class="w-full text-center text-2xl mb-3">基础信息</div>
  <div class="pr-2">
    <el-form :model="baseInfoList" label-width="80px">
      <el-form-item label="设置密码" :required="true">
        <el-input
          v-model="baseInfoList.setPwd"
          type="password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :required="true">
        <el-input
          v-model="baseInfoList.makeSurePwd"
          type="password"
          placeholder="请重复输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" :required="true">
        <el-input
          v-model="baseInfoList.username"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="baseInfoList.birth"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="所在地">
        <el-cascader
          v-model="baseInfoList.location"
          :options="citydatas"
          placeholder="请选择地区"
          clearable
          class="w-full"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, toRef } from "vue";
import citydata from "@/assets/citydata.js";

let baseInfoList = reactive({
  setPwd: "",
  makeSurePwd: "",
  username: "",
  birth: "",
  location: [],
});

let citydatas = reactive(citydata);
defineExpose({
  form: baseInfoList,
});
</script>

<style></style>
