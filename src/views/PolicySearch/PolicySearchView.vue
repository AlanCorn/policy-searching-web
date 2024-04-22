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
  <div class="p-4 flex flex-col items-center bg-color">
    <div class="w-full flex justify-center items-center search-input">
      <el-autocomplete
        style="width: 40%"
        placeholder="请输入关键词"
        prefix-icon="Search"
        :trigger-on-focus="isLogin == true"
        v-model="viewData.searchKeywords"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelect"
        size="large"
      ></el-autocomplete>
      <el-button
        type="primary"
        size="large"
        @click="searchPolicyWithRecord()"
        class=".custom-input-button"
        >搜索</el-button
      >
    </div>
    <div class="flex w-2/5 justify-start p-3">
      <div class="flex" v-if="viewData.guessKewword.length > 0">
        <div class="font-semibold text-gray-600 mx-2 whitespace-nowrap">
          猜你想搜:
        </div>
        <div
          class="underline underline-offset-4 text-blue-500 cursor-pointer mx-1 whitespace-nowrap"
          @click="handelGuessKeyword"
        >
          {{ viewData.guessKewword }}
        </div>
      </div>

      <div>
        <el-checkbox v-model="isAccurate" class="ml-56"
          >开启精确匹配</el-checkbox
        >
      </div>
    </div>
    <!-- 筛选 -->
    <div class="el-style-card box-selected-tags flex justify-between">
      <el-form :model="viewData.filters" label-width="100px">
        <el-form-item label="已选条件">
          <div class="flex flex-wrap py-1">
            <el-tag
              v-for="tag in viewData.selectedTags"
              :key="tag"
              class="mx-1"
              closable
              effect="plain"
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag.tagName }}
            </el-tag>
          </div>
        </el-form-item>
      </el-form>
      <el-button class="mr-4" type="primary" @click="resetFilter"
        >重置</el-button
      >
    </div>
    <div class="el-style-card box-filter">
      <el-form label-width="100px">
        <el-form-item label="省份地区" v-show="viewData.showCityFilter">
          <div class="flex w-full">
            <!-- 省份筛选 -->
            <CustomCollapse>
              <template #title>
                <div class="flex overflow-hidden gap-1">
                  <el-check-tag
                    v-for="(item, index) in viewData.selectableTags.slice(
                      0,
                      10
                    )"
                    :key="index"
                    :checked="isTagChecked(item)"
                    @change="onCheckTag(item)"
                  >
                    {{ item.provinceName }}{{ item.cityName }}
                  </el-check-tag>
                </div>
              </template>
              <template #content>
                <div class="flex overflow-hidden gap-1 flex-wrap">
                  <el-check-tag
                    v-for="(item, index) in viewData.selectableTags.slice(10)"
                    :key="index"
                    :checked="isTagChecked(item)"
                    @change="onCheckTag(item)"
                  >
                    {{ item.provinceName }}{{ item.cityName }}
                  </el-check-tag>
                </div>
              </template>
            </CustomCollapse>
            <!-- 省份多选 -->
          </div>

          <!-- <div class="flex w-full">
            <div class="flex overflow-hidden gap-1">
              <div v-for="index of 40" :key="index">
                <el-tag effect="plain">北京市</el-tag>
              </div>
            </div>
          </div> -->
        </el-form-item>
        <el-form-item label="更多筛选">
          <div class="flex justify-between gap-5">
            <el-select
              v-model="viewData.policy_grade"
              filterable
              clearable
              :placeholder="options[0].selectorName"
              @change="
                handleFormItemChange('policy_grade', viewData.policy_grade)
              "
              @clear="
                handleFormItemClear('policy_grade', viewData.policy_grade)
              "
            >
              <el-option
                v-for="item in options[0].options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="viewData.policy_type"
              filterable
              clearable
              :placeholder="options[1].selectorName"
              @change="
                handleFormItemChange('policy_type', viewData.policy_type)
              "
              @clear="handleFormItemClear('policy_type', viewData.policy_type)"
            >
              <el-option
                v-for="item in options[1].options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-config-provider :locale="zhCn">
              <el-date-picker
                v-model="viewData.pub_time"
                type="daterange"
                :shortcuts="shortcuts"
                start-placeholder="起始日期"
                end-placeholder="结束日期"
                class="mr-4"
              />
            </el-config-provider>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 检索结果 -->
    <div class="el-style-card w-11/12" v-if="(policyList || []).length != 0">
      <div v-for="data in policyList" class="ml-10 mr-10 mt-5 policyItem">
        <div class="flex policy-card-box mb-5">
          <div class="policy-card-content">
            <div
              class="text-xl font-semibold ml-2 mb-1 policyTitle"
              @click="showPolicy(data)"
            >
              {{ data.policy_title }}
            </div>
            <div class="policy-other-info mt-4 ml-3">
              <div class="flex mb-2 gap-20 text-normal">
                <div class="policy-type-box flex justify-start">
                  <svg
                    t="1677240672081"
                    class="icon ml-2 mb-1"
                    style="vertical-align: -10%"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8992"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M213.333333 85.333333h597.333334a42.666667 42.666667 0 0 1 42.666666 42.666667v816.768a21.333333 21.333333 0 0 1-32.682666 18.090667L512 769.28l-308.650667 193.536A21.333333 21.333333 0 0 1 170.666667 944.768V128a42.666667 42.666667 0 0 1 42.666666-42.666667z m554.666667 85.333334H256v658.432l256-160.469334 256 160.469334V170.666667zM341.333333 384h341.333334v85.333333H341.333333V384z"
                      p-id="8993"
                      fill="#2487D0"
                    ></path>
                  </svg>
                  <div class="ml-3">
                    {{ data.policy_type }}
                  </div>
                </div>
                <div class="text-center">
                  {{ dateFormatter(data.pub_time) }}
                </div>
                <div class="text-center">ID:{{ data.policy_id }}</div>
              </div>
              <div class="grid info-item-grid">
                <div class="flex" v-if="data.pub_agency !== ''">
                  <div class="text-blue-400">发布机构：</div>
                  <div class="agency truncate">{{ data.pub_agency }}</div>
                </div>
                <div
                  class="flex justify-center"
                  v-if="data.policy_grade !== ''"
                >
                  <div class="text-blue-400 truncate">发布级别：</div>
                  {{ data.policy_grade }}
                </div>
                <div class="flex" v-if="data.province !== ''">
                  <div class="text-blue-400 flex truncate">
                    <div>
                      <el-icon style="vertical-align: -10%"
                        ><Location
                      /></el-icon>
                    </div>
                    发布地区：
                  </div>
                  {{ data.province }}
                </div>
              </div>
            </div>
          </div>
          <div class="policy-card-link">
            <el-button @click="showPolicy(data)" type="primary" class="mt-5"
              >前往查看</el-button
            >
          </div>
          &nbsp;&nbsp;&nbsp;
        </div>
        <div class="line" />
      </div>
      <div class="flex justify-center">
        <el-pagination
          v-model:current-page="paginationList.page"
          v-model:page-size="paginationList.size"
          :page-sizes="[20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import CustomCollapse from "@/components/CustomCollapse.vue";
import PolicySearchResult from "@/components/Poclicy/PolicySearchResult.vue";
import China_city from "@/assets/json/China_city_info.json";
import { computed, onMounted, reactive, ref, watch } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { useStore } from "vuex";
import searchApi from "@/api/searchApi";
import dataManageApi from "@/api/dataManageApi";

import { useRouter } from "vue-router";
import { pa } from "element-plus/es/locale";

const store = useStore();
const router = useRouter();

const options = [
  {
    selectorName: "发布级别",
    options: [
      {
        value: "国家级",
        label: "国家级",
      },
      {
        value: "省级",
        label: "省级",
      },
      {
        value: "区县级",
        label: "区县级",
      },
      {
        value: "市级",
        label: "市级",
      },
    ],
  },
  {
    selectorName: "政策类型",
    options: [
      { value: "通知", label: "通知" },
      { value: "公告", label: "公告" },
      { value: "意见", label: "意见" },
      { value: "决定", label: "决定" },
      { value: "办法", label: "办法" },
      { value: "规定", label: "规定" },
      { value: "其他", label: "其他" },
      { value: "批复", label: "批复" },
      { value: "目录", label: "目录" },
      { value: "措施", label: "措施" },
      { value: "名单", label: "名单" },
      { value: "通告", label: "通告" },
      { value: "公示", label: "公示" },
      { value: "函", label: "函" },
      { value: "条例", label: "条例" },
      { value: "通报", label: "通报" },
      { value: "纪要", label: "纪要" },
      { value: "规则", label: "规则" },
      { value: "说明", label: "说明" },
      { value: "规划", label: "规划" },
      { value: "概要", label: "概要" },
      { value: "方案", label: "方案" },
      { value: "公报", label: "公报" },
      { value: "决议", label: "决议" },
      { value: "请示", label: "请示" },
      { value: "白皮书", label: "白皮书" },
      { value: "议案", label: "议案" },
    ],
  },
];

const isAccurate = ref(false);
const isLogin = computed(() => {
  return store.state.user.isLogin;
});
// 检索词id，用于查看政策时保存浏览记录
let sid = ref("");

const dateFormatter = (datetime) => {
  var date = new Date(datetime);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // 前补零，因为getMonth()返回的月份是从0开始的
  var day = ("0" + date.getDate()).slice(-2); // 同样前补零
  return `${year}-${month}-${day}`;
};
// 搜索
const searchPolicy = (params) => {
  store.dispatch("search/searchPolicy", {
    ...params,
  });
};

const accurateSearchPolicy = (params) => {
  store.dispatch("search/accurateSearchPolicy", {
    ...params,
  });
};
// 保存搜索词
const saveSearchWord = async () => {
  let result = await searchApi.saveSearchWord(
    parseInt(store.state.user.profile.id),
    viewData.searchKeywords
  );
  sid.value = result.data.sid;
  console.log(sid.value);
};
// 保存搜索词并开始搜索
const searchPolicyWithRecord = () => {
  if (viewData.searchKeywords === "") return;
  if (store.state.user.profile.id) {
    saveSearchWord();
  }
  // 创建一个新的对象来存储键值对
  const params = { q: viewData.searchKeywords };
  // 发布时间筛选
  if (viewData.pub_time) {
    params["start_date"] = dateFormatter(viewData.pub_time[0]);
    params["end_date"] = dateFormatter(viewData.pub_time[1]);
  }
  // 分页
  params["page"] = paginationList.page;
  params["page_size"] = paginationList.size;

  // 其他筛选
  viewData.selectedTags.forEach((item) => {
    // 将当前item的type设为新对象的键，tagName设为对应的值
    params[item.type] = item.tagName;
  });

  // 查看是否启用精确匹配
  if (isAccurate.value === true) {
    accurateSearchPolicy(params);
  } else {
    searchPolicy(params);
  }
};

const shortcuts = [
  {
    text: "最近1周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "最近1个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "最近3个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
  {
    text: "最近半年",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 182);
      return [start, end];
    },
  },
  {
    text: "最近1年",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
      return [start, end];
    },
  },
  {
    text: "最近5年",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5);
      return [start, end];
    },
  },
  {
    text: "最近10年",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 10);
      return [start, end];
    },
  },
];
let total = computed(() => {
  return store.state.search.searchPolicyList.total;
});
let paginationList = reactive({
  page: 1,
  size: 20,
});
let policyList = computed(() => {
  return store.state.search.searchPolicyList.data;
});

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  paginationList.size = val;
  searchPolicyWithRecord();
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  paginationList.page = val;
  searchPolicyWithRecord();
};
console.log(China_city.provinces[1]);

// 省市和搜索词
const viewData = reactive({
  searchKeywords: "", // 搜索词
  selectedTags: [], // 城市,取[0].tagName
  selectedProvinces: "", // 省份
  showCityFilter: true,
  selectableTags: China_city.provinces, // 市tag记录
  filters: {},
  policy_grade: "",
  policy_type: "",
  pub_time: "",
  guessKewword: "",
});

const handleClose = (tag) => {
  viewData.selectedTags.splice(viewData.selectedTags.indexOf(tag), 1);
  if (tag.type === "provinces") {
    resetProvinceFilter();
  } else if (tag.type === "city") {
    resetProvinceFilter();
  } else if (tag.type === "policy_grade") {
    resetGradeFilter();
  } else if (tag.type === "policy_type") {
    resetTypeFilter();
  } else if (tag.type === "pub_time") {
    resetTimeFilter();
  }
};

const isTagChecked = (tag) => viewData.selectedTags.includes(tag);

const onCheckTag = (item) => {
  // 筛选省份
  if (item.provinceName && !isTagChecked(item.provinceName)) {
    viewData.selectedTags.push({
      tagName: item.provinceName,
      type: "provinces",
    });
    viewData.selectedProvince = item.provinceName;
    if (item.citys[0].cityName !== item.provinceName) {
      viewData.selectableTags = item.citys;
    } else viewData.showCityFilter = false;
  } else if (item.cityName && !isTagChecked(item.cityName)) {
    // 筛选城市
    for (let i = 0; i < viewData.selectedTags.length; i++) {
      if (viewData.selectedTags[i].tagName === viewData.selectedProvince) {
        viewData.selectedTags[i].tagName = item.cityName;
        viewData.selectedTags[i].type = "city";
      }
    }
    // viewData.selectedTags.push({
    //   tagName: item.cityName,
    //   type: "city",
    // });
    viewData.showCityFilter = false;
  }
};

const resetFilter = () => {
  viewData.selectedTags = [];
  viewData.selectedProvinces = "";
  viewData.showCityFilter = true;
  viewData.selectableTags = China_city.provinces;

  viewData.policy_grade = "";
  viewData.policy_type = "";
  viewData.pub_time = "";
};

const resetProvinceFilter = () => {
  viewData.selectedProvinces = "";
  viewData.showCityFilter = true;
  viewData.selectableTags = China_city.provinces;
};

const resetGradeFilter = () => {
  viewData.policy_grade = "";
  viewData.selectedTags = viewData.selectedTags.filter(
    (each) => each.type !== "policy_grade"
  );
};
const resetTypeFilter = () => {
  viewData.policy_type = "";
  viewData.selectedTags = viewData.selectedTags.filter(
    (each) => each.type !== "policy_type"
  );
};
const resetTimeFilter = () => {
  viewData.pub_time = "";
  viewData.selectedTags = viewData.selectedTags.filter(
    (each) => each.type !== "pub_time"
  );
};

const showPolicy = async (policy) => {
  console.log(policy);
  store.dispatch("dataManage/getPolicyDataById", {
    policyId: policy.policy_id,
    uid: store.state.user.profile.id || "-1",
  });
  store.dispatch("indexNav/setBackIndex", store.state.indexNav.activeIndex);
  store.dispatch("indexNav/setIndexNav", "0");
  let result = await searchApi.saveSearchRecord(
    viewData.searchKeywords,
    policy.policy_id,
    store.state.user.profile.id || "-1",
    sid.value
  );
  router.push({
    name: "policyView",
    query: { id: policy.policy_id },
  });
};

// 处理下拉
// 获取检索记录
let searchRecord = computed(() => {
  return store.state.user.searchRecord;
});
// let searchData = ref("");
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
    queryGuessKeyword(queryString);
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

// 改变某一个筛选项
const handleFormItemChange = (fieldName: string, value: string) => {
  //
  if (value) {
    let i = viewData.selectedTags.findIndex((each) => fieldName === each.type);
    if (i >= 0) {
      viewData.selectedTags[i].tagName = value;
    } else {
      viewData.selectedTags.push({
        tagName: value,
        type: fieldName,
      });
    }
  }
};

// 清除某一个筛选项
const handleFormItemClear = (fieldName: string, value: string) => {
  switch (fieldName) {
    case "policy_type":
      resetTypeFilter();
      break;
    case "policy_grade":
      resetGradeFilter();
      break;
    case "pub_time":
      break;
    default:
      break;
  }
};

const queryGuessKeyword = async (searchword) => {
  const result = await dataManageApi.queryGuessKeyword(searchword);
  console.log("queryGuessKeyword", result);
  if (result.data.code === 200) {
    if (result.data.errors) viewData.guessKewword = result.data.target;
    else viewData.guessKewword = "";
  }
};

const handelGuessKeyword = () => {
  viewData.searchKeywords = viewData.guessKewword;
  searchPolicyWithRecord();
};

// watch(
//   viewData,
//   (value1, value2) => {
//     if (value1.searchKeywords != value2.searchKeywords) {
//       console.log("viewData changed", viewData);
//       queryGuessKeyword(viewData.guessKewword);
//     }
//   },
//   {
//     immediate: true,
//   }
// );

onMounted(() => {
  // getPolicies();
  // 搜索栏下拉
  store.dispatch("user/getSearchRecord", store.state.user.profile.id);

  if (store.state.search.searchData != "") {
    viewData.searchKeywords = store.state.search.searchData;
    // 默认搜索
    searchPolicyWithRecord();
  }
});
</script>

<style lang="scss" scoped>
.bg-container {
  background: #0089d1;
  width: 100%;
  font-family: 庞门正道标题体 !important;
  color: white;
  font-size: 200%;
  user-select: none;
}
.bg-color {
  min-height: 75vh;
  @apply bg-gray-50;
}
.search-input {
  :deep(.el-input__wrapper) {
    border-radius: 4px 0 0 4px;
  }

  :deep(.el-button--large) {
    border-radius: 0 4px 4px 0;
  }
}
.el-style-card {
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  @apply my-1 py-2 w-4/5;
}

.info-item-grid {
  grid-template-columns: 4fr repeat(3, 3fr);
}
.box-selected-tags {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
.box-filter {
  :deep(.el-form-item) {
    margin-bottom: 5px;
  }
}
.line {
  width: 100%;
  height: 0;
  border-top: 1px solid var(--el-border-color);
  margin-top: 10px;
  /* margin-bottom: 10px; */
}
.title {
  border-bottom: 1px solid var(--el-border-color);
  margin-bottom: 10px;
}
.policyItem {
  /* border: 1px solid #dcdfe6; */
  padding: 5px;
}
.policyTitle {
  color: #1f2937;
  text-align: left;
  cursor: pointer;
}
.policy-other-info {
  width: 100%;
}
.policy-card-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .policy-card-content {
    flex: 1;
  }
  .policy-card-link {
    width: fit-content;
  }
}
.policyTitle:hover {
  color: #409eff;
}
.listDataColor {
  color: #85878e;
  width: 35vh;
}
.agency {
  width: calc(35vh - 100px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.predicate-tags {
  overflow: hidden;
}
</style>
