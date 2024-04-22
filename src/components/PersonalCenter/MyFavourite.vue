<template>
  <!-- 初始状态 -->
  <div v-if="status == false">
    <div class="flex mb-2" style="align-items: center">
      <span class="bg-blue-500 w-2 h-8"></span>&nbsp;
      <span class="h-8 text-lg">我的收藏</span>
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
      <div
        class="w-full h-12 flex"
        style="border: 1px solid #dcdfe6; background-color: #f3fbff"
      >
        <el-icon :size="30" style="vertical-align: -20%" class="mt-2 ml-2"
          ><Folder
        /></el-icon>
        <span class="text-lg mt-2">&nbsp;我创建的收藏夹</span>
        <el-button link class="ml-auto" @click="addFavourite">
          <el-icon class="ml-auto"><Plus /></el-icon>&nbsp;&nbsp;
        </el-button>
      </div>
      <div
        class="mt-4"
        style="border: 1px solid #dcdfe6"
        v-for="(item, index) in favourite"
        :key="item.cid"
      >
        <div
          class="flex"
          style="
            border: 1px solid white;
            border-bottom-color: #dcdfe6;
            background-color: #f5f7fa;
          "
        >
          <svg
            t="1675171891725"
            class="icon mt-2 ml-2"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4381"
            width="20"
            height="20"
          >
            <path
              d="M819.2 1024c-3.413333 0-10.24-3.413333-13.653333-3.413333L512 723.626667l-293.546667 293.546666c-6.826667 6.826667-13.653333 6.826667-20.48 6.826667-6.826667-3.413333-10.24-10.24-10.24-17.066667V17.066667c0-10.24 6.826667-17.066667 17.066667-17.066667h614.4c10.24 0 17.066667 6.826667 17.066667 17.066667v989.866666c0 6.826667-3.413333 13.653333-10.24 17.066667H819.2z m-307.2-341.333333c3.413333 0 10.24 0 13.653333 3.413333l276.48 276.48V34.133333h-580.266666v931.84l276.48-276.48c3.413333-6.826667 10.24-6.826667 13.653333-6.826666z"
              fill=""
              p-id="4382"
            ></path>
            <path
              d="M638.293333 549.546667c-3.413333 0-6.826667 0-10.24-3.413334L512 460.8 395.946667 546.133333c-6.826667 3.413333-13.653333 3.413333-20.48 0-6.826667-3.413333-6.826667-13.653333-6.826667-20.48l44.373333-136.533333L300.373333 307.2c-6.826667-6.826667-10.24-13.653333-6.826666-20.48 3.413333-6.826667 10.24-10.24 17.066666-10.24h143.36l44.373334-136.533333c3.413333-13.653333 27.306667-13.653333 34.133333 0l44.373333 136.533333h143.36c6.826667 0 13.653333 3.413333 17.066667 10.24 3.413333 6.826667 0 13.653333-6.826667 20.48L614.4 392.533333l44.373333 136.533334c3.413333 6.826667 0 13.653333-6.826666 20.48-6.826667-3.413333-10.24 0-13.653334 0zM512 423.253333c3.413333 0 6.826667 0 10.24 3.413334l81.92 61.44-30.72-98.986667c-3.413333-6.826667 0-13.653333 6.826667-20.48L662.186667 307.2h-102.4c-6.826667 0-13.653333-3.413333-17.066667-10.24L512 201.386667l-30.72 98.986666c-3.413333 6.826667-10.24 10.24-17.066667 10.24h-102.4l81.92 61.44c6.826667 3.413333 6.826667 13.653333 6.826667 20.48l-30.72 98.986667 81.92-61.44c3.413333-6.826667 6.826667-6.826667 10.24-6.826667z"
              fill=""
              p-id="4383"
            ></path>
          </svg>
          &nbsp;
          <div class="mt-2">{{ item.name }}</div>
          <el-button link @click="changeName(index)">
            <svg
              t="1675172370946"
              class="icon mt-2"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5376"
              width="20"
              height="20"
            >
              <path
                d="M257.7 752c2 0 4-0.2 6-0.5L431.9 722c2-0.4 3.9-1.3 5.3-2.8l423.9-423.9c3.9-3.9 3.9-10.2 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2c-1.9 11.1 1.5 21.9 9.4 29.8 6.6 6.4 14.9 9.9 23.8 9.9z m67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
                p-id="5377"
              ></path>
            </svg>
          </el-button>
          <div class="ml-auto mt-2 mr-4">
            <el-button link type="primary" @click="deleteFavourite(index)">
              <el-icon><Delete /></el-icon>删除该文件夹
            </el-button>
          </div>
        </div>
        <div
          style="border: 1px solid #dcdfe6; border-bottom: none"
          class="w-11/12 ml-10 mt-4 mb-4"
        >
          <el-table
            :data="(item.collectionPolicies || '').slice(0, 4)"
            :show-header="false"
          >
            <el-table-column prop="policy_title" label="政策">
              <template #default="scope">
                <div @click="showPolicy(scope.row)" style="cursor: pointer">
                  {{ scope.row.policy_title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="handleClick(scope.row.policy_id)"
                  >取消收藏</el-button
                >
              </template>
            </el-table-column>
            <template v-slot:empty>
              <div class="flex">
                <div>这里什么也没有，</div>
                <div class="text-blue-500" @click="handeleToSearch">去加入</div>
              </div>
            </template>
          </el-table>
        </div>
        <div class="w-full flex">
          <el-button
            link
            type="primary"
            size="small"
            style="margin-left: auto"
            @click="handleCheckMore(index)"
            >更多</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <!-- 查看政策状态 -->
  <div v-if="status == true">
    <div class="mb-2" style="align-items: center">
      <div class="flex mb-2">
        <span class="bg-blue-500 w-2 h-8"></span>&nbsp;
        <span class="h-8 text-lg">我的收藏</span>
      </div>

      <div class="flex" style="border: 1px solid white; border-top-color: gray">
        <svg
          t="1675171891725"
          class="icon mt-2 ml-2"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4381"
          width="20"
          height="20"
        >
          <path
            d="M819.2 1024c-3.413333 0-10.24-3.413333-13.653333-3.413333L512 723.626667l-293.546667 293.546666c-6.826667 6.826667-13.653333 6.826667-20.48 6.826667-6.826667-3.413333-10.24-10.24-10.24-17.066667V17.066667c0-10.24 6.826667-17.066667 17.066667-17.066667h614.4c10.24 0 17.066667 6.826667 17.066667 17.066667v989.866666c0 6.826667-3.413333 13.653333-10.24 17.066667H819.2z m-307.2-341.333333c3.413333 0 10.24 0 13.653333 3.413333l276.48 276.48V34.133333h-580.266666v931.84l276.48-276.48c3.413333-6.826667 10.24-6.826667 13.653333-6.826666z"
            fill=""
            p-id="4382"
          ></path>
          <path
            d="M638.293333 549.546667c-3.413333 0-6.826667 0-10.24-3.413334L512 460.8 395.946667 546.133333c-6.826667 3.413333-13.653333 3.413333-20.48 0-6.826667-3.413333-6.826667-13.653333-6.826667-20.48l44.373333-136.533333L300.373333 307.2c-6.826667-6.826667-10.24-13.653333-6.826666-20.48 3.413333-6.826667 10.24-10.24 17.066666-10.24h143.36l44.373334-136.533333c3.413333-13.653333 27.306667-13.653333 34.133333 0l44.373333 136.533333h143.36c6.826667 0 13.653333 3.413333 17.066667 10.24 3.413333 6.826667 0 13.653333-6.826667 20.48L614.4 392.533333l44.373333 136.533334c3.413333 6.826667 0 13.653333-6.826666 20.48-6.826667-3.413333-10.24 0-13.653334 0zM512 423.253333c3.413333 0 6.826667 0 10.24 3.413334l81.92 61.44-30.72-98.986667c-3.413333-6.826667 0-13.653333 6.826667-20.48L662.186667 307.2h-102.4c-6.826667 0-13.653333-3.413333-17.066667-10.24L512 201.386667l-30.72 98.986666c-3.413333 6.826667-10.24 10.24-17.066667 10.24h-102.4l81.92 61.44c6.826667 3.413333 6.826667 13.653333 6.826667 20.48l-30.72 98.986667 81.92-61.44c3.413333-6.826667 6.826667-6.826667 10.24-6.826667z"
            fill=""
            p-id="4383"
          ></path>
        </svg>
        &nbsp;
        <div class="mt-2">{{ favourite[checkFavouriteIndex].name }}</div>
        <el-button link @click="changeName">
          <svg
            t="1675172370946"
            class="icon mt-2"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5376"
            width="20"
            height="20"
          >
            <path
              d="M257.7 752c2 0 4-0.2 6-0.5L431.9 722c2-0.4 3.9-1.3 5.3-2.8l423.9-423.9c3.9-3.9 3.9-10.2 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2c-1.9 11.1 1.5 21.9 9.4 29.8 6.6 6.4 14.9 9.9 23.8 9.9z m67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
              p-id="5377"
            ></path>
          </svg>
        </el-button>
        <div class="w-4/5"></div>
        <el-button link class="ml-auto" @click="status = 0"
          ><svg
            t="1675323564288"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4357"
            width="20"
            height="20"
          >
            <path
              d="M553.71 125.44H301.33c-15.26 0-27.63 12.37-27.63 27.63s12.37 27.63 27.63 27.63h252.38c145.76 0 264.62 117.34 267.08 262.53 2.53 149.42-123.71 271.72-273.15 271.72H302.31l1.17-1.12 75.18-75.18c10.79-10.79 10.79-28.29 0-39.08s-28.29-10.79-39.08 0L217.04 722.11c-10.79 10.79-10.79 28.29 0 39.08l129.27 129.27c10.79 10.79 28.29 10.79 39.08 0s10.79-28.29 0-39.08l-81.16-81.16h242.62c175.43 0 323.9-137.29 329.1-312.64 5.4-182.2-141.24-332.14-322.24-332.14z"
              p-id="4358"
            ></path></svg
        ></el-button>
      </div>
    </div>
    <div style="border: 1px solid #dcdfe6" class="w-full mt-4 mb-4">
      <el-table
        :data="favourite[checkFavouriteIndex].collectionPolicies"
        :show-header="false"
        @row-click="showPolicy"
      >
        <el-table-column prop="policy_title" label="政策" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClick(scope.row.policy_id)"
              >取消收藏</el-button
            >
          </template>
        </el-table-column>
        <template v-slot:empty>
          <div class="flex">
            <div>这里什么也没有，</div>
            <div class="text-blue-500" @click="handeleToSearch">去加入</div>
          </div>
        </template>
      </el-table>
    </div>
  </div>
  <!-- 文件夹重命名 -->
  <div>
    <el-dialog
      title="文件夹重命名"
      center
      :model-value="changeVisible"
      @close="changeVisible = false"
      width="40%"
    >
      <!-- <div class="flex">
        <div class="w-12 mt-1 text-base">名称</div>
        <el-input placeholder="请输入名称" v-model="newName.name"></el-input>
      </div> -->
      <el-form :model="newName">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入名称"
            v-model="newName.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex ml-auto">
            <el-button @click="changeVisible = false">取消</el-button>
            <el-button type="primary" @click="handleChangeName()"
              >确定</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <!-- <div class="mt-2 w-full flex ml-auto">
        <div class="w-4/5"></div>
        
      </div> -->
    </el-dialog>
  </div>
  <!-- 添加收藏夹 -->
  <div>
    <el-dialog
      title="创建新的收藏夹"
      center
      :model-value="addVisible"
      @close="addVisible = false"
      width="40%"
    >
      <el-form :model="newFavouriteName">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入名称"
            v-model="newFavouriteName.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex ml-auto">
            <el-button @click="addVisible = false">取消</el-button>
            <el-button type="primary" @click="handleCreateFavourite()"
              >确定</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

let status = ref(false);
let favourite = computed(() => {
  return store.state.favourite.favouriteList;
});
// 获取详细收藏内容的索引
let checkFavouriteIndex = ref(0);

let changeVisible = ref(false);
let addVisible = ref(false);

// 文件夹重命名
const newName = reactive({ name: "", cid: 0 });

// 新增文件夹
const newFavouriteName = reactive({ name: "", uid: 0 });

const handleClick = (pid) => {
  let form = { uid: store.state.user.profile.id, pid: pid };
  store.dispatch("favourite/cancelFavourite", form);
};
// 收藏夹重命名
const changeName = (index) => {
  changeVisible.value = true;
  newName.name = favourite.value[index].name;
  newName.cid = favourite.value[index].cid;
};
// 处理文件夹重命名
const handleChangeName = () => {
  store.dispatch("favourite/changeFavouriteName", newName);
  changeVisible.value = false;
};
// 添加收藏夹
const addFavourite = () => {
  addVisible.value = true;
  newFavouriteName.uid = store.state.user.profile.id;
};
// 创建收藏夹
const handleCreateFavourite = () => {
  newFavouriteName.name = store.dispatch(
    "favourite/createFavourite",
    newFavouriteName
  );
  addVisible.value = false;
};
// 查看收藏夹具体内容
const handleCheckMore = (index) => {
  status.value = true;
  checkFavouriteIndex.value = index;
};
// 删除文件夹
const deleteFavourite = (index) => {
  store.dispatch("favourite/deleteFavourite", favourite.value[index].cid);
};
const handeleToSearch = () => {
  router.push("search");
};
// 查看政策
const showPolicy = (row) => {
  store.dispatch("dataManage/getPolicyDataById", {
    policyId: row.policy_id,
    uid: store.state.user.profile.id,
  });
  store.dispatch("indexNav/setBackIndex", store.state.indexNav.activeIndex);
  store.dispatch("indexNav/setIndexNav", "0");
  router.push({
    name: "policyView",
  });
};
onMounted(() => {
  store.dispatch("favourite/getFavouriteTitle", store.state.user.profile.id);
});
</script>

<style>
.el-table__empty-text {
  width: auto;
}
::-webkit-scrollbar {
  display: none;
}
</style>
