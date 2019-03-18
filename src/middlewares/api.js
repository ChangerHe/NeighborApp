import Taro from '@tarojs/taro';
import { STATUS_REQUEST, STATUS_SUCCESS, STATUS_FAILURE } from '../constants';
import { CALL_API } from '../constants/symbols';
import { encodeSearchParams } from '../utils/url';

export default () => next => (action) => {
  const callAPI = action[CALL_API];
  if (!callAPI) {
    return next(action);
  }

  const {
    type = '',
    url = '',
    success = () => {},
    error = () => {},
    complete = () => {},
    responseCode = 0,
    data = null,
    header = {},
    method = 'GET',
  } = callAPI;
  let urlFormated = url;
  function actionWith(otherData) {
    return Object.assign({}, action, otherData);
  }

  if (typeof url !== 'string') {
    throw new Error('Specify a string endpoint URL');
  }

  if (method.toUpperCase() === 'POST' && !Object.keys(data).length) {
    throw new Error('POST must has data param');
  }
  if (method.toUpperCase() === 'GET' && data && Object.keys(data).length) {
    urlFormated = `${url}?${encodeSearchParams(data)}`;
  }

  const requestOptions = {
    type,
    url: urlFormated,
    responseCode,
    data,
    header,
    method,
    success(res) {
      if (type) {
        if (res.data.code === responseCode) {
          next(actionWith({
            type: `${type}_${STATUS_SUCCESS}`,
            payload: res.data.result,
          }));
          success(res.data.result);
        } else {
          next(actionWith({
            type: `${type}_${STATUS_FAILURE}`,
            payload: res.data.result,
          }));
          error(res.data);
        }
      }
    },
    fail(err) {
      if (type) {
        next(actionWith({
          type: `${type}_${STATUS_FAILURE}`,
          payload: err,
        }));
      }
      error(err);
    },
    complete(res) {
      complete(res);
    },
  };

  const token = Taro.getStorageSync('token');
  if (token.ticket) {
    requestOptions.header.ticket = token.ticket;
  }
  requestOptions.header = {
    ...requestOptions.header,
    'cache-control': 'no-cache',
    accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (type) {
    next(actionWith({
      type: `${type}_${STATUS_REQUEST}`,
      payload: callAPI.data || {},
    }));
  }

  return Taro.request(requestOptions);
};
