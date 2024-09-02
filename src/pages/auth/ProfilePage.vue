<script setup>
import authApi from '@/api/authApi';
import { useAuthStore } from '@/stores/auth';
import { computed, reactive, ref } from 'vue';

const auth222 = useAuthStore();
const avatar = ref(null);
// const avatarPath = `/api/member/${auth.username}/avatar`;
// const avatarPath = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lF2jbNFBy7X4D6F43tRiCxG2oRWLP9v8LQ&s`;
const avatarPath = computed(() => `/api/member/${auth222.username}/avatar`);

const member = reactive({
  username: auth222.username,
  email: auth222.email,
  password: '',
  avatar: null,
});
const error = ref('');
const disableSubmit = computed(() => !member.email || !member.password);

const onSubmit = async () => {
  if (!confirm('수정하시겠습니까?')) return;
  if (avatar.value.files.length > 0) {
    member.avatar = avatar.value.files[0];
  }
  try {
    await authApi.update(member);
    error.value = '';
    auth222.changeProfile(member);
    alert('정보를 수정하였습니다.');
  } catch (e) {
    error.value = e.response.data;
  }
};

// ref를 쓰려고 선언할 때
const ref_primitive = ref('yeop');
const ref_obj = ref({ name: 'yeop', gender: 'male' });

// reactive를 쓰려고 선언할 때
const reative_obj = reactive({ name: 'yeop', gender: 'male' });

// ref를 변경할 때 (primitive)
const changeRef1 = () => {
  ref_primitive.value = 'lee sangyeop';
};

// ref를 변경할 때 (object)
const changeRef2 = () => {
  ref_obj.value.name = '마시마로';
};

// reactive를 변경할 때
const changeRef3 = () => {
  reative_obj.name = '이상엽';
};

// reactive를 변경할 때
const changeRef4 = () => {
  auth222.state.user.username = 'sangyeop0715';
};
</script>

<template>
  <div class="mt-5 mx-auto" style="width: 500px">
    <hr />
    <hr />
    <br /><br /><br /><br /><br /><br />

    ref를 화면에 뿌릴 때 (primitive)
    {{ ref_primitive }}
    <button @click="changeRef1">변경</button>
    <br />

    ref를 화면에 뿌릴 때 (object)
    {{ ref_obj.name }}
    <button @click="changeRef2">변경</button>
    <br />

    reactive를 화면에 뿌릴 때 (object)
    {{ reative_obj.name }}
    <button @click="changeRef3">변경</button>
    <br />

    pinia(store)에 있는 상태변수를 뿌릴 때
    {{ auth222.state.user.username }}
    <button @click="changeRef4">변경</button>
    <br />

    {{ auth222.state.test }}

    <br /><br /><br /><br /><br /><br />
    <hr />
    <hr />
    <h1><i class="fa-solid fa-user-gear my-3"></i> 회원 정보</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3 mt-3">
        <img :src="avatarPath" class="avatar avatar-lg me-4" />
        {{ member.username }}
      </div>
      <div class="mb-3 mt-3">
        <label for="avatar" class="form-label">
          <i class="fa-solid fa-user-astronaut"></i>
          아바타 이미지:
        </label>
        <input
          type="file"
          class="form-control"
          ref="avatar"
          id="avatar"
          accept="image/png, image/jpeg"
        />
      </div>
      <div class="mb-3 mt-3">
        <label for="email" class="form-label">
          <i class="fa-solid fa-envelope"></i>
          email
        </label>
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          id="email"
          v-model="member.email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">
          <i class="fa-solid fa-lock"></i>
          비밀번호:
        </label>
        <input
          type="password"
          class="form-control"
          placeholder="비밀번호"
          id="password"
          v-model="member.password"
        />
      </div>
      <div v-if="error" class="text-danger">{{ error }}</div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary mt-4 me-3"
          :disabled="disableSubmit"
        >
          <i class="fa-solid fa-user-plus"></i>
          확인
        </button>
        <router-link class="btn btn-primary mt-4" to="/auth/changepassword">
          <i class="fa-solid fa-lock"></i>
          비밀번호 변경
        </router-link>
      </div>
    </form>
  </div>
</template>
