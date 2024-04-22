<template>
  <div class="flex mb-2" style="align-items: center">
    <span class="bg-blue-500 w-2 h-8"></span>&nbsp;
    <span class="h-8 text-lg">历史记录</span>
    <el-button link class="ml-auto" type="primary" @click="clearHistory"
      >清除全部记录</el-button
    >
    &nbsp;&nbsp;
  </div>
  <div
    style="
      border: 1px solid white;
      border-top-color: gray;
      height: calc(90vh - 110px);
      overflow-y: auto;
    "
    class="py-4"
  >
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in history"
        :key="index"
        :timestamp="item.time"
        placement="top"
      >
        <el-card>
          <div
            v-for="(item_content, index) in item.content"
            :key="index"
            class="flex"
          >
            <p
              class="w-full"
              @click="showPolicy(item.pids[index])"
              style="cursor: pointer"
            >
              {{ item_content }}
            </p>
            <el-button
              type="primary"
              link
              @click="deleteSingleHistory(item.pids[index])"
              ><el-icon><Delete /></el-icon>删除记录</el-button
            >
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const history = computed(() => store.state.history.historyList);

const clearHistory = () => {};

const deleteSingleHistory = async (pid) => {
  store.dispatch("history/deleteSingleHistory", {
    uid: store.state.user.profile.id,
    pid,
  });
};

// 查看政策
const showPolicy = (pid) => {
  store.dispatch("dataManage/getPolicyDataById", {
    policyId: pid,
    uid: store.state.user.profile.id,
  });
  store.dispatch("indexNav/setBackIndex", store.state.indexNav.activeIndex);
  store.dispatch("indexNav/setIndexNav", "0");
  router.push({
    name: "policyView",
  });
};

onMounted(() => {
  store.dispatch("history/getHistory", store.state.user.profile.id);
});
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
