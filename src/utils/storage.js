import Taro from '@tarojs/taro'

export const getStorage = (key) => {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

export const setStorage = (key, value) => {
  return Taro.setStorage(key, value).then(res => res.data).catch(() => '')
}