import axios from 'axios';

if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}
axios.interceptors.response.use(
    (response) => response,
    (error) => {
       if (error.response?.status === 401) {
          localStorage.removeItem('token');
          axios.defaults.headers.common['Authorization'] = 'Bearer';
       }
       return Promise.reject(error);
    }
);
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
