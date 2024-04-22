<template>
  <div class="w-full text-2xl text-center mb-2">个人信息完善</div>
  <div class="pr-2">
    <el-form :model="finishInfoList" label-width="80px">
      <el-form-item label="性别">
        <el-radio-group v-model="finishInfoList.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
          <el-radio label="未知">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="教育程度">
        <el-select
          v-model="finishInfoList.graduation"
          placeholder="请选择教育程度"
        >
          <el-option
            v-for="item in graduationDatas"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="毕业院校">
        <el-input
          v-model="finishInfoList.education"
          placeholder="请输入毕业院校"
        ></el-input>
      </el-form-item>
      <el-form-item label="职业">
        <el-input
          v-model="finishInfoList.occupation"
          placeholder="请输入职业"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司">
        <el-input v-model="finishInfoList.company" placeholder="请输入公司"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

let finishInfoList = reactive({
  sex: "未知",
  graduation: "",
  education: "",
  occupation: "",
  company: "",
});

let graduationDatas = reactive([
  {
    value: "研究生",
    label: "研究生",
  },
  {
    value: "本科",
    label: "本科",
  },
  {
    value: "专科",
    label: "专科",
  },
  {
    value: "高中",
    label: "高中",
  },
  {
    value: "中专",
    label: "中专",
  },
]);

defineExpose({
  form: finishInfoList,
});
</script>

<style>
</style>