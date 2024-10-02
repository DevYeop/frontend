<script setup>
import api from '@/api/moneyApi';
import { computed, reactive, ref } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import moment from 'moment';

ChartJS.register(ArcElement, Tooltip, Legend);

const selectedDate = ref(new Date());

const currentDate = reactive({
  year: parseInt(moment(selectedDate.value).format('YYYY')),
  month: parseInt(moment(selectedDate.value).format('M')),
});

const pieChartLabels = ref([]);
const dataAmount = ref([]);

const categoryIds = ref([]);
const categoryNames = ref([]);

const recentExpense = ref([]);

const dataRef = computed(() => ({
  labels: pieChartLabels.value,
  datasets: [
    {
      backgroundColor: [
        '#FFADAD', // 부드러운 핑크
        '#FFD6A5', // 밝은 오렌지
        '#FDFFB6', // 연한 노랑
        '#CAFFBF', // 밝은 녹색
        '#9BF6FF', // 파스텔 블루
        '#A0C4FF', // 부드러운 하늘색
        '#BDB2FF', // 연보라색
        '#FFC6FF', // 라벤더 핑크
        '#FFB4B4', // 밝은 레드
        '#FDE4CF', // 크림색
        '#BDE0FE', // 소프트 블루
        '#A2D2FF', // 파스텔 하늘색
        '#C7CEEA', // 연한 퍼플
        '#FFCBC1', // 핑크 오렌지
        '#FFE5D9', // 베이지 핑크
        '#D8E2DC', // 페일 그레이
        '#ECE4DB', // 크림 화이트
      ],
      data: dataAmount.value,
      borderWidth: 2, // 테두리 추가
    },
  ],
}));

const expenseInput = reactive({
  userId: 1,
  amount: 29800,
  categoryId: -1,
  description: '한우',
  date: '2024-09-05',
  year: -1,
  month: -1,
  paymentMethod: '카드',
});

const insertExpense = async () => {
  const tmpArray = categoryNames.value;
  const index = tmpArray.indexOf(expenseInput.category);
  const categoryId = categoryIds.value[index];

  expenseInput.categoryId = categoryId;

  const formattedDate = moment(selectedDate.value).format('YYYY-MM-DD');
  expenseInput.date = formattedDate;

  try {
    await api.insert_expense_history(expenseInput);
    initExpenseInput();
    loadValidCategories();
    loadRecentExpense();
  } catch (error) {
    console.error(error);
  }
};

const initExpenseInput = () => {
  expenseInput.description = '';
  expenseInput.amount = '';
};

const loadRecentExpense = async () => {
  const data = await api.get_recent_expense();
  recentExpense.value = data;
};

const load_categories = async () => {
  const data = await api.get_total_categories();
  const ids = data.map((item) => item.id);
  const names = data.map((item) => item.name);
  categoryIds.value = [...ids];
  categoryNames.value = [...names];
};

const loadValidCategories = async () => {
  const response = await api.get_valid_categories(currentDate);
  const valid_categories = response.map((item) => item.categoryName);
  const amount_by_category = response.map((item) => item.totalAmount);
  if (valid_categories.length !== 0) {
    pieChartLabels.value = valid_categories;
    dataAmount.value = amount_by_category;
  } else {
    pieChartLabels.value = ['없음'];
    dataAmount.value = [100];
  }
};

const previous = () => {
  if (currentDate.month == 1) {
    currentDate.year -= 1;
    currentDate.month = 12;
  } else {
    currentDate.month -= 1;
  }
  loadValidCategories();
};

const next = () => {
  if (currentDate.month == 12) {
    currentDate.year += 1;
    currentDate.month = 1;
  } else {
    currentDate.month += 1;
  }
  loadValidCategories();
};

load_categories();
loadValidCategories();
loadRecentExpense();
</script>

<template>
  <div id="wrapper">
    <div id="date-controller">
      <v-btn prepend-icon="$prev" @click="previous" class="btn">이전</v-btn>
      <h1 style="margin: 22px">
        {{ currentDate.year }}. {{ currentDate.month }}
      </h1>
      <v-btn append-icon="$next" @click="next" class="btn">다음</v-btn>
    </div>

    <div id="input-container">
      <div style="display: flex; gap: 20px">
        <v-date-picker v-model="selectedDate" />

        <form @submit.prevent="insertExpense" class="form">
          <v-combobox
            label="카테고리"
            :items="categoryNames"
            v-model="expenseInput.category"
            class="input-field"
            outlined
          ></v-combobox>

          <v-text-field
            clearable
            label="항목명"
            variant="outlined"
            v-model="expenseInput.description"
            class="input-field"
          ></v-text-field>

          <v-text-field
            type="number"
            label="금액"
            clearable
            variant="outlined"
            v-model="expenseInput.amount"
            class="input-field"
          ></v-text-field>

          <v-btn prepend-icon="$submit" type="submit" class="btn"> 입력 </v-btn>
        </form>
      </div>

      <div id="history-container" class="history-container">
        <v-list dense>
          <v-list-item
            v-for="item in recentExpense"
            :key="item.id"
            class="list-item"
          >
            <!-- Avatar -->
            <v-list-item-avatar>
              <img
                :src="`https://randomuser.me/api/portraits/women/${item.categoryId}.jpg`"
                alt="Avatar"
              />
            </v-list-item-avatar>

            <!-- Description and Amount in Horizontal Layout -->
            <div class="item-content">
              <span class="item-description">{{ item.description }}</span>
              <span class="item-amount">{{
                item.amount | currencyFormat
              }}</span>
            </div>
          </v-list-item>
        </v-list>
      </div>

      <div style="width: 400px; height: 400px">
        <Pie :data="dataRef" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#date-controller {
  display: flex;
  justify-content: center;
  align-items: center;
}

#input-container {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  justify-content: space-between;
  gap: 20px; /* 여백 추가 */
}

.input-field {
  font-size: 16px;
  padding: 10px;
}

.btn {
  background-color: #3498db; /* 버튼의 메인 컬러 */
  color: white;
  font-weight: bold;
  border-radius: 5px;
  font-size: 16px;
  text-transform: uppercase;
}

.btn:hover {
  background-color: #2980b9; /* 버튼 hover 시 더 짙은 파란색 */
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* 필드 사이 간격 */
  padding: 20px; /* 폼 내부 패딩 */
  background-color: #ffffff; /* 폼 배경색 */
  border-radius: 8px; /* 폼의 둥근 모서리 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  max-width: 400px; /* 폼 너비 제한 */
  margin: auto; /* 화면 중앙 배치 */
}

.history-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
}

.list-item {
  display: flex;
  align-items: center; /* 수평 정렬 */
  justify-content: space-between; /* 아바타와 내용 사이 간격 */
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.list-item:last-child {
  border-bottom: none;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-left: 15px; /* 아바타와 내용 간 간격 */
}

.item-description {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  flex-grow: 1;
}

.item-amount {
  font-size: 16px;
  color: #666;
  margin-left: 20px; /* 금액과 설명 사이 간격 */
  white-space: nowrap; /* 금액이 줄바꿈되지 않도록 설정 */
}

v-list-item-avatar img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>
