import _ from './utils'

/**
 * 将一个日期（字符串）转换为真实日期
 * @param  {Any} date
 * @return {Date}
 */
const parseDate = date => {
  // Date Object
  if (date instanceof Date) {
    return date
  }
  // Number
  if (/^\d+$/.test(date)) {
    return new Date(parseInt(date, 10))
  }
  // String
  date = (date || '').trim()
    .replace(/\.\d+/, '') // remove milliseconds
    .replace(/-/g, '/') // fix safair
    .replace(/T/, ' ')
    .replace(/Z/, ' UTC')
    /* eslint-disable */
    .replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2') //fix time
  return new Date(date)
}


/**
 * 将一个日期转换为一个日期对象
 * @param {Date} date
 * @returns {Object}
 */
const getDateMap = date => {
  date = parseDate(date)
  return {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
}


/**
 * 格式化日期
 * @param  {Date} date   
 * @param  {String} format
 * @return {String}
 */
const formatDate = (date, format) => {
  date = date || new Date()
  format = format || 'yy-MM-dd hh:mm:ss'
  const map = getDateMap(date)
  format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
    let v = map[t]
    if (v !== void 0) {
      v = v.toString()
      if (t !== 'y' && all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      } else if (t === 'y' && all.length === 1) {
        v = v.substr(2)
      }
    }
    return v
  })

  return format
}


/**
 * 转换成数字
 * @param {String} value
 * @returns {Number} 
 */
const toNumber = value => {
  if (_.isNumber(value)) {
    return value
  }
  return +value
}


/**
 * 转换为整数
 * @param {String} value
 * @returns {Number} 
 */
const toInteger = value => {
  let _value = toNumber(value)
  return isNaN(_value) ? value : parseInt(value, 10)
}


/**
 * 将空字符串，null, undefined 等转换为 0
 * @param {any} value 
 * @returns {0 | any}
 */
const toZero = value => {
  if (!value) {
    return 0
  }
  return value
}


/**
 * 将空字符串，null, undefined 等转换为 false
 * @param {any} value 
 * @returns {Boolean}
 */
const toBoolean = value => {
  if (!value) {
    return false
  }
  return true
}


/**
 * 转换为字符串
 * @param {any} value
 * @returns {String} 
 */
const toString = value => {
  if (_.isString(value)) {
    return value
  }
  return value + ''
}


/**
 * 转换为小写
 * @param {String} value 
 * @returns {String}
 */
const toLower = value => toString(value).toLocaleLowerCase()


/**
 * 转换为大写
 * @param {String} value 
 * @returns {String}
 */
const toUpper = value => toString(value).toLocaleUpperCase()



export default {
  date: formatDate,
  number: toNumber,
  int: toInteger,
  zero: toZero,
  boolean: toBoolean,
  string: toString,
  lower: toLower,
  upper: toUpper
}
