<template>
  <div class="flex mb-2" style="align-items: center">
    <span class="bg-blue-500 w-2 h-8"></span>&nbsp;
    <span class="h-8 text-lg">设置</span>
  </div>
  <div
    style="border: 1px solid white; border-top-color: gray"
    class="py-4 w-full"
  >
    <el-card class="card">
      <div>账号安全</div>
      <div class="flex ml-10">
        <p style="width: 100px" class="text-right">绑定手机号：</p>
        <el-input v-model="hideTelephone" disabled></el-input>
        <el-button
          link
          type="primary"
          class="ml-2"
          @click="updatePhone"
          @close="updatePhoneVisible = false"
          >修改绑定手机号</el-button
        >
      </div>
      <div class="flex ml-10">
        <p style="width: 100px" class="text-right">密码：</p>
        <el-input
          v-model="password"
          type="password"
          disabled
          v-if="hidePwd"
        ></el-input>
        <el-input v-model="password" disabled v-else></el-input>
        <el-button
          link
          type="primary"
          class="ml-2"
          @click="checkPwdVisible = true"
          >查看密码</el-button
        >
        <el-button
          link
          type="primary"
          class="ml-2"
          @click="updatePwdVisible = true"
          >修改密码</el-button
        >
      </div>
      <div>账号设置</div>
      <el-button type="primary" class="ml-10 mt-4" @click="logout"
        >退出登录</el-button
      >
    </el-card>
  </div>
  <!-- 修改绑定手机号 -->
  <div>
    <el-dialog
      center
      :model-value="updatePhoneVisible"
      @close="updatePhoneVisible = false"
      width="40%"
      title="修改绑定手机号"
    >
      <el-form :model="phoneForm" label-width="80px" style="width: 100%">
        <el-form-item label="新手机号">
          <div style="width: 2000px">
            <el-input
              v-model="phoneForm.phone"
              clearable
              placeholder="请输入新邮箱"
            />
          </div>
        </el-form-item>
        <el-form-item label="">
          <div style="width: 2000px">
            <el-input v-model="phoneForm.phoneCode" placeholder="请输入验证码">
              <template #suffix>
                <el-button link type="primary">获取验证码</el-button>
              </template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button>取消</el-button
          ><el-button type="primary" @click="onShow1">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div>
      <Vcode :show="isShow1" @success="onSuccess1" @close="onClose1" />
    </div>
  </div>
  <!-- 查看密码 -->
  <div>
    <el-dialog
      title="核验身份"
      :model-value="checkPwdVisible"
      @close="checkPwdVisible = false"
      center
      width="40%"
    >
      <div class="flex w-full">
        <el-form class="w-full">
          <el-form-item label="手机号">
            <el-input
              placeholder="请输入您的手机号"
              v-model="validateTelephone"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex">
        <div class="w-full"></div>
        <el-button @click="">取消</el-button>
        <el-button type="primary" @click="handleCheckPwd()">验证</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- 修改密码 -->
  <div>
    <el-dialog
      center
      :model-value="updatePwdVisible"
      @close="updatePwdVisible = false"
      width="40%"
      title="修改密码"
    >
      <el-form :model="pwdForm" label-width="80px" style="width: 100%">
        <el-form-item label="旧密码">
          <el-input
            v-model="pwdForm.oldPwd"
            clearable
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            v-model="pwdForm.newPwd"
            clearable
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="pwdForm.confirmPwd"
            clearable
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="isShow2 = false">取消</el-button
          ><el-button type="primary" @click="onShow2">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div>
      <Vcode :show="isShow2" @success="onSuccess2" @close="onClose2" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Vcode from "vue3-puzzle-vcode";
import { useStore } from "vuex";

// components: { Vcode },

const store = useStore();

let checkPwdVisible = ref(false);
let updatePhoneVisible = ref(false);
let updatePwdVisible = ref(false);

let hidePwd = ref(true);

let hideTelephone = computed(() => {
  return (
    store.state.user.userInfo.telephone.slice(0, 3) +
    "****" +
    store.state.user.userInfo.telephone.slice(7)
  );
});

let telephone = computed(() => {
  return store.state.user.userInfo.telephone;
});
let validateTelephone = ref("");
let password = computed(() => {
  return store.state.user.userInfo.password;
});
// 修改手机号
const updatePhone = () => {
  updatePhoneVisible.value = true;
};

let phoneForm = reactive({
  phone: "",
  phoneCode: "",
});

let pwdForm = reactive({
  oldPwd: "",
  newPwd: "",
  confirmPwd: "",
});

let isShow1 = ref(false);
const onShow1 = () => {
  isShow1.value = true;
};
const onClose1 = () => {
  isShow1.value = false;
};
const onSuccess1 = () => {
  onClose1();
};

let isShow2 = ref(false);
const onShow2 = () => {
  if (pwdForm.newPwd == pwdForm.confirmPwd) {
    isShow2.value = true;
  } else {
    return ElMessage.error("新旧密码不一致");
  }
};
const onClose2 = () => {
  isShow2.value = false;
};
const onSuccess2 = () => {
  store.dispatch("user/updatePwd", {
    id: store.state.user.profile.id,
    pwdForm: pwdForm,
  });
  isShow2.value = false;
};
const logout = () => {
  store.dispatch("user/logout");
};
const handleCheckPwd = () => {
  if (telephone.value == validateTelephone.value) {
    hidePwd.value = false;
    checkPwdVisible.value = false;
    return ElMessage.success("验证成功");
  } else {
    checkPwdVisible.value = false;
    return ElMessage.error("验证失败");
  }
};
</script>

<style scoped lang="scss">
.card {
  .el-input {
    width: 40%;
    height: 30px;
    margin-top: auto;
    margin-bottom: auto;
  }
}
:deep(.vue-puzzle-vcode) {
  z-index: 2016;
}
</style>