<template>
  <div class="w-full text-center text-2xl mb-2">选择您的兴趣爱好标签</div>
  <div class="bg-white mb-2 ml-2 mr-2">
    <div class="text-xl pl-2 pt-2 pb-2">已选标签</div>
    <el-tag
      v-for="(item, index) in hobby.checked"
      :key="index"
      closable
      effect="plain"
      class="mb-2 mx-3"
      @close="handleCheckedTag(index)"
    >
      {{ item }}
    </el-tag>
    <el-tag
      v-for="(item, index) in hobby.createList"
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
import { reactive, ref } from "vue";

let hobby = reactive({
  checked: [],
  createList: [],
});
const hobbyList = [
  {
    data: "运动健身",
    status: false,
  },
  {
    data: "赏析佳作",
    status: false,
  },
  {
    data: "绘画",
    status: false,
  },
  {
    data: "旅游",
    status: false,
  },
  {
    data: "收藏古董物件",
    status: false,
  },
  {
    data: "看电影",
    status: false,
  },
  {
    data: "摄影",
    status: false,
  },
  {
    data: "听音乐",
    status: false,
  },
  {
    data: "舞蹈",
    status: false,
  },
  {
    data: "植物养殖",
    status: false,
  },
  {
    data: "宠物培养",
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
// 随机获取几个爱好
let unchecked = reactive(getRandomArray(hobbyList, 6));
let createLabel = ref("");
const handleUncheckedTag = (index) => {
  if (!unchecked[index].status) {
    hobby.checked.push(unchecked[index].data);
  } else {
    hobby.checked.splice(
      0,
      hobby.checked.length,
      ...hobby.checked.filter((item) => {
        return item != unchecked[index].data;
      })
    );
  }
  unchecked[index].status = !unchecked[index].status;
};
const handleCheckedTag = (index) => {
  const temp = hobby.checked.splice(index, 1);
  hobbyList.forEach((item) => {
    if (item.data == temp[0]) {
      item.status = false;
    }
  });
};
const handleCreateLabel = () => {
  hobby.createList.push(createLabel.value);
  createLabel.value = "";
};
const handleCreateList = (index) => {
  hobby.createList.splice(index, 1);
};
const updateUnchecked = () => {
  unchecked.splice(0, unchecked.length, ...getRandomArray(hobbyList, 5));
};

defineExpose({
  form: hobby,
});
</script>

<style>
</style>