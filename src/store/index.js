import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	json: [
		// {
		// 	data: { classes: {avaria: 10, sadio: 90}},
		// 	id: 1,
		// 	text: 'Amostra 1',
		// 	img: ''
		// },
	],
	id: 0,
	img : ''
  },
  mutations: {
    change(state, data) {
      state.login = data
      localStorage.setItem('mt_lgdata', JSON.stringify(data));
    }
  },
  actions: {
    GET_LOGIN({ commit }) {
      let data = {};
      try {
        data = JSON.parse(localStorage.getItem('mt_lgdata') || '{}');
      } catch (e) {
        data = '';
      }
      commit('change', data);
      return data;
    }
  },
  getters: {
    json: state => state.json,
    isLogin: state => state.login != null && state.login.name && state.login.name != null,
  }
});

