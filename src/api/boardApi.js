import api from '@/api';
const BASE_URL = '/api/board';
const headers = { 'Content-Type': 'multipart/form-data' };

export default {
  async getList(params) {
    /**
     * 
     * 
     * 
     * params 으로 전달되는 데이터의 정체는 아래와 같이, 이미 객체이다
     * {
  page: parseInt(cr.query.page) || 1,
  amount: parseInt(cr.query.amount) || 10,
}
그런데도 아래 axios코드에서 {}로  감싸주는 이유는 axios 사용법과 관련이 있다.

     */

    // 원래 코드
    const { data } = await api.get(BASE_URL, { params });
    // 풀어 쓴 코드
    // const { data } = await api.get(BASE_URL, { params: params });
    // 즉 단축 속성명이용해 params 라는 키값에, 데이터를 실어줘야하가ㅣ 때문이다

    console.log('BOARD GET LIST: ', data);
    return data;
  },

  async create(article) {
    const formData = new FormData();

    formData.append('title', article.title);
    formData.append('writer', article.writer);
    formData.append('content', article.content);

    if (article.files) {
      for (let i = 0; i < article.files.length; i++) {
        formData.append('files', article.files[i]);
      }
    }

    const { data } = await api.post(BASE_URL, formData, { headers });
    console.log('BOARD POST: ', data);
    return data;
  },

  async get(no) {
    const { data } = await api.get(`${BASE_URL}/${no}`);
    console.log('BOARD GET', data);
    return data;
  },

  async delete(no) {
    const { data } = await api.delete(`${BASE_URL}/${no}`);
    console.log('BOARD DELETE: ', data);
    return data;
  },

  // 게시글 수정
  async update(article) {
    const formData = new FormData();
    formData.append('no', article.no);
    formData.append('title', article.title);
    formData.append('writer', article.writer);
    formData.append('content', article.content);
    if (article.files) {
      // 첨부파일이 있는 경우
      for (let i = 0; i < article.files.length; i++) {
        formData.append('files', article.files[i]);
      }
    }
    const { data } = await api.put(`${BASE_URL}/${article.no}`, article, {
      headers,
    });
    console.log('BOARD PUT: ', data);
    return data;
  },

  // 첨부파일 삭제
  async deleteAttachment(no) {
    const { data } = await api.delete(`${BASE_URL}/deleteAttachment/${no}`);
    console.log('ATTACHMENT DELETE: ', data);
    return data;
  },
};
