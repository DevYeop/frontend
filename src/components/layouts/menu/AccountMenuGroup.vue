<script setup>
import { computed } from 'vue';
import MenuItem from './MenuItem.vue';
import AccountMenuItem from './AccountMenuItem.vue';
import LogoutMenuItem from './LogoutMenuItem.vue';
import config from '@/config';

const { login, join } = config.accountMenus;
import { useAuthStore } from '@/stores/auth.js';

const auth = useAuthStore();

const islogin = computed(() => auth.isLogin);
const username = computed(() => auth.username);

// const islogin = computed(() => false); // 임시: 로그인하지 않음
// const username = computed(() => ''); // 임시: 사용자명 없음
</script>

<template>
  <ul class="navbar-nav ms-auto" style="display: flex; flex-direction: row">
    <template v-if="islogin">
      {{ auth.state.test }}
      <AccountMenuItem :username="username" class="menu-item" />
      <LogoutMenuItem class="menu-item" />
    </template>
    <template v-else>
      <MenuItem :menu="login" class="menu-item" />
      <MenuItem :menu="join" class="menu-item" />
    </template>
  </ul>
</template>

<style scoped>
.menu-item {
  padding: 22px;
}
</style>
