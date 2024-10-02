<script setup>
import Header from './Header.vue';
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';
</script>
<template>
  <div class="container">
    <Header />
    <NavBar />
    <div class="content my-5 px-3"><RouterView /></div>
    <Footer />
  </div>
</template>

<!-- <template>
  <v-layout class="rounded rounded-md"
    >``
    <v-app-bar color="surface-variant" title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Drawer left"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center main-container"
      style="min-height: 300px"
    >
      <slot> </slot>
    </v-main>
  </v-layout>
</template> -->

<style scoped>
.main-container {
  background-color: aqua;
  width: 100vw;
}
</style>
```
