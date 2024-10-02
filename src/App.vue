<script setup>
import { RouterView } from 'vue-router';
import DefaultLayout from './components/layouts/DefaultLayout.vue';
import ApplicationLayout from './components/layouts/ApplicationLayout.vue';
</script>
<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
`
<style scoped></style>
