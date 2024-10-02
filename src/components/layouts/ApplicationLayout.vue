<template>
  <v-layout class="rounded rounded-md" id="v-layout">
    <!-- App Bar -->
    <v-app-bar color="primary" dark app>
      <v-toolbar-title>Application Bar</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-list-item>
        <router-link :to="{ name: 'expense' }" class="app-link"
          >소비입력</router-link
        >
      </v-list-item>

      <v-list-item>
        <router-link :to="{ name: 'expenseHistroy' }" class="app-link"
          >소비내역</router-link
        >
      </v-list-item>

      <v-list-item t class="menu-item">Menu4</v-list-item>
    </v-app-bar>

    <!-- Main Content -->
    <v-main id="v-main" class="content-container">
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<style scoped>
#v-layout {
  margin-left: 0;
  padding-top: 64px; /* 앱 바 높이 만큼의 상단 여백 */
}

#v-main {
  width: 100vw;
  padding: 20px; /* 콘텐츠의 좌우 여백 */
  background-color: #f5f5f5; /* 밝은 배경색 적용 */
  min-height: calc(100vh - 64px); /* 앱 바 높이를 제외한 전체 높이 */
}

.app-link {
  color: white;
  font-weight: 600;
  margin: 0 10px;
  text-decoration: none;
}

.app-link:hover {
  text-decoration: underline;
}

.menu-item {
  color: white;
  font-size: 16px;
  margin-left: 20px;
}

.content-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
