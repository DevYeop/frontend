import api from '@/api';

const BASE_URL = '/api/money';

export default {
  async insert_expense_history(params) {
    console.log('params', params);
    await api.post(BASE_URL, params);
    // 언제 왜 param이고 언제 왜 {params}냐
  },

  async get_total_categories() {
    const { data } = await api.get(`${BASE_URL}/categories`);
    // console.log(data);

    return data;
  },

  async get_valid_categories(params) {
    const { data } = await api.get(`${BASE_URL}/expenseByMonth`, { params });
    // 언제 왜 param이고 언제 왜 {params}냐
    // console.log(data);
    return data;
  },

  async get_recent_expense() {
    const { data } = await api.get(`${BASE_URL}/recentExpense`);
    // 언제 왜 param이고 언제 왜 {params}냐
    // console.log(data);
    return data;
  },
};
