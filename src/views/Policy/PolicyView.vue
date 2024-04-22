<template>
  <div class="bg-container">
    <div style="height: 18%"></div>
    <div class="flex pt-3">
      <div style="width: 3%"></div>
      <div>最新政策</div>
    </div>
    <div class="flex pb-3">
      <div style="width: 8%"></div>
      <div>一查便知</div>
    </div>
  </div>
  <div class="flex">
    <div style="width: 80%" class="mt-5">
      <div
        class="text-4xl text-center"
        style="margin-left: 10%; margin-right: 10%"
      >
        {{ policyData.policy_title }}
      </div>
      <div class="text-base text-gray-400 text-center mt-5">
        发布日期: {{ policyData.pub_time }} <br />
        发布机构: {{ policyData.pub_agency_fullname }}
      </div>
      <el-card class="mt-5" style="margin-left: 5%; margin-right: 5%">
        <div class="text-lg" style="white-space: pre-wrap">
          {{ policyData.policy_body }}
        </div>
      </el-card>
      <div class="flex w-full mt-5 mb-5">
        <div class="w-4/5"></div>
        <el-button type="warning" v-if="isLogin" @click="handleShare">
          <svg
            t="1675586441748"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8259"
            width="14"
            height="14"
          >
            <path
              d="M384 64a64 64 0 1 1 0 128H192a32 32 0 0 0-32 32v608a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32v-160a64 64 0 1 1 128 0v160a160 160 0 0 1-160 160H192a160 160 0 0 1-160-160V224a160 160 0 0 1 160-160z m416 32l224 208-224 208v-118.144l-47.2 1.152a576.992 576.992 0 0 0-491.2 298.56L256 704l45.44-145.408A512 512 0 0 1 788.8 199.296l11.2 0.096V96z"
              fill="#ffffff"
              p-id="8260"
            ></path></svg
          >分享
        </el-button>
        <el-button
          color="#FCFC43"
          style="color: #0089d1"
          v-if="isFavourite"
          @click="handleCancelFavourite"
        >
          <svg
            t="1675581920071"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4438"
            width="14"
            height="14"
          >
            <path
              d="M1003.735979 445.925119 1003.735979 445.925119 746.069525 635.190717l99.258655 307.950697c1.547239 4.76963 2.40477 9.924024 2.40477 15.210423 0 26.948769-21.48329 48.734958-47.963385 48.734958-10.509355 0-20.191878-3.477194-28.105105-9.282411l0 0L512.001535 807.118438 252.337587 997.802338l-0.016373 0c-7.896854 5.805216-17.58347 9.282411-28.090778 9.282411-26.495444 0-47.962362-21.786189-47.962362-48.734958 0-5.2864 0.854461-10.440793 2.4017-15.210423l99.259678-307.950697L20.250718 445.925119l0.016373 0C8.244266 437.092963 0.410857 422.717557 0.410857 406.471548c0-26.881231 21.466917-48.671513 47.960315-48.671513l0 0 318.987055 0 98.775654-306.463834c6.027274-19.9821 24.270776-34.422997 45.86663-34.422997 21.595854 0 39.839357 14.439874 45.849234 34.422997l98.791004 306.463834 318.988078 0 0 0c26.494421 0 47.959292 21.790282 47.959292 48.671513C1023.587096 422.717557 1015.756757 437.092963 1003.735979 445.925119z"
              p-id="4439"
              fill="#FFB700"
            ></path>
          </svg>
          &nbsp;取消收藏
        </el-button>
        <el-popover :visible="favouriteVisible" placement="top" :width="160">
          <el-select
            placeholder="请选择收藏夹"
            v-model="chooseFavourite"
            clearable
          >
            <el-option
              v-for="(item, index) in Favourites"
              :key="index"
              :label="item.name"
              :value="item.cid"
            />
          </el-select>
          <el-input
            placeholder="新建文件夹"
            clearable
            class="mt-2"
            v-model="newFavourite"
          >
            <template #suffix>
              <el-icon @click="addNewFavourite" style="cursor: pointer">
                <Plus />
              </el-icon>
            </template>
          </el-input>
          <div style="text-align: right; margin: 0; padding: 2px">
            <el-button
              size="small"
              text
              @click="
                favouriteVisible = false;
                chooseFavourite = '';
              "
              >取消</el-button
            >
            <el-button size="small" type="primary" @click="handleSaveFavourite">
              确定
            </el-button>
          </div>
          <template #reference>
            <el-button
              v-if="isLogin && !isFavourite"
              @click="favouriteVisible = !favouriteVisible"
            >
              <svg
                t="1675581920071"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4438"
                width="14"
                height="14"
              >
                <path
                  d="M1003.735979 445.925119 1003.735979 445.925119 746.069525 635.190717l99.258655 307.950697c1.547239 4.76963 2.40477 9.924024 2.40477 15.210423 0 26.948769-21.48329 48.734958-47.963385 48.734958-10.509355 0-20.191878-3.477194-28.105105-9.282411l0 0L512.001535 807.118438 252.337587 997.802338l-0.016373 0c-7.896854 5.805216-17.58347 9.282411-28.090778 9.282411-26.495444 0-47.962362-21.786189-47.962362-48.734958 0-5.2864 0.854461-10.440793 2.4017-15.210423l99.259678-307.950697L20.250718 445.925119l0.016373 0C8.244266 437.092963 0.410857 422.717557 0.410857 406.471548c0-26.881231 21.466917-48.671513 47.960315-48.671513l0 0 318.987055 0 98.775654-306.463834c6.027274-19.9821 24.270776-34.422997 45.86663-34.422997 21.595854 0 39.839357 14.439874 45.849234 34.422997l98.791004 306.463834 318.988078 0 0 0c26.494421 0 47.959292 21.790282 47.959292 48.671513C1023.587096 422.717557 1015.756757 437.092963 1003.735979 445.925119z"
                  p-id="4439"
                  fill="#8a8a8a"
                ></path>
              </svg>
              &nbsp;收藏
            </el-button>
          </template>
        </el-popover>

        <el-button
          class="ml-auto"
          v-if="!isLogin"
          @click="collectVisible = true"
        >
          <svg
            t="1675581920071"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4438"
            width="14"
            height="14"
          >
            <path
              d="M1003.735979 445.925119 1003.735979 445.925119 746.069525 635.190717l99.258655 307.950697c1.547239 4.76963 2.40477 9.924024 2.40477 15.210423 0 26.948769-21.48329 48.734958-47.963385 48.734958-10.509355 0-20.191878-3.477194-28.105105-9.282411l0 0L512.001535 807.118438 252.337587 997.802338l-0.016373 0c-7.896854 5.805216-17.58347 9.282411-28.090778 9.282411-26.495444 0-47.962362-21.786189-47.962362-48.734958 0-5.2864 0.854461-10.440793 2.4017-15.210423l99.259678-307.950697L20.250718 445.925119l0.016373 0C8.244266 437.092963 0.410857 422.717557 0.410857 406.471548c0-26.881231 21.466917-48.671513 47.960315-48.671513l0 0 318.987055 0 98.775654-306.463834c6.027274-19.9821 24.270776-34.422997 45.86663-34.422997 21.595854 0 39.839357 14.439874 45.849234 34.422997l98.791004 306.463834 318.988078 0 0 0c26.494421 0 47.959292 21.790282 47.959292 48.671513C1023.587096 422.717557 1015.756757 437.092963 1003.735979 445.925119z"
              p-id="4439"
              fill="#8a8a8a"
            ></path>
          </svg>
          &nbsp;收藏
        </el-button>
        <el-button type="primary" class="mr-20" @click="handleBack">
          返回
        </el-button>
      </div>
    </div>
    <div style="width: 20%" class="mt-5">
      <el-image
        class="ml-8"
        style="width: 200px; height: 200px"
        :src="url"
      ></el-image>
      <div class="mt-5">
        <el-card style="margin-right: 5%">
          <div class="text-xl">相关政策推荐</div>
          <hr />
          <div
            class="policyRecommend-container"
            v-loading="getRelatedPoliciesLoading"
          >
            <p
              class="policyRecommend"
              v-for="(item, index) in policyRecommend.list"
              :key="index"
              @click="showPolicy(item)"
            >
              {{ item.policy_title }}
            </p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
  <div>
    <el-dialog
      center
      :model-value="collectVisible"
      @close="collectVisible = false"
      width="30%"
    >
      <el-icon :size="20" style="vertical-align: -20%">
        <WarningFilled style="color: #ffbb61" />
      </el-icon>
      &nbsp;请先登录账号
      <div class="mt-5 flex">
        <div class="w-4/5"></div>
        <el-button>取消</el-button>
        <el-button type="primary" @click="handleLogin">去登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import dataManageApi from "@/api/dataManageApi";
import historyApi from "@/api/historyApi";

const route = useRoute();
const store = useStore();
const router = useRouter();

let url = "../src/assets/policy.png";
let policyData = computed(() => {
  return store.state.dataManage.policyData;
});
let paginationList = reactive({
  page: 1,
  pageSize: 4,
});
let uid = computed(() => {
  return store.state.user.profile.id || 4;
});
const getPolicies = () => {
  store.dispatch("dataManage/getAllPolicies", uid.value);
};
let policyRecommend = reactive({
  list: [],
});
// 是否已经登录
let isLogin = computed(() => {
  return store.state.user.isLogin;
});
// 是否已经收藏
let isFavourite = computed(() => {
  return store.state.dataManage.policyData.collection;
});
let collectVisible = ref(false);
let Favourites = computed(() => {
  return store.state.favourite.favouriteList;
});
// 选择文件夹
let chooseFavourite = ref("");
let favouriteVisible = ref(false);
// 新建文件夹名称
let newFavourite = ref("");
// 新建文件夹
const addNewFavourite = () => {
  store.dispatch("favourite/createFavourite", {
    uid: store.state.user.profile.id,
    name: newFavourite.value,
  });
  chooseFavourite.value = newFavourite.value;
};
const handleBack = () => {
  store.dispatch("indexNav/setIndexNav", store.state.indexNav.backIndex + "");
  router.back();
};
// 确定收藏
const handleSaveFavourite = () => {
  store.dispatch("favourite/addFavouritePolicy", {
    uid: store.state.user.profile.id,
    pid: policyData.value.policy_id,
    cid: chooseFavourite.value,
  });
  store.dispatch("dataManage/changeFavourite");
  favouriteVisible.value = false;
  chooseFavourite.value = "";
};
// 取消收藏
const handleCancelFavourite = () => {
  const form = {
    uid: store.state.user.profile.id,
    pid: policyData.value.policy_id,
  };
  store.dispatch("favourite/cancelFavourite", form);
  store.dispatch("dataManage/changeFavourite");
};

// 分享
const handleShare = (e) => {
  return ElMessage.success("复制链接成功");
};
const handleLogin = () => {
  router.push("login");
};

// 查看下一个政策
const showPolicy = async (policy) => {
  store.dispatch("dataManage/getPolicyDataById", {
    policyId: policy.policy_id,
    uid: store.state.user.profile.id || "-1",
  });
  paginationList.page = Math.ceil(Math.random() * 100);
  getPolicies();
  /*  store.dispatch("indexNav/setBackIndex", store.state.indexNav.activeIndex);
  store.dispatch("indexNav/setIndexNav", "0"); */
  /* let result = await searchApi.saveSearchRecord(
    viewData.searchKeywords,
    policy.policy_id,
    store.state.user.profile.id,
    sid.value
  );
  console.log(result); */
  /* router.push({
    name: "policyView",
  }); */
};

const getRelatedPoliciesLoading = ref(true);
const getRelatedPolicies = async () => {
  const results = await dataManageApi.queryRelatedPolicies(
    policyData.value.policy_title
  );
  if (results.status === 200) {
    policyRecommend.list = results.data;
    getRelatedPoliciesLoading.value = false;
  }
  console.log("getRelatedPolicies", results);
};
const addBrsHistory = async () => {
  const results = await historyApi.addHistory(
    store.state.user.profile.id,
    policyData.value.policy_id
  );
};
onMounted(() => {
  // 从query中获取pid参数
  console.log(route.query?.id);
  if (route.query?.id) {
    store.dispatch("dataManage/getPolicyDataById", {
      policyId: route.query.id,
      uid: store.state.user.profile.id || "-1",
    });
  }
  if (store.state.user.profile.id) {
    store.dispatch("favourite/getFavouriteTitle", store.state.user.profile.id);
  }
  paginationList.page = Math.ceil(Math.random() * 100);
  // 添加浏览记录
  addBrsHistory();
  getRelatedPolicies();
  getPolicies();
});
</script>

<style scoped lang="scss">
.bg-container {
  background: #0089d1;
  width: 100%;
  font-family: 庞门正道标题体 !important;
  color: white;
  font-size: 35px;
  user-select: none;
}
.policyRecommend-container {
  min-height: 300px;
  .policyRecommend {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .policyRecommend:hover {
    color: #409eff;
  }
}
</style>
