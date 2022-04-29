import axios from 'axios';
import AuthHelper from './authHelper.jsx';
import {store} from '../redux/store.jsx';
import {refreshToken} from '../redux/actions/auth.jsx';
import NProgress from 'nprogress';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true
// var csrftoken = getCookie('csrftoken');

// function getCookie(name) {
//   var cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//       var cookies = document.cookie.split(';');
//       for (var i = 0; i < cookies.length; i++) {
//           var cookie = jQuery.trim(cookies[i]);
//           if (cookie.substring(0, name.length + 1) === (name + '=')) {
//               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//               break;
//           }
//       }
//   }
//   return cookieValue;
// }

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  NProgress.done();
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  NProgress.done();
  return response;
}, function (error) {
  NProgress.done();
  // Do something with response error
  return Promise.reject(error);
});

const withAuth = (headers = {}) => {
  return {
    ...headers,
    'Authorization': 'token ' + AuthHelper.getAccessToken(),
  }
};

const base = (method, url, data = {}, headers = {}, secure = true) => {
  if (secure) {
    let state = store.getState();
    // if (AuthHelper.isAccessTokenExpired(state.auth)) {
    //   console.log("if (AuthHelper.isAccessTokenExpired(state.auth)) {");
    //   return store.dispatch(refreshToken())
    //     .then(res => {
    //       return axios({
    //         method,
    //         url,
    //         data,
    //         headers: withAuth(headers),
    //       });
    //     })
    // } else {
    //   console.log("else");
      return axios({
        method,
        url,
        data,
        headers: withAuth(headers),
      });
    }
  // } else {
    console.log("secure else");
    var aa = axios({
      method,
      url,
      data,
      headers,
    });
    console.log(aa);
    return aa;
    // return axios({
    //   method,
    //   url,
    //   data,
    //   headers,
    // });
  // }
};

const ApiHelper = {};

['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
  ApiHelper[method] = base.bind(null, method);
});

export default ApiHelper;
