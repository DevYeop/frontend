<script setup>
import MenuItem from './MenuItem.vue';
const props = defineProps({
  menus: { Type: Array, required: true },
});
</script>
<template>
  <ul class="navbar-nav">
    <!-- menus: [
    // 메인 메뉴 구성 정보
    {
      title: '게시판',
      url: '/board/list',
      icon: 'fa-solid fa-paste',
    },
    {
      title: '여행',
      url: '/travel/list',
      icon: 'fa-solid fa-plane-departure',
    },
    {
      title: '갤러리ㅋㅋ',
      url: '/gallery/list',
      icon: 'fa-regular fa-images',
    },
  ] -->
    <MenuItem v-for="menu in menus" :menu="menu" />
  </ul>
</template>
