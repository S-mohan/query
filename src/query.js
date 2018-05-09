
import _ from './utils'

// const hasOwn = Object.prototype.hasOwnProperty

const clone = obj => JSON.parse(JSON.stringify(obj))

const EXPRESSIONS = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'in', 'nin', 'exists']

const RELATION = ['and', 'or']

const SORTS = ['asc', 'desc']

function Query (data, options) {
  if (!(this instanceof Query)) {
    return new Query(data)
  }

  if (!Array.isArray(data)) {
    // todo
  }

  this.source = data

  this.target = clone(data)

  this.size = data.length

  this.params = Object.create(null)

  this.params.query = []

  // sort 涉及到规则的先后顺序，因此使用数组存储
  this.params.sort = []

  // {field, value, expression, relation}
}

Query.version = '__VERSION__'

// prototype
const QP = Query.prototype


QP.skip = function (skip) {
  this.params.skip = _.isInteger(skip) ? skip : 0
  return this
}


QP.limit = function (limit) {
  this.params.limit = _.isInteger(limit) ? limit : 1
  return this
}

QP.where = function (field, condition, expression = 'eq', relation = 'and') {
  if (!_.isString(field) || _.isEmpty(field)) {
    return this
  }
  if (condition !== null && condition !== void 0 && !_.isPrimitive(condition)) {
    throw new TypeError('Query: 参数condition必须是一个基本类型值')
  }
  expression = expression.toLocaleLowerCase()
  expression = ~EXPRESSIONS.indexOf(expression) ? expression : 'eq'
  relation = relation.toLocaleLowerCase()
  relation = ~RELATION.indexOf(relation) ? relation : 'and'
  const query = {
    _f: field,
    _c: condition,
    _e: expression,
    _r: relation
  }
  const queries = JSON.stringify(this.params.query)
  if (!~queries.indexOf(JSON.stringify(query))) {
    this.params.query.push(query)
  }
  return this
}

QP.sort = function (field, type) {
  let sorts = Object.create(null)
  if (arguments.length === 1) {
    if (_.isPlainObject(field)) {
      sorts = field
    } else {
      sorts[field] = 'desc'
    }
  } else {
    sorts[field] = type
  }

  for (let k in sorts) {
    let sortType = sorts[k].toLocaleLowerCase()
    if (_.isString(k) && !!~SORTS.indexOf(sortType)) {
      _addSort.call(this, k, sortType)
    }
  }

  return this
}



QP.count = function () { }


QP.find = function () {
  let { target } = this
  let result = []

  // 匹配where
  target.forEach(item => {
    let res = _parseWhere.call(this, item)
    if (res) {
      result.push(item)
    }
  })

  // sort
  _parseSort.call(this, result)

  console.log(result)
}



/**
 * 解析where语句
 * 返回传入数据是否匹配where规则的结果
 * @private
 * @param {Object} data
 * @returns {Boolean}
 */
function _parseWhere (data) {
  let { query: queries } = this.params
  let len = queries.length
  if (len === 0) {
    return true
  }
  let result = true
  let query
  let i = 0
  for (; i < len; i++) {
    query = queries[i]
    let { _f: field, _c: cond, _e: exp, _r: rel } = query
    let value = getValue(field, data)
    // todo exists
    let res = matchWhere(value, exp, cond)
    // 上一个的结果跟其的并集或者交集
    result = (rel === 'or') ? (result || res) : (result && res)
    // if (result === false) {
    //   break
    // }
  }

  return result
}


/**
 * 解析各个where条件
 * @param {Any} value
 * @param {String} expression
 * @param {Any} condition
 * @returns {Boolean}
 */
function matchWhere (value, expression, condition) {
  let res = true
  switch (expression) {
    case 'like':
      break
    case 'in':
      break
    case 'nin':
      break
    case 'neq':
      res = (value !== condition)
      break
    case 'lt':
      res = (value < condition)
      break
    case 'lte':
      res = (value <= condition)
      break
    case 'gt':
      res = (value > condition)
      break
    case 'gte':
      res = (value >= condition)
      break
    case 'eq':
    default:
      res = (value === condition)
  }
  return res
}


/**
 * 添加排序规则
 * @private
 * @param {String} field
 * @param {String} type
 */
function _addSort (field, type) {
  const { sort: sorts } = this.params
  let len = sorts.length
  let idx
  while (--len >= 0) {
    let sort = sorts[len]
    // 已经存在当前字段的排序
    if (sort[0] === field) {
      idx = len
      break
    }
  }

  let sort = [field, type]

  // 有则覆盖，无则添加
  if (idx > -1) {
    this.params.sort.splice(idx, 1)
  }
  this.params.sort.push(sort)
}

/**
 * 对数据根据排序规则进行排序
 * 如果第一条规则未区分出大小，则使用第二条规则
 * 否则一旦区分出大小，后面的规则将不再继续
 * @param {Array} data
 */
function _parseSort (data) {
  const { sort: sorts } = this.params
  data.sort((a, b) => {
    let i = -1
    let len = sorts.length
    let sort
    while (++i < len) {
      sort = sorts[i]
      let field = sort[0]
      let type = sort[1]
      let valueA = getValue(field, a)
      let valueB = getValue(field, b)
      if (valueA > valueB) {
        return type === 'desc' ? -1 : 1
      } else if (valueA < valueB) {
        return type === 'asc' ? -1 : 1
      }
    }
  })
}



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
 * getValue('a.b.c', obj) => 1
 * getValue('a.d.0.c', obj) => 2
 * getValue('a.d.0', obj) => {c: 2}
 *
 * @param name
 * @param object
 * @returns {Any}
 */
function getValue (name, object) {
  if (_.isEmpty(name)) { return void 0 }

  let paths = name.split('.')

  while (paths.length) {
    let k = paths.shift()
    object = object[k]
    if (!_.isPlainObject(object) && !_.isArray(object)) {
      break
    }
  }

  return object
}


//   // where
//   where() { }

//   like() { }

//   in() { }

//   between() { }

//   skip() { }

//   limit() { }

//   desc() { }

//   asc() { }

//   groupby()

//   find() { }

//   findOne() { }

//   destroy() { }


export default Query
