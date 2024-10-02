<template>
  <div id="date-controller">
    <v-btn prepend-icon="$prev" @click="previous"> 이전 </v-btn>
    <h1 style="margin: 22px">
      {{ currentDate.year }}. {{ currentDate.month }}
    </h1>
    <v-btn append-icon="$next" @click="next"> 다음 </v-btn>
  </div>

  <vue-excel-editor v-model="testdata" filter-row>
    <!-- <template v-for="item in jsondata">
      <vue-excel-column
        :field="item.name"
        :label="item.user"
        type="string"
        width="80px"
      />
    </template> -->

    <vue-excel-column field="name" label="Name" type="string" width="150px" />
    <vue-excel-column
      label="카테고리1(phone)"
      field="phone"
      type="string"
      width="130px"
    />
    <vue-excel-column
      label="카테고리2"
      field="gender"
      type="select"
      width="150px"
      :options="['F', 'M', 'U']"
    />
    <vue-excel-column field="age" label="Age" type="number" width="70px" />
    <vue-excel-column
      field="birth"
      label="Date Of Birth"
      type="date"
      width="80px"
    />
  </vue-excel-editor>
</template>

<script setup>
const testdata = [
  {
    user: 'hc',
    name: 'Harry Cole',
    phone: '1-415-2345678',
    gender: 'M1',
    age: 25,
    birth: '1997-07-01',
  },
  {
    user: 'sm',
    name: 'Simon Minolta',
    phone: '1-123-7675682',
    gender: 'M',
    age: 20,
    birth: '1999-11-12',
  },
  {
    user: 'ra',
    name: 'Raymond Atom',
    phone: '1-456-9981212',
    gender: 'M',
    age: 19,
    birth: '2000-06-11',
  },
  {
    user: 'ag',
    name: 'Mary George',
    phone: '1-556-1245684',
    gender: 'F',
    age: 22,
    birth: '2002-08-01',
  },
  {
    user: 'kl',
    name: 'Kenny Linus',
    phone: '1-891-2345685',
    gender: 'M',
    age: 29,
    birth: '1990-09-01',
  },
];

const jsondata = [
  {
    user: 'hc',
    name: 'Harry Cole',
    phone: '1-415-2345678',
    gender: 'M',
    age: 25,
    birth: '1997-07-01',
  },
  {
    user: 'sm',
    name: 'Simon Minolta',
    phone: '1-123-7675682',
    gender: 'M',
    age: 20,
    birth: '1999-11-12',
  },
  {
    user: 'ra',
    name: 'Raymond Atom',
    phone: '1-456-9981212',
    gender: 'M',
    age: 19,
    birth: '2000-06-11',
  },
  {
    user: 'ag',
    name: 'Mary George',
    phone: '1-556-1245684',
    gender: 'F',
    age: 22,
    birth: '2002-08-01',
  },
  {
    user: 'kl',
    name: 'Kenny Linus',
    phone: '1-891-2345685',
    gender: 'M',
    age: 29,
    birth: '1990-09-01',
  },
];

import api from '@/api/moneyApi';
import { computed, reactive, ref } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import moment from 'moment';

const selectedDate = ref(new Date());

const currentDate = reactive({
  year: parseInt(moment(selectedDate.value).format('YYYY')),
  month: parseInt(moment(selectedDate.value).format('M')),
});

const previous = () => {
  if (currentDate.month == 1) {
    // 월이 1이면, 연도를 낮추고 월을 12로 셋팅
    currentDate.year -= 1;
    currentDate.month = 12;
  } else {
    currentDate.month -= 1;
  }
};

const next = () => {
  if (currentDate.month == 12) {
    // 월이 1이면, 연도를 낮추고 월을 12로 셋팅
    currentDate.year += 1;
    currentDate.month = 1;
  } else {
    currentDate.month += 1;
  }
};

const loadValidCategories = async () => {
  const response = await api.get_valid_categories(currentDate);
  const valid_categories = response.map((item) => item.categoryName);
  const amount_by_category = response.map((item) => item.totalAmount);
  if (valid_categories.length !== 0) {
    // pieChartLabels.value = valid_categories;
    // dataAmount.value = amount_by_category;

    console.log(valid_categories);
    console.log(amount_by_category);
  } else {
    // pieChartLabels.value = ['없음'];
    // dataAmount.value = [100];
  }
};

loadValidCategories();
</script>

<style scoped>
#date-controller {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
