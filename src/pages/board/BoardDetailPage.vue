<script setup>
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/boardApi';
import { ref } from 'vue';
import moment from 'moment';
import { useAuthStore } from '@/stores/auth';
import { downloadFile } from '@/util/download';

const auth = useAuthStore();
const cr = useRoute();
const router = useRouter();
const no = cr.params.no;
const article = ref({});

const back = () => { router.push({ name: 'board/list' }); };

const update = () => { router.push({ name: 'board/update', params: { no: no } }); };

const remove = async () => {
if (!confirm('삭제할까요?')) return;
await api.delete(no);
router.push({ name: 'board/list'});
};

const load = async () => {
article.value = await api.get(no);
};
load();
<template>
<h1>{{ article.title }}</h1>
<div class="my-3 d-flex justify-content-between">
<div> <i class="fa-solid fa-user"></i>
{{ article.writer }}
</div>
<div> <i class="fa-regular fa-clock"></i>
{{ moment(article.updateDate).format('YYYY-MM-DD HH:mm') }}
</div>
</div>
<hr />
<div class="text-end"><div v-for="file in article.attaches" :key="file.no" class="attach">
<span> <i class="fa-solid fa-paperclip"></i>
{{ file.filename }}
</span>
</div>
</div>




