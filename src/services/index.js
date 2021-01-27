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
  savePost(article, name) {
		var formData = new FormData();
		formData.append('img', article);
		formData.append('image', name);

		return axios.post('http://silosapi.herokuapp.com/results_class', formData, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'text/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
				},
		});
  },
};
