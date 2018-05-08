// 缓存 Object.prototype.toString
const TOSTRING = Object.prototype.toString

// true values
const TRUE_VALUES = [true, 1, '1', 'true']

// false values
const FALSE_VALIES = [false, 0, '0', 'false']

// primitive values
const PRIMITIVE_VALUES = ['string', 'number', 'boolean', 'symbol']

// max_safe_integer
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1


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
 * @param {Any} value
 * @returns {Boolean}
 */
const isPrimitive = value => !!~PRIMITIVE_VALUES.indexOf((typeof value))


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
 * save interger
 * -Math.pow(2, 53) - 1 <= value <= Math.pow(2, 53) - 1
 * @param {Any} value
 * @returns {Boolean}
 */
const isSafeInteger = value => isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER


/**
 * true
 * @param {Any} value
 * @returns {Boolean}
 */
const isTrue = value => {
  if (isString(value)) { value = value.toLowerCase() }
  return !!~TRUE_VALUES.indexOf(value)
}


/**
 * false
 * @param {Any} value
 * @returns {Boolean}
 */
const isFalse = value => {
  if (isString(value)) { value = value.toLowerCase() }
  return !!~FALSE_VALIES.indexOf(value)
}


/**
 * boolean
 * @param {Any} value
 * @returns {Boolean}
 */
const isBoolean = value => isTrue(value) || isFalse(value)


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
  isFunction,
  isNumber,
  isInteger,
  isFloat,
  isSafeInteger,
  isTrue,
  isFalse,
  isBoolean
}
