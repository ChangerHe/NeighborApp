import Taro from '@tarojs/taro'

// TIP: cannot find module out of src files
// import { HOST } from '../../server/constant/index'

import { getStorage, setStorage } from './storage'

const HOST = 3000
const HOST_LIST = {
  development: `http://localhost:${HOST}/neighbor`,
  production: `http://localhost:${HOST}/neighbor`,
}
const CURRENT_HOST = HOST_LIST[process.env.NODE_ENV]
const CODE_SUCCESS = 200
const AUTH_TOKEN = 'token';

export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true } = options
  const token = await getStorage(AUTH_TOKEN)
  const header = token ? { token } : {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  return Taro.request({
    url: `${CURRENT_HOST}${url}`,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const { code, data } = res.data
    if (code !== CODE_SUCCESS) {
      return Promise.reject(res.data)
    }
    // if is login api set storage
    // if (url === LOGIN_API) {
    //   await setStorage(AUTH_TOKEN, res.data)
    // }

    return data
  }).catch((err) => {
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || 'server error',
        icon: 'none'
      })
    }

    return Promise.reject({ message: 'server error', ...err })
  })
}
