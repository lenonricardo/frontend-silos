/* eslint-disable */
import axios from 'axios';
import qs from 'qs';
// FAKE API for learning only
// eslint-disable-next-line
const API_URL = 'https://silosapi.herokuapp.com/results_class';

export default {
  getPosts(base64) {
		const img = base64.split(',')[1]
    	return axios.get(`${API_URL}?img=${img}`);
  },
  savePost(article) {
		const json = {img: article}
		let teste = JSON.stringify(json)
		// console.log(article)
		// let teste2 = qs.stringify(json)
		// console.log(teste2)

		return axios.post('https://silosapi.herokuapp.com/results_class', teste);
  },
};
