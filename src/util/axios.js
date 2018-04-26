import axios from 'axios';

const url = '';
const instance = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json'
  }
});

export default instance;
