import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aldiandya-face-extraction.herokuapp.com/',
});

export default api;
