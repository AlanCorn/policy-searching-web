<template>
  <div>
    <div class="flex mb-2" style="align-items: center">
      <span class="bg-blue-500 w-2 h-8"></span>&nbsp;
      <span class="h-8 text-lg">我的信息</span>
    </div>
    <div
      style="
        border: 1px solid white;
        border-top-color: gray;
        height: calc(90vh - 145px);
        overflow-y: auto;
      "
      class="py-4 flex"
    >
      <el-form :model="form" label-width="80px" style="flex: 4">
        <el-form-item label="昵称">
          <el-input
            v-model="form.name"
            clearable
            placeholder="请输入名称"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="手机号">
          {{ form.telephone.slice(0, 3) + "****" + form.telephone.slice(7) }}
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
            <el-radio label="null">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="请选择日期"
            clearable
          />
        </el-form-item>
        <el-form-item label="所在地">
          <el-cascader
            v-model="form.address"
            :options="citydatas"
            placeholder="请选择地区"
            clearable
          />&nbsp;
        </el-form-item>
        <el-form-item label="教育程度">
          <el-select
            v-model="form.graduation"
            placeholder="请选择教育程度"
            clearable
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
            v-model="form.education"
            placeholder="请输入毕业院校"
            clearable
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input
            v-model="form.occupation"
            placeholder="请输入职业"
            style="width: 300px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="公司">
          <el-input
            v-model="form.company"
            placeholder="请填写公司，以便于推荐相关政策"
            clearable
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="兴趣">
          <el-button @click="updateHabit">前往填写</el-button>
        </el-form-item>
        <el-form-item>
          <el-popconfirm
            icon="InfoFilled"
            icon-color="#626AEF"
            title="确定要修改信息吗？"
            @confirm="onSubmit"
          >
            <template #reference>
              <el-button type="primary">保存</el-button>
            </template>
          </el-popconfirm>

          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-left: 30%; margin-top: 5%">
        <el-avatar :size="100" class="ml-2 mb-2" :src="userAvatar"></el-avatar>
        <!-- <el-button type="primary" >点击上传头像</el-button> -->
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/file/upload"
          crossorigin="use-credentials"
          :data="{ id: userId }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button type="primary">点击上传头像</el-button>
          <template #tip>
            <div class="el-upload__tip">5MB内的jpg/png图片</div>
          </template>
        </el-upload>
      </div>
    </div>
    <el-dialog
      center
      :model-value="habitVisible"
      @close="habitVisible = false"
      width="60%"
      title="完善爱好"
    >
      <el-card>
        <div>兴趣爱好标签：</div>
        <div class="flex ml-10 pt-2 pb-2">
          <el-tag
            size="large"
            effect="plain"
            v-for="(item, index) in hobby.habitTags"
            class="mr-2"
            closable
            @close="updateHabitData(index)"
            >{{ item }}</el-tag
          >
          <div class="w-40">
            <el-input
              placeholder="按回车Enter创建标签"
              v-model="habitTag"
              @keyup.enter.native="handleAddHabit"
            ></el-input>
          </div>
        </div>
        <div>政策兴趣标签：</div>
        <div class="flex ml-10 pt-2 pb-2">
          <el-tag
            size="large"
            effect="plain"
            v-for="(item, index) in hobby.policyTags"
            class="mr-2"
            closable
            @close="updatePolicyHabitData(index)"
            >{{ item }}</el-tag
          >
          <div class="w-40">
            <el-input
              placeholder="按回车Enter创建标签"
              v-model="policyTag"
              @keyup.enter.native="handleAddPolicy"
            ></el-input>
          </div>
        </div>
      </el-card>

      <div class="flex w-full mt-5">
        <div class="w-full"></div>
        <el-button @click="cancle">取消修改</el-button>
        <el-button @click="updateHobby" type="primary">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import citydata from "@/assets/citydata.js";
import userApi from "@/api/userApi";
import { useStore } from "vuex";
import { arrayToString } from "@/utils/updateType.js";
import { ElMessage, UploadProps } from "element-plus";

const store = useStore();

let userId = computed(() => store.state.user.profile.id);
let userAvatar = computed(() => {
  return store.getters["user/getUserAvatar"];
});

let form = reactive(store.state.user.userInfo);

let habitVisible = ref(false);

let citydatas = reactive(citydata);
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
let habitTag = ref("");
let policyTag = ref("");
let hobby = reactive({
  habitTags: [],
  policyTags: [],
});

const onSubmit = () => {
  userApi.userUpdateInfo(form, store.state.user.profile.id).then((result) => {
    if (result.code === 200) {
      store.dispatch("user/getUserInfo", store.state.user.profile.id);
    } else if (result.code === 500) {
      return Promise.reject(new Error(result.message));
    }
  });
};

const updateHabit = () => {
  habitVisible.value = true;
};

const reset = () => {
  store.dispatch("user/getUserInfo", store.state.user.profile.id);
};

const handleAddHabit = () => {
  hobby.habitTags.push(habitTag.value);
  habitTag.value = "";
};

const handleAddPolicy = () => {
  hobby.policyTags.push(policyTag.value);
  policyTag.value = "";
};

// 获取兴趣爱好
const getHobby = () => {
  userApi.getUserHobby(store.state.user.profile.id).then((result) => {
    if (result.code == 200) {
      hobby.habitTags = (result.data.Hobby || "").split(",");
      hobby.policyTags = (result.data.Phobby || "").split(",");
    } else if (result.code == 500) {
      return Promise.reject(new Error(result.message));
    }
  });
};

// 取消更改兴趣爱好
const cancle = () => {
  getHobby();
  habitVisible.value = false;
};

// 更新兴趣爱好
const updateHobby = () => {
  userApi
    .updateHobby(store.state.user.profile.id, hobby.habitTags, hobby.policyTags)
    .then((result) => {
      if (result.code == 200) {
        habitVisible.value = false;
        return ElMessage.success("修改成功");
      } else if (result.code == 500) {
        return Promise.reject(new Error(result.message));
      }
    });
};

const updateHabitData = (index) => {
  hobby.habitTags.splice(index, 1);
};

const updatePolicyHabitData = (index) => {
  hobby.policyTags.splice(index, 1);
};

const imageUrl = ref("");

const handleAvatarSuccess = (response, uploadFile) => {
  ElMessage("上传成功！");
  store.dispatch("user/getUserInfo", store.state.user.profile.id);
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const handleAvatarFailed = (response) => {
  console.log(response);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("头像大小不能超过4MB!");
    return false;
  }
  return true;
};

onMounted(() => {
  store.dispatch("user/getUserInfo", store.state.user.profile.id);
  getHobby();
});
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
