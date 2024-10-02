<script setup>
import api from '@/api/boardApi';
import { ref, reactive, computed, watch } from 'vue';
import moment from 'moment';
import { useRoute, useRouter } from 'vue-router';

const cr = useRoute(); // currentRoute
const router = useRouter();
const page = ref({});

const articles = computed(() => page.value.list);

const pageRequest = reactive({
  page: parseInt(cr.query.page) || 1, // NaN false
  amount: parseInt(cr.query.amount) || 10,
});

// 페이지네이션 페이지 변경
const handlePageChange = async (pageNum) => {
  // url 변경 --> query 파트만 변경되므로 컴포넌트가 다시 마운트되지 않음
  // watch를 통해 cr이 변경됨을 감지하여 페이지 로드해야 함

  //!! url 과 쿼리 등 라우트에 대한 정보만 바뀐거지, request가 날라가는게 아니다
  // 그래서 현재 라우트의 변화를 감지하는 watch를 이용해
  // 변화가 일어나면 그걸 기준으로 그때서야 request를 날리는거다.
  router.push({
    query: { page: pageNum, amount: pageRequest.amount },
  });
};
// pageRequest의 값 변경된 경우 호출
watch(cr, async (newValue) => {
  console.log('WATCH', cr.query.page);
  //?page=2&amount=10
  pageRequest.page = parseInt(cr.query.page);
  pageRequest.amount = parseInt(cr.query.amount);

  // Nan
  if (cr.query.page == undefined) {
    pageRequest.page = 1;
    pageRequest.amount = 10;
  }

  console.log('WATCH page', cr.query.page);
  console.log('WATCH pageRequest', pageRequest);
  await load(pageRequest);
});

const load = async (query) => {
  try {
    page.value = await api.getList(query); // data
    console.log('getList data : ', page.value);
  } catch {}
};

load(pageRequest);

// const avatar = `/api/member/${props.username}/avatar`;
</script>

<template>
  <div>
    <h1 class="mb-3"><i class="fa-solid fa-paste"></i> 게시글 목록</h1>

    <div class="mt-5 text-end">(총 {{ page.totalCount }}건)</div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th style="width: 60px">No</th>
          <th>제목</th>
          <th style="width: 100px">작성자</th>

          <th style="width: 120px">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.no">
          <td>{{ article.no }}</td>
          <td>
            <router-link
              :to="{
                name: 'board/detail',
                params: { no: article.no },
                query: cr.query,
              }"
            >
              {{ article.title }}
            </router-link>
          </td>
          <td>
            <img
              :src="`/api/member/${article.writer}/avatar`"
              class="avatar avatar-sm"
            />
            {{ article.writer }}
          </td>
          <td>{{ moment(article.regDate).format('YYYY-MM-DD') }}</td>
        </tr>
      </tbody>
    </table>
    <div class="my-5 d-flex">
      <div class="flex-grow-1 text-center">페이지 네이션</div>

      <vue-awesome-paginate
        :total-items="page.totalCount"
        :items-per-page="pageRequest.amount"
        :max-pages-shown="5"
        :show-ending-buttons="true"
        v-model="pageRequest.page"
        @click="handlePageChange"
      >
        <template #first-page-button
          ><i class="fa-solid fa-backward-fast"></i
        ></template>
        <template #prev-button><i class="fa-solid fa-caret-left"></i></template>
        <template #next-button
          ><i class="fa-solid fa-caret-right"></i
        ></template>
        <template #last-page-button
          ><i class="fa-solid fa-forward-fast"></i
        ></template>
      </vue-awesome-paginate>

      <div>
        <router-link
          :to="{ name: 'board/create', query: cr.query }"
          class="btn btn-primary"
        >
          <i class="fa-solid fa-pen-to-square"></i> 글 작성</router-link
        >
      </div>
    </div>
  </div>
</template>
