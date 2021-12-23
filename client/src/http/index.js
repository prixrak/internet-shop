
import axios from "axios";

// set base url for all requests
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

// set token in headers for auth in server side
const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
}

// set authInterceptor(перехват) for all requests
$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost
};