import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import FoodPage from '../pages/FoodPage.vue';

import OutCome from '../pages/OutCome.vue';
import ExpenseHistroy from '@/pages/ExpenseHistroy.vue';

import authRotes from './auth';
import boardRotes from './board';
import travelRoutes from './travel';
import galleryRoutes from './gallery';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OutCome,
    },
    { path: '/food/list', name: 'food', component: FoodPage },

    { path: '/outcome', name: 'expense', component: OutCome },

    {
      path: '/expenseHistroy',
      name: 'expenseHistroy',
      component: ExpenseHistroy,
    },

    // {
    //   path: '/auth/login',
    //   name: 'login',falseth/LoginPage.vue'),
    // },
    // {
    //   path: '/auth/join',
    //   name: 'join',
    //   component: () => import('../pages/auth/JoinPage.vue'),
    // },
    // {
    //   path: '/auth/profile',
    //   name: 'profile',
    //   component: () => import('../pages/auth/ProfilePage.vue'),
    // },
    // {
    //   path: '/auth/changepassword',
    //   name: 'changepassword',
    //   component: () => import('../pages/auth/ChangePasswordPage.vue'),
    // }, //이 코드들을 ...authRotes 로 대체한 것이다
    ...authRotes, // spread 연산자
    ...boardRotes,
    ...travelRoutes,
    ...galleryRoutes,
  ],
});

// 글로벌 가드 설정
// router.beforeEach((to, from, next) => {
//   // 여기서 모든 경로에 대한 전처리 작업을 수행
//   console.log('Navigating to:', to.path);

//   // 예: 로그인 확인 또는 권한 체크
//   if (to.path !== '/login' && !isUserLoggedIn()) {
//     next('/login'); // 로그인 페이지로 리디렉션
//     console.log('로긴안됌!');
//   } else {
//     next(); // 계속 진행
//     console.log('로긴됌!');
//   }
// });

export default router;
