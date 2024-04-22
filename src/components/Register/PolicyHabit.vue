<template>
  <div class="w-full text-center text-2xl mb-2">选择您感兴趣的政策标签</div>
  <div class="bg-white mb-2 ml-2 mr-2">
    <div class="text-xl pl-2 pt-2 pb-2">已选标签</div>
    <el-tag
      v-for="(item, index) in phobby.checked"
      :key="index"
      closable
      effect="plain"
      class="mb-2 mx-3"
      @close="handleCheckedTag(index)"
    >
      {{ item }}
    </el-tag>
    <el-tag
      v-for="(item, index) in phobby.createList"
      :key="index"
      closable
      effect="light"
      class="mb-2 mx-3"
      @close="handleCreateList(index)"
    >
      {{ item }}
    </el-tag>
  </div>
  <div>
    <el-check-tag
      v-for="(item, index) in unchecked"
      :key="index"
      effect="light"
      type="info"
      class="mx-3 mb-2"
      :checked="item.status"
      @click="handleUncheckedTag(index)"
    >
      {{ item.data }}
    </el-check-tag>
    <div class="w-40 ml-3">
      <el-input
        placeholder="按回车Enter创建标签"
        v-model="createLabel"
        @keyup.enter.native="handleCreateLabel"
      ></el-input>
    </div>
  </div>
  <div class="w-full flex mb-2">
    <div class="w-full"></div>
    <el-button link @click="updateUnchecked">都没有？换一批</el-button>
  </div>
</template>

<script setup>
import { reactive, ref, toRef } from "vue";

let phobby = reactive({
  checked: [],
  createList: [],
});
const phobbyList = [
  {
    data: "高新企业",
    status: false,
  },
  {
    data: "上市公司",
    status: false,
  },
  {
    data: "新冠疫情",
    status: false,
  },
  {
    data: "行业龙头",
    status: false,
  },
  {
    data: "碳达峰",
    status: false,
  },
  {
    data: "人工智能",
    status: false,
  },
  {
    data: "大数据",
    status: false,
  },
  {
    data: "元宇宙",
    status: false,
  },
  {
    data: "城市",
    status: false,
  },
  {
    data: "芯片",
    status: false,
  },
  {
    data: "显卡",
    status: false,
  },
];
// 随机取几个爱好方法
const getRandomArray = (arr, count) => {
  // 下标数组
  let indexarr = [];
  while (indexarr.length < 5) {
    let num = Math.floor(Math.random() * arr.length);
    if (indexarr.indexOf(num) == -1) {
      indexarr.push(num);
    }
  }
  let newarr = [];
  for (let i = 0; i < indexarr.length; i++) {
    newarr.push(arr[indexarr[i]]);
  }
  return newarr;
};
let unchecked = reactive(getRandomArray(phobbyList, 6));
let createLabel = ref("");
const handleUncheckedTag = (index) => {
  if (!unchecked[index].status) {
    phobby.checked.push(unchecked[index].data);
  } else {
    phobby.checked.splice(
      0,
      phobby.checked.length,
      ...phobby.checked.filter((item) => {
        return item != unchecked[index].data;
      })
    );
  }
  unchecked[index].status = !unchecked[index].status;
};
const handleCheckedTag = (index) => {
  const temp = phobby.checked.splice(index, 1);
  phobbyList.forEach((item) => {
    if (item.data == temp[0]) {
      item.status = false;
    }
  });
};
const handleCreateLabel = () => {
  phobby.createList.push(createLabel.value);
  createLabel.value = "";
};
const handleCreateList = (index) => {
  phobby.createList.splice(index, 1);
};
const updateUnchecked = () => {
  unchecked.splice(0, unchecked.length, ...getRandomArray(phobbyList, 5));
};

defineExpose({
  form: phobby,
});
</script>

<style>
</style>