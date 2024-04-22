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
  <div class="bg-content">
    <div class="p-4 flex flex-col items-center">
      <div class="search-input flex w-2/5">
        <el-input
          placeholder="请输入你想查的政策"
          size="large"
          :suffix-icon="Search"
        >
        </el-input>
        <el-button type="primary" size="large" class=".custom-input-button"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="p-4 flex flex-col items-center">
      <div class="el-style-card box-selected-tags flex justify-between">
        <el-form :model="addForm" label-width="150px">
          <el-form-item label="政策排序方式" class="flex mt-4">
            <el-radio-group v-model="addForm.sort">
              <el-radio label="最新发布"></el-radio>
              <el-radio label="最热点击"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="更多筛选方式">
            <el-cascader
              v-model="addForm.location"
              :options="citydatas"
              placeholder="发布地区"
              clearable
              class="mb-2"
            />&nbsp;
            <el-select
              placeholder="发布级别"
              v-model="addForm.level"
              class="mb-2"
              clearable
            >
              <el-option value="国家级" label="国家级"></el-option>
              <el-option value="省级" label="省级"></el-option> </el-select
            >&nbsp;
            <el-select
              placeholder="政策类型"
              v-model="addForm.type"
              class="mb-2"
              clearable
            >
              <el-option value="公告">公告</el-option>
              <el-option value="通知">通知</el-option>
              <el-option value="决定">决定</el-option>
              <el-option value="意见">意见</el-option>
              <el-option value="办法">办法</el-option></el-select
            >&nbsp;
            <!-- <el-select placeholder="发布机构" class="mb-2" clearable></el-select
            >&nbsp; -->
            <el-config-provider :locale="zhCn">
              <el-date-picker
                type="daterange"
                :shortcuts="shortcuts"
                start-placeholder="起始日期"
                end-placeholder="结束日期"
                v-model="addForm.date"
                class="mb-2"
                style="margin-right: 599px"
              />
            </el-config-provider>
          </el-form-item>
        </el-form>
      </div>
      <div class="el-style-card flex">
        <div class="w-12"></div>
        <el-button class="ml-1" link type="primary" @click="handleAdd"
          >单条添加</el-button
        >
        <div class="w-10"></div>
        <el-button link type="primary" @click="batchAddVisible = true"
          >批量添加</el-button
        >
        <div class="w-10"></div>
        <div class="flex">
          <el-button
            link
            type="primary"
            v-if="!bulkDelete"
            @click="handleBulkDelete"
            >批量删除</el-button
          >
          <div class="flex" v-else>
            <el-button link type="primary" @click="bulkDelete = false"
              >取消批量删除</el-button
            >
          </div>
        </div>

        <div class="ml-auto mr-14">
          <el-button
            class="flex"
            type="primary"
            link
            @click="recycleVisible = true"
          >
            <el-icon><Delete /></el-icon>
            <div>回收站</div>
          </el-button>
        </div>
      </div>
      <div class="el-style-card w-11/12">
        <div
          v-for="(data, index) in policyList"
          class="ml-10 mr-10 policyItem"
          :key="index"
        >
          <div class="w-full flex">
            <div>
              <div
                class="text-lg ml-2 mb-1 policyTitle"
                @click="showPolicy(data)"
              >
                {{ data.policy_title }}
              </div>
              <div class="flex">
                <div class="listDataColor flex">
                  <div class="text-blue-400 mr-2 w-20 ml-2 mb-2">
                    发布机构：
                  </div>
                  <div class="agency">{{ data.PUB_AGENCY_FULLNAME }}</div>
                </div>

                <div class="listDataColor flex justify-center">
                  <div class="text-blue-400 ml-14 text-center">发布级别：</div>
                  {{ data.policy_grade }}
                </div>
                <div class="flex ml-8 mr-2"></div>
                <div class="listDataColor flex" v-if="data.PROVINCE !== ''">
                  <div class="text-blue-400 flex ml-16">
                    <div>
                      <el-icon style="vertical-align: -10%"
                        ><Location
                      /></el-icon>
                    </div>
                    发布地区：
                  </div>
                  {{ data.PROVINCE }}{{ data.CITY }}
                </div>
                <div class="listDataColor flex justify-center" v-else>
                  <div class="text-blue-400 ml-8">
                    <el-icon style="vertical-align: -10%"><Location /></el-icon
                    >发布地区：
                  </div>
                  无
                </div>
              </div>
              <div class="flex">
                <svg
                  t="1677240672081"
                  class="icon ml-2 mb-1"
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
                    fill="#A6A6A6"
                  ></path>
                </svg>
                <div class="listDataColor">
                  {{ data.policy_type }}
                </div>
                <div style="color: #85878e">丨</div>
                <div class="text-center listDataColor">
                  {{ data.PUB_TIME }}
                </div>
                <div style="color: #85878e">丨</div>
                <div class="w-1/3 text-center listDataColor">
                  {{ data.policy_id }}
                </div>
              </div>
            </div>
            <div class="ml-auto">
              <el-button
                class="mb-1 mt-1"
                type="primary"
                @click="handleUpdate(index)"
              >
                更改
              </el-button>
              <div class="h-2" />
              <el-button
                type="danger"
                @click="
                  recycleDeleteVisible = true;
                  pid = data.policy_id;
                "
              >
                删除
              </el-button>
            </div>
            &nbsp;&nbsp;&nbsp;
          </div>
          <div class="line" />
        </div>
        <div class="flex justify-center">
          <el-pagination
            v-model:current-page="paginationList.page"
            v-model:page-size="paginationList.pageSize"
            :page-sizes="[10, 20, 40, 80, 100, 200]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-loading="true"
            v-if="total == 0"
          />
          <el-pagination
            v-model:current-page="paginationList.page"
            v-model:page-size="paginationList.pageSize"
            :page-sizes="[10, 20, 40, 80, 100, 200]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-else
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 回收站 -->
  <el-dialog
    center
    :model-value="recycleVisible"
    title="回收站"
    @close="recycleVisible = false"
    width="70%"
    style="
      display: flex;
      flex-direction: column;
      margin: 0 !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-height: calc(100% - 200px);
      max-width: calc(100% - 30px);
    "
  >
    <template #default>
      <el-dialog
        :model-value="recycleClearVisible"
        title="清空回收站"
        @close="recycleClearVisible = false"
        append-to-body
        center
        width="30%"
        style="
          display: flex;
          flex-direction: column;
          margin: 0 !important;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-height: calc(100% - 200px);
          max-width: calc(100% - 30px);
        "
      >
        <div class="text-lg mb-2">确定清空回收站？</div>
        <div class="flex">
          <el-button @click="recycleClearVisible = false" class="ml-auto"
            >取消</el-button
          >
          <el-button type="danger" @click="handleClearRecycle">确认</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :model-value="recycleRecoverVisible"
        title="数据恢复"
        @close="recycleRecoverVisible = false"
        append-to-body
        center
        width="30%"
        style="
          display: flex;
          flex-direction: column;
          margin: 0 !important;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-height: calc(100% - 200px);
          max-width: calc(100% - 30px);
        "
      >
        <div class="text-lg mb-2">确定恢复该条政策？</div>
        <div class="flex">
          <el-button @click="recycleRecoverVisible = false" class="ml-auto"
            >取消</el-button
          >
          <el-button type="primary" @click="handleRecoverPolicy"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </template>
    <template #footer>
      <div class="flex title">
        <div class="text-red-400">*</div>
        &nbsp;
        <div>只显示最近一个月的删除内容</div>
        <el-button
          link
          type="primary"
          class="ml-auto"
          @click="recycleClearVisible = true"
          >清空回收站</el-button
        >
      </div>
      <div class="recycleDailog">
        <div
          v-for="data in recycleData.policies"
          class="ml-10 mr-10 policyItem"
        >
          <div class="w-full flex">
            <div>
              <div
                class="text-lg ml-2 mb-1 policyTitle"
                @click="showPolicy(data)"
              >
                {{ data.policy_title }}
              </div>
              <div class="flex">
                <div class="listDataColor flex">
                  <div class="text-blue-400 mr-2 w-20 ml-2 mb-2">
                    发布机构：
                  </div>
                  <div class="agency">{{ data.PUB_AGENCY_FULLNAME }}</div>
                </div>

                <div class="listDataColor flex justify-center">
                  <div class="text-blue-400 ml-14 text-center">发布级别：</div>
                  {{ data.policy_grade }}
                </div>
                <div class="flex ml-8 mr-2"></div>
                <div class="listDataColor flex" v-if="data.PROVINCE !== ''">
                  <div class="text-blue-400 flex ml-16">
                    <div>
                      <el-icon style="vertical-align: -10%"
                        ><Location
                      /></el-icon>
                    </div>
                    发布地区：
                  </div>
                  {{ data.PROVINCE }}
                </div>
                <div class="listDataColor flex justify-center" v-else>
                  <div class="text-blue-400 ml-8">
                    <el-icon style="vertical-align: -10%"><Location /></el-icon
                    >发布地区：
                  </div>
                  无
                </div>
              </div>
              <div class="flex">
                <svg
                  t="1677240672081"
                  class="icon ml-2 mb-1"
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
                    fill="#A6A6A6"
                  ></path>
                </svg>
                <div class="listDataColor">
                  {{ data.policy_type }}
                </div>
                <div style="color: #85878e">丨</div>
                <div class="text-center listDataColor">
                  {{ data.PUB_TIME }}
                </div>
                <div style="color: #85878e">丨</div>
                <div class="w-1/3 text-center listDataColor">
                  {{ data.policy_id }}
                </div>
              </div>
            </div>
            <div class="ml-auto">
              <el-button
                type="primary"
                @click="
                  recycleRecoverVisible = true;
                  pid = data.policy_id;
                "
                class="mt-5"
                >恢复</el-button
              >
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div class="line" />
        </div>
      </div>
      <div>
        <div class="flex justify-center">
          <el-pagination
            v-model:current-page="recycleDataCurrent.page"
            v-model:page-size="recycleDataCurrent.pageSize"
            :page-sizes="[4]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="recycleData.total"
            @size-change="handleRecycleSizeChange"
            @current-change="handleRecycleCurrentChange"
          />
        </div>
      </div>
    </template>
  </el-dialog>
  <!-- 政策删除 -->
  <el-dialog
    :model-value="recycleDeleteVisible"
    title="是否删除该政策"
    @close="recycleDeleteVisible = false"
    width="30%"
    style="
      display: flex;
      flex-direction: column;
      margin: 0 !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-height: calc(100% - 200px);
      max-width: calc(100% - 30px);
    "
  >
    <div class="flex">
      <el-button @click="recycleDeleteVisible = false" class="ml-auto"
        >取消</el-button
      >
      <el-button type="danger" @click="handleDeletePolicy">确认</el-button>
    </div>
  </el-dialog>
  <!-- 政策添加/更改 -->
  <el-dialog
    :model-value="recycleAddOrUpdateVisible"
    :title="typeChange"
    @close="clearAddOrUpdate"
    center
    style="
      display: flex;
      flex-direction: column;
      margin: 0 !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-height: calc(100% - 100px);
      max-width: calc(100% - 30px);
    "
  >
    <el-form :model="updateForm">
      <el-form-item label="政策标题">
        <el-input
          v-model="updateForm.policy_title"
          placeholder="请输入政策标题"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="updateForm.PUB_TIME"
          clearable
          type="date"
          placeholder="请选择政策发布时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="修订时间">
        <el-date-picker
          v-model="updateForm.UPDATE_DATE"
          clearable
          type="date"
          placeholder="请选择政策修订时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="发布级别">
        <el-select
          v-model="updateForm.policy_grade"
          placeholder="请选择政策发布级别"
          clearable
        >
          <el-option value="国家级" label="国家级"></el-option>
          <el-option value="省级" label="省级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布省份" v-if="updateForm.policy_grade == '省级'">
        <el-select v-model="updateForm.PROVINCE">
          <el-option v-for="data in citydatas" :value="data.value">{{
            data.label
          }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布机构">
        <el-input
          v-model="updateForm.PUB_AGENCY_FULLNAME"
          placeholder="请输入政策发布机构"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="发文字号">
        <el-input
          v-model="updateForm.PUB_NUMBER"
          placeholder="请选择政策发文字号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="政策类型">
        <el-select
          v-model="updateForm.policy_type"
          placeholder="请选择政策类型"
          clearable
        >
          <el-option value="公告">公告</el-option>
          <el-option value="通知">通知</el-option>
          <el-option value="决定">决定</el-option>
          <el-option value="意见">意见</el-option>
          <el-option value="办法">办法</el-option> </el-select
        ><!-- &nbsp;&nbsp;<el-button link type="primary"
          >其他<el-icon><EditPen /></el-icon
        ></el-button> -->
      </el-form-item>
      <el-form-item label="发布来源">
        <el-input
          v-model="updateForm.policy_source"
          placeholder="请输入政策发布来源"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="政策内容">
        <el-input
          type="textarea"
          placeholder="请输入政策内容"
          v-model="updateForm.policy_body"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="flex">
      <el-button @click="clearAddOrUpdate()" class="ml-auto">取消</el-button>
      <el-button type="primary" @click="saveAddOrUpdate"
        ><svg
          t="1677312437071"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3375"
          width="18"
          height="18"
        >
          <path
            d="M931.882 259.882l-167.764-167.764A96 96 0 0 0 696.236 64H160C106.98 64 64 106.98 64 160v704c0 53.02 42.98 96 96 96h704c53.02 0 96-42.98 96-96V327.764a96 96 0 0 0-28.118-67.882zM512 832c-70.692 0-128-57.308-128-128 0-70.692 57.308-128 128-128s128 57.308 128 128c0 70.692-57.308 128-128 128z m192-609.04V424c0 13.254-10.746 24-24 24H216c-13.254 0-24-10.746-24-24V216c0-13.254 10.746-24 24-24h457.04c6.366 0 12.47 2.528 16.97 7.03l6.96 6.96A23.992 23.992 0 0 1 704 222.96z"
            p-id="3376"
            fill="#ffffff"
          ></path></svg
        >&nbsp;保存</el-button
      >
    </div>
  </el-dialog>
  <!-- 批量添加政策 -->
  <el-dialog
    :model-value="batchAddVisible"
    center
    title="批量添加政策"
    @close="batchAddVisible = false"
    style="
      display: flex;
      flex-direction: column;
      margin: 0 !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-height: calc(100% - 200px);
      max-width: calc(100% - 30px);
    "
  >
    <div>
      <el-upload
        class="upload-demo"
        action="#"
        drag
        multiple
        :headers="headers"
        :auto-upload="false"
        :file-list="fileList"
        :on-change="handleChange"
      >
        <el-icon size="100"><UploadFilled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div class="flex">
        <el-button @click="batchAddVisible = false" class="ml-auto"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmUpload()">上 传</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { ref, reactive, onMounted, computed } from "vue";
import citydata from "@/assets/citydata.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import dataManageApi from "@/api/dataManageApi";

const store = useStore();
const router = useRouter();

let addForm = reactive({
  sort: "",
  location: [],
  level: "",
  type: "",
  date: "",
});
let updateForm = reactive({
  policy_title: "",
  policy_id: "",
  PUB_TIME: "",
  UPDATE_DATE: "",
  policy_grade: "",
  PROVINCE: "",
  CITY: "",
  PUB_AGENCY_FULLNAME: "",
  PUB_NUMBER: "",
  policy_type: "",
  policy_source: "",
  policy_body: "",
});
let paginationList = reactive({
  page: 1,
  pageSize: 10,
});
let recycleDataCurrent = reactive({
  page: 1,
  pageSize: 4,
});
let total = computed(() => {
  return store.state.dataManage.total;
});
// 用于判断政策添加/更改
let typeChange = ref("");
// 用于判断被恢复/删除的政策的id
let pid = ref(0);
let citydatas = reactive(citydata);
let policyList = computed(() => {
  return store.state.dataManage.policyList;
});
let recycleData = computed(() => {
  return store.state.dataManage.recycleData;
});
let recycleVisible = ref(false);
let recycleClearVisible = ref(false);
let recycleRecoverVisible = ref(false);
let recycleDeleteVisible = ref(false);
let recycleAddOrUpdateVisible = ref(false);
let batchAddVisible = ref(false);
let loading = policyList == {};
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
let fileList = reactive([]);
// 判断批量删除是否开启
let bulkDelete = ref(false);
const headers = { "Content-Type": "multipart/form-data" };

const handleUpdate = (index) => {
  recycleAddOrUpdateVisible.value = true;
  updateForm = reactive(JSON.parse(JSON.stringify(policyList.value[index])));
  console.log(updateForm);

  typeChange.value = "政策更改";
};
const handleAdd = () => {
  recycleAddOrUpdateVisible.value = true;
  typeChange.value = "政策添加";
};
const handleChange = (file, fileListData) => {
  fileList = fileListData;
};
const handleCurrentChange = (newCurrent) => {
  paginationList.page = newCurrent;
  getPolicies();
};
const handleSizeChange = (newSize) => {
  paginationList.pageSize = newSize;
  getPolicies();
};
const handleRecycleSizeChange = (newCurrent) => {
  recycleDataCurrent.pageSize = newCurrent;
  getRecycleData();
};
const handleRecycleCurrentChange = (newSize) => {
  recycleDataCurrent.page = newSize;
  getRecycleData();
};
const confirmUpload = () => {
  var param = new FormData();
  fileList.forEach((val, index) => {
    param.append("files", val.raw);
  });
  const headers = {
    // token到时候再看
    Authorization: "getToken()",
  };
  // 添加的方法(接口)
  this.addFile();
};
let uid = computed(() => {
  return store.state.user.profile.id || 4;
});
const getPolicies = () => {
  store.dispatch("dataManage/getAllPolicies", uid.value);
  store.dispatch("dataManage/getTotal");
};
const getRecycleData = () => {
  store.dispatch("dataManage/getRecycleData", recycleDataCurrent);
};
// 前往政策展示页面
const showPolicy = (policy) => {
  store.dispatch("dataManage/getPolicyData", policy);
  store.dispatch("indexNav/setBackIndex", store.state.indexNav.activeIndex);
  store.dispatch("indexNav/setIndexNav", "0");
  router.push({
    name: "policyView",
  });
};
// 取消更改or添加的时候清除值
const clearAddOrUpdate = () => {
  recycleAddOrUpdateVisible.value = false;
  Object.keys(updateForm).forEach((key) => (updateForm[key] = ""));
};
// 确定添加/修改
const saveAddOrUpdate = () => {
  if (typeChange.value == "政策添加") {
    store.dispatch("dataManage/addPolicy", updateForm);
    clearAddOrUpdate();
    return ElMessage.success("添加成功");
  } else {
    store.dispatch("dataManage/updatePolicy", updateForm);
    clearAddOrUpdate();
    return ElMessage.success("修改成功");
  }
};
// 删除政策
const handleDeletePolicy = async () => {
  let result = await dataManageApi.deletePolicy(pid.value);
  console.log(result);
  if (result.code === 200) {
    getPolicies();
    getRecycleData();
    recycleDeleteVisible.value = false;
  } else if (result.code === 500) {
    recycleDeleteVisible.value = false;
    return Promise.reject(new Error(result.message));
  }
};
// 批量删除政策
const handleBulkDelete = () => {
  bulkDelete.value = true;
};
// 恢复政策
const handleRecoverPolicy = async () => {
  let result = await dataManageApi.recoverPolicy(pid.value);
  console.log(result);
  if (result.code === 200) {
    getPolicies();
    getRecycleData();
    recycleRecoverVisible.value = false;
  } else if (result.code === 500) {
    recycleRecoverVisible.value = false;
    return Promise.reject(new Error(result.message));
  }
};
// 清除回收站
const handleClearRecycle = () => {
  recycleClearVisible.value = false;
  return ElMessage.success("清除成功");
};
onMounted(() => {
  getPolicies();
  getRecycleData();
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
.bg-content {
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
.box-selected-tags {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
.line {
  width: 100%;
  height: 0;
  border-top: 1px solid var(--el-border-color);
  margin-top: 10px;
  /* margin-bottom: 10px; */
}
.policyItem {
  /* border: 1px solid #dcdfe6; */
  padding: 5px;
  margin-bottom: 10px;
}
.title {
  border-bottom: 1px solid var(--el-border-color);
  margin-bottom: 10px;
}
.listDataColor {
  color: #85878e;
  width: 35vh;
}
.policyTitle {
  color: #1f2937;
  text-align: left;
  cursor: pointer;
}
.policyTitle:hover {
  color: #409eff;
}
.agency {
  width: calc(35vh - 100px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search-input {
  :deep(.el-input__wrapper) {
    border-radius: 4px 0 0 4px;
  }

  :deep(.el-button--large) {
    border-radius: 0 4px 4px 0;
  }
}
.recycleDailog {
  overflow: auto;
  height: 220px;
}
</style>
