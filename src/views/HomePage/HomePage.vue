<template>
  <div class="flex items-center h-80 text-center homeBg">
    <div class="text-white w-full text-center break-normal items-center">
      <p
        class="text-5xl break-normal mb-4"
        style="font-family: 庞门正道标题体 !important"
      >
        最新政策 一查便知
      </p>
      <div class="w-full flex justify-center items-center search-input">
        <el-autocomplete
          style="width: 40%"
          placeholder="请输入关键词"
          prefix-icon="Search"
          :trigger-on-focus="isLogin == true"
          v-model="searchData"
          :fetch-suggestions="querySearchAsync"
          @select="handleSelect"
          size="large"
        ></el-autocomplete>
        <el-button
          type="primary"
          size="large"
          class=".custom-input-button"
          @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <!-- <div class="w-2/5 absolute left-1/2 translate-x-[-50%] mt-10">
        <p class="text-xs">猜你想搜：腾讯 百度</p>
      </div> -->
    </div>
  </div>
  <div class="flex w-full">
    <div class="mt-4 w-1/2 ml-32">
      <div class="flex recommend-tabs">
        <el-button
          class="ml-8 recommend-tab"
          :type="isActive(0)"
          @click="setActive(0)"
        >
          <el-icon :size="20" style="vertical-align: -10%">
            <StarFilled />
          </el-icon>
          <span class="text">为你推荐</span>
        </el-button>
        <el-button
          :type="isActive(1)"
          class="ml-8 recommend-tab"
          @click="setActive(1)"
        >
          <el-icon :size="20" style="vertical-align: -10%">
            <Promotion />
          </el-icon>
          <span class="text">热门政策</span>
        </el-button>
        <el-button
          class="ml-8 recommend-tab"
          :type="isActive(2)"
          @click="setActive(2)"
        >
          <el-icon :size="20" style="vertical-align: -10%">
            <BellFilled />
          </el-icon>
          <span class="text">最新政策</span>
        </el-button>
      </div>
      <el-card class="ml-8 mt-4">
        <!-- 为你推荐 -->
        <el-table
          :data="recPolicies"
          v-if="activeTab == 0"
          class="w-full"
          @row-click="showPolicy"
        >
          <el-table-column
            prop="policy_title"
            label="标题"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="pub_time"
            label="时间"
            width="180"
            :formatter="dateFormatHandler"
          />
        </el-table>
        <!-- 热门政策 -->
        <el-table
          :data="hotPolicies"
          v-if="activeTab == 1"
          class="w-full"
          @row-click="showPolicy"
        >
          <el-table-column
            prop="policy_title"
            label="标题"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="pub_time"
            label="时间"
            width="180"
            :formatter="dateFormatHandler"
          />
        </el-table>
        <!-- 最新政策 -->
        <el-table
          :data="newPolicies"
          v-if="activeTab == 2"
          class="w-full"
          @row-click="showPolicy"
        >
          <el-table-column
            prop="policy_title"
            label="标题"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="pub_time"
            label="时间"
            width="180"
            :formatter="dateFormatHandler"
          />
        </el-table>
      </el-card>
    </div>
    <div class="ml-16 mt-3 w-1/4">
      <div class="flex mb-1">
        <!-- <div class="bg-sky-500 rounded">
          <div class="ml-3 mt-2 mb-2 mr-3">当地政策</div>
        </div> -->
        <el-tag size="large" class="mb-1">当地政策</el-tag>
        <div class="ml-auto mt-2 flex">
          <el-icon class="mt-1" color="#0284C7"><Location /></el-icon>
          <div v-if="location != ''">
            {{ locationObj.province + " " + locationObj.city }}
          </div>
          <div
            v-else
            v-loading="true"
            element-loading-spinner="el-icon-loading"
          >
            加载中
          </div>
        </div>
      </div>
      <el-card>
        <el-table
          :data="locationPolicies"
          :show-header="false"
          class="w-full"
          @row-click="showPolicy"
        >
          <el-table-column
            :show-overflow-tooltip="true"
            prop="policy_title"
          ></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Position } from "@element-plus/icons-vue";
import {
  computed,
  nextTick,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { loadBMap, getCurrentCityName } from "@/utils/getLocation.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import searchApi from "@/api/searchApi";
import { getFormattedDate } from "@/utils/getFormattedDate.js";
// 假数据
let paginationList = reactive({
  page: 1,
  pageSize: 20,
});
let uid = computed(() => {
  return store.state.user.profile.id || 4;
});
const getPolicies = () => {
  store.dispatch("dataManage/getAllPolicies", uid.value);
  store.dispatch("dataManage/getTotal");
};

const dateFormatHandler = (
  row: any,
  column: any,
  cellValue: any,
  index: number
) => {
  return getFormattedDate(cellValue);
};

const store = useStore();
const router = useRouter();

let isLogin = computed(() => {
  return store.state.user.isLogin;
});

let location = computed(() => {
  return store.getters.getFormattedLocation;
});

let locationObj = computed(() => {
  return store.state.homePage.location;
});

let Map = reactive({
  BMap: null,
  geolocation: null, // Geolocation对象实例
});

// 判断是哪种政策
let policyStatus = ref(true);

let recPolicies = computed(() => store.state.dataManage.recommendPolicies);
let hotPolicies = computed(() => store.state.dataManage.hotPolicies);
let newPolicies = computed(() => store.state.dataManage.newPolicies);
let locationPolicies = computed(() => store.state.dataManage.locationPolicies);

let policyTableList = recPolicies;

const activeTab = ref(0);
const isActive = (index) => {
  if (activeTab.value === index) return "primary";
  else return "default";
};
const setActive = (index) => {
  activeTab.value = index;
};

// 判断政策是否需要被点击
const hotPolicyBtn = () => {
  if (!policyStatus.value) {
    policyStatus.value = !policyStatus.value;
  }
};
const newPolicyBtn = () => {
  if (policyStatus.value) {
    policyStatus.value = !policyStatus.value;
  }
};

// 获取定位方法
const getLocation = () => {
  nextTick(async function () {
    try {
      Map.geolocation = new Map.BMap.Geolocation();
      store.dispatch("homePage/getLocation", Map.geolocation);
    } catch (e) {
      console.log(e);
    }
  });
};

const handleSearch = () => {
  store.dispatch("search/saveSearch", searchData.value);
  store.dispatch("indexNav/setIndexNav", "2");
  router.push("search");
};

// 前往政策展示页面
const showPolicy = (row) => {
  store.dispatch("dataManage/getPolicyDataById", {
    policyId: row.policy_id,
    uid: store.state.user.profile.id || "-1",
  });
  store.dispatch("indexNav/setBackIndex", store.state.indexNav.activeIndex);
  store.dispatch("indexNav/setIndexNav", "0");
  router.push({
    name: "policyView",
  });
};

// 处理下拉
// 获取检索记录
let searchRecord = computed(() => {
  return store.state.user.searchRecord;
});
let searchData = ref("");
interface LinkItem {
  uid: string;
  searchword: string;
  time: string;
  sid: string;
  deleteSid: string;
}
const links = ref<LinkItem[]>([]);
const loadAll = () => {
  console.log(searchRecord);
  return searchRecord;
};
let timeout: NodeJS.Timeout;
const querySearchAsync = async (
  queryString: string,
  cb: (arg: any) => void
) => {
  if (queryString.length > 0) {
    const result = await searchApi.searchSuggest(queryString);
    // console.log(
    //   result.data.suggestions.map((each) => {
    //     let _each = {
    //       value: each.text,
    //     };
    //     return _each;
    //   })
    // );
    if (result.status === 200)
      cb(
        result.data.suggestions.map((each) => {
          let _each = {
            value: each.text,
          };
          return _each;
        })
      );
    else cb([]);
  } else {
    const results = queryString
      ? links.value.value.filter(createFilter(queryString))
      : links.value.value;
    clearTimeout(timeout);

    console.log(results);

    cb(results);
  }
};
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      (restaurant.value || "")
        .toLowerCase()
        .indexOf(queryString.toLowerCase()) === 0
    );
  };
};
const handleSelect = (item: LinkItem) => {
  console.log(item);
};
onBeforeMount(() => {
  // 获取定位
  window.initBaiduMapScript = () => {
    Map.BMap = window.BMap;
    getLocation();
  };
  loadBMap("initBaiduMapScript");
});
onMounted(() => {
  // 搜索栏下拉
  store.dispatch("user/getSearchRecord", store.state.user.profile.id);
  links.value = loadAll();
  paginationList.page = Math.ceil(Math.random() * 100);
  getPolicies();
  // console.log("getCurrentCityName", getCurrentCityName());
});
</script>

<style lang="scss" scoped>
.homeBg {
  background: url(@/assets/homePage-bg.png);
  background-size: 110%;
}
.search-input {
  :deep(.el-input__wrapper) {
    border-radius: 4px 0 0 4px;
  }

  :deep(.el-button--large) {
    border-radius: 0 4px 4px 0;
  }
}

.recommend-tabs {
  gap: 20px;
  .recommend-tab {
    font-size: 20px;
    .text {
      margin-left: 8px;
    }
  }
}
</style>
