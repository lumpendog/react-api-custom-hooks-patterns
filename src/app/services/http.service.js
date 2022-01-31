import axios from 'axios';
import logger from './log.service';
import { toast } from 'react-toastify';
import config from '../confiig.json';

axios.defaults.baseURL = config.apiEndpoing;

axios.interceptors.response.use(
  (res) => res,
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      logger.log(error);
      toast.error('Something was wrong. Please, try again later.');
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
