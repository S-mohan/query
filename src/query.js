
import _ from './utils'

const hasOwn = Object.prototype.hasOwnProperty

const clone = obj => JSON.parse(JSON.stringify(obj))

const EXPRESSIONS = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'in', 'nin', 'exists']

const RELATION = ['and', 'or']


function Query(data, options) {
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

  // {field, value, expression, relation}
}

Query.version = '__VERSION__'

// prototype
const QP = Query.prototype


QP.skip = function (skip) {
  // todo 验证skip
  this.params.skip = skip || 0
  return this
}


QP.limit = function (limit) {
  // todo 验证limit
  this.params.limit = limit || 0
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
  expression = !!~EXPRESSIONS.indexOf(expression) ? expression : 'eq'
  relation = relation.toLocaleLowerCase()
  relation = !!~RELATION.indexOf(relation) ? relation : 'and'
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




QP.count = function () { }


QP.find = function () {
  let { params, target, size } = this
  let { query } = params
  let result = []
  // 匹配where
  target.forEach(item => {
    let res = where(item, query)
    if (res) {
      result.push(item)
    }
  })
  
  console.log(result)

}

function where(data, queries) {
  let len = queries.length
  if (len === 0) {
    return true
  }
  let result = true, query
  for (let i = 0, len = queries.length; i < len; i++) {
    query = queries[i]
    let { _f: field, _c: cond, _e: exp, _r: rel } = query
    let value = getValue(field, data)
    // todo exists
    let res = isMatch(value, exp, cond)
    // 上一个的结果跟其的并集或者交集
    result = (rel === 'or') ? (result || res) : (result && res)

    if (result === false) {
      break
    }
  }

  return result
  // queries.forEach(item => {
  //   let { _f: field, _c: cond, _e: exp, _r: rel } = item
  //   let value = getValue(field, data)

  // })
}


function isMatch(value, expression, condition) {
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
function getValue(name, object) {
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
