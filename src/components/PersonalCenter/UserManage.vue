<template>
  <div class="flex mb-2" style="align-items: center">
    <span class="bg-blue-500 w-2 h-8"></span>&nbsp;
    <span class="h-8 text-lg">用户管理</span>
  </div>
  <div
    style="border: 1px solid white; border-top-color: gray"
    class="py-4 w-full"
  >
    <el-card>
      <el-table :data="userList" style="width: 100%">
        <el-table-column label="序号" align="center" type="index" width="60">
        </el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.label"
          :label="item.label"
          :prop="item.prop"
          :sortable="item.sortable"
          align="center"
          :width="item.width ? item.width : ''"
          :min-width="item.miniWidth ? item.miniWidth : ''"
        >
        </el-table-column>
        <el-table-column label="管理" align="center" min-width="200">
          <template #default="scope"
            ><el-button @click="resetUserPwd(scope.$index)" link type="primary"
              >重置用户密码</el-button
            >
            <el-button @click="deleteTheUser(scope.$index)" link type="danger"
              >删除该用户</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-center mt-2">
        <el-pagination
          v-model:current-page="current.page"
          v-model:page-size="current.pageSize"
          :page-sizes="[5, 10, 20, 40, 80, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
// 表格
const columns = [
  {
    label: "用户名",
    miniWidth: "120",
    prop: "name",
  },
  {
    label: "性别",
    miniWidth: "80",
    prop: "sex",
  },
  {
    label: "所在地",
    miniWidth: "200",
    prop: "address",
  },
  {
    label: "毕业院校",
    miniWidth: "200",
    prop: "education",
  },
  {
    label: "教育程度",
    miniWidth: "80",
    prop: "graduation",
  },
  {
    label: "职业",
    miniWidth: "80",
    prop: "occupation",
  },
  {
    label: "出生日期",
    miniWidth: "160",
    prop: "birthday",
  },
];
// 分页器
const current = reactive({
  page: 1,
  pageSize: 10,
});
const total = computed(() => {
  return parseInt(store.state.user.userList.total);
});
const userList = computed(() => {
  return store.state.user.userList.users;
});
const handleSizeChange = (val: number) => {
  current.pageSize = val;
  store.dispatch("user/getUserList", current);
};
const handleCurrentChange = (val: number) => {
  current.page = val;
  store.dispatch("user/getUserList", current);
};
const deleteTheUser = (index) => {
  store.dispatch("user/deleteTheUser", {
    id: userList.value[index].id,
    current: current,
  });
  // store.dispatch("user/getUserList", current);
};
const resetUserPwd = (index) => {
  store.dispatch("user/resetUserPwd", userList.value[index].id);
};
onMounted(() => {
  store.dispatch("user/getUserList", current);
});
</script>

<style>
</style>