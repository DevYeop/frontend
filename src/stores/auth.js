import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const initState = {
  token: '', // 접근 토큰(JWT)
  user: {
    username: '', // 사용자 ID
    email: '', // Email
    roles: [], // 권한 목록
  },
  test: 'zz',
};

export const useAuthStore = defineStore('starcraft', () => {
  //
  //
  // computed 와함께 읽기전용으로 export한다
  // ... 의 의미

  /**
   * 바로 initState를 노출(export)시키면
   * 여기저기서 마음대로 원본값을 바꿀 수 있으므로,
   * 애초에 수정할수 없게끔 하기 위해,
   * computed를 사용해서 읽기전용모드로 export하는 거다라고 이해하면 된다.
   */
  const state = ref({ ...initState });

  // !! 의 의미 : 문자열로 부정검사 -> boolean 으로 형변환

  /**
   * 왜 자꾸 .value가 붙는것인가? :
   * state 변수의 정체가 ref라서 그렇다.ref문법이 그러함
   * ref에 저장된 값을 뽑아먹을 때는 .value를 붙여줘야한다.
   */
  const isLogin = computed(() => !!state.value.user.username); // 로그인 여부
  const username = computed(() => state.value.user.username); // 로그인 사용자 ID
  const email = computed(() => state.value.user.email); // 로그인 사용자 email

  const login = async (member) => {
    const response = await axios.post('/api/auth/login', member);
    state.value = { ...response.data };

    const { data } = await axios.post('/api/auth/login', member);
    state.value = { ...data };

    console.log('login axios response : ', response);

    localStorage.setItem('auth', JSON.stringify(state.value));
  };

  const logout = () => {
    localStorage.clear();
    state.value = { ...initState };
  };

  const getToken = () => state.value.token;

  const load = () => {
    const auth = localStorage.getItem('auth');
    if (auth != null) {
      state.value = JSON.parse(auth); // 역직렬화 ( jsonString을 json으로 변환)
      console.log(state.value);
    }
  };

  const changeProfile = (member) => {
    state.value.user.email = member.email;
  };

  load();

  return {
    state,
    username,
    email,
    isLogin,
    login,
    logout,
    getToken,
    changeProfile,
  };
});
