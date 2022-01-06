import Vue from 'vue'

export function deepClone (obj) {
  if (typeof obj !== 'object') return obj
  // 外层是否为数组
  const isArray = Array.isArray(obj)
  const cloneObj = isArray ? [] : {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const type = Object.prototype.toString.call(obj[key])
      if (isArray) {
        if (type === '[object Object]') {
          cloneObj.push(deepClone(obj[key]))
        } else if (type === '[object Array]') {
          cloneObj.push(deepClone(obj[key]))
        } else {
          cloneObj.push(obj[key])
        }
      } else {
        if (type === '[object Object]') {
          cloneObj[key] = (deepClone(obj[key]))
        } else if (type === '[object Array]') {
          cloneObj[key] = (deepClone(obj[key]))
        } else {
          cloneObj[key] = obj[key]
        }
      }
    }
  }
  return cloneObj
}

export function swap (arr, oldIndex, newIndex) {
  console.log(arr, oldIndex, newIndex)
  const temp = arr[oldIndex]
  arr[oldIndex] = arr[newIndex]
  Vue.set(arr, oldIndex, arr[newIndex])
  Vue.set(arr, newIndex, temp)
}

export function $ (selector) {
  return document.querySelector(selector)
}
