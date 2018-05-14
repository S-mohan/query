// 缓存 Object.prototype.toString
const TOSTRING = Object.prototype.toString

// hasOwnProperty
const HAS_OWN = Object.prototype.hasOwnProperty

// array.slice
const ARRAY_SLICE = Array.prototype.slice

// primitive values
const PRIMITIVE_VALUES = ['string', 'number', 'boolean', 'symbol']


/**
 * 正则对象检测
 * @param {Any} value
 * @returns {Boolean}
 */
const isRegexp = value => TOSTRING.call(value) === '[object RegExp]'


/**
 * 是否匹配正则表达式
 * @param {RegExp} reg
 * @param {Any} value
 * @returns {Boolean}
 */
const regex = (reg, value) => {
  if (!isRegexp(reg)) {
    throw TypeError('[VALIDATE ERROR]: The parameter reg must be a RegExp object')
  }
  return !!reg.test(value)
}


/**
 * String
 * @param {Any} value
 * @returns {Boolean}
 */
const isString = value => typeof value === 'string'


/**
 * undefined
 * @param {Any} value
 * @returns {Boolean}
 */
const isUndefined = value => value === void 0


/**
 * null
 * @param {Any} value
 * @returns {Boolean}
 */
const isNull = value => value === null


/**
 * null | undefined | empty string
 * @param {Any} value
 * @returns {Boolean}
 */
const isEmpty = value => !!(isUndefined(value) || isNull(value) || (isString(value) && value.trim().length === 0))


/**
 * object
 * @param {Any} value
 * @returns {Boolean}
 */
const isObject = value => !isNull(value) && (typeof value === 'object')


/**
 * plain object
 * @param {Any} value
 * @returns {Boolean}
 */
const isPlainObject = value => TOSTRING.call(value) === '[object Object]'


/**
 * array
 * @param {Any} value
 * @returns {Boolean}
 */
const isArray = value => Array.isArray.call(null, value)


/**
 * primitive types
 * without null && undefined
 * @param {Any} value
 * @returns {Boolean}
 */
const isPrimitive = value => !!~PRIMITIVE_VALUES.indexOf((typeof value))


/**
 * primitive types
 * @param {Any} value
 * @returns {Boolean}
 */
const isFullPrimitive = value => isNull(value) || isUndefined(value) || isPrimitive(value)


/**
 * function
 * @param {Any} value
 * @returns {Boolean}
 */
const isFunction = value => typeof value === 'function'


/**
 * number
 * @param {Any} value
 * @returns {Boolean}
 */
const isNumber = value => typeof value === 'number'


/**
 * integer
 * @param {Any} value
 * @returns {Boolean}
 */
const isInteger = value => isNumber(value) && (value % 1 === 0)


/**
 * float
 * @param {Any} value
 * @returns {Boolean}
 */
const isFloat = value => +value && (value !== (value | 0))


/**
 * boolean
 * @param {Any} value
 * @returns {Boolean}
 */
const isBoolean = value => typeof value === 'boolean'


// 模糊搜索中需要转义的特殊字符
const SPAN_CHAR_REG = /(\^|\.|\[|\$|\(|\)|\||\*|\+|\?|\{|\\)/g


/**
 * 将传入的搜索关键词转义
 * @param {String} keyword
 * @returns {String}
 */
const escapeKeyword = keyword => (keyword || '').toString().replace(SPAN_CHAR_REG, '\\$1')


/**
 * 根据path路径从object中取值
 * eg.
 * let obj = {
 *  a : {
 *    b : {
 *      c : 1
 *    }
 *  },
 *  d : [{c : 2}]
 * }
 * getObjectValue('a.b.c', obj) => 1
 * getObjectValue('a.d.0.c', obj) => 2
 * getObjectValue('a.d.0', obj) => {c: 2}
 *
 * @param name
 * @param object
 * @returns {Any}
 */
function getObjectValue (name, object) {
  if (isEmpty(name)) { return void 0 }

  let paths = name.split('.')

  while (paths.length) {
    let k = paths.shift()
    object = object[k]
    if (!isPlainObject(object) && !isArray(object)) {
      break
    }
  }

  return object
}


/**
 * 检测对象中是否存在key值
 * @param {String} key
 * @param {Object} object
 * @returns {Boolean}
 */
const hasKey = (key, object) => HAS_OWN.call(object, key)


/**
 * 验证对象中是否存在某个key
 * @param {String} name
 * @param {Object} object
 * @returns {Boolean}
 */
function objKeyIsExists (name, object) {
  if (isEmpty(name)) { return false }

  let paths = name.split('.')

  while (paths.length) {
    let k = paths.shift()
    if (!hasKey(k, object)) {
      return false
    }
    object = object[k]
  }

  return true
}


/**
 * 将类数组转换为数组
 * @param {ArrayLike} array
 * @returns {Array}
 */
const toArray = array => ARRAY_SLICE.call(array)


/**
 * 优化后的apply
 * @param {Function} func
 * @param {Object} context
 */
function apply (func, context) {
  const args = ARRAY_SLICE.call(arguments, 2)
  switch (args.length) {
    case 0:
    case 1:
      return func.call(context, args[0])
    case 2:
      return func.call(context, args[0], args[1])
    case 3:
      return func.call(context, args[0], args[1], args[2])
    default:
      return func.apply(context, args)
  }
}


export default {
  regex,
  isRegexp,
  isString,
  isUndefined,
  isNull,
  isEmpty,
  isObject,
  isPlainObject,
  isArray,
  isPrimitive,
  isFullPrimitive,
  isFunction,
  isNumber,
  isInteger,
  isFloat,
  isBoolean,
  escapeKeyword,
  getObjectValue,
  objKeyIsExists,
  hasKey,
  apply,
  toArray
}
