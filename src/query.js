
import _ from './utils'

/**
 * 对象拷贝
 * @param {Object} obj
 * @returns {Object}
 */
const clone = obj => JSON.parse(JSON.stringify(obj))

// 查询表达式
const EXPRESSIONS = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'in', 'nin', 'exists']

// 查询关系
const RELATION = ['and', 'or']

// 排序
const SORTS = ['asc', 'desc']


/**
 * @constructor
 * 源数据
 * @param {Array} data
 * 可选配置
 * @param {Object} options
 * @returns {Object}
 */
function Query (data, options) {
  if (!(this instanceof Query)) {
    return new Query(data)
  }

  if (!_.isArray(data)) {
    // todo
  }

  this.source = data

  this.reset()
}

// version
Query.version = '__VERSION__'

// prototype
const QP = Query.prototype


/**
 * 取值起始位置
 * @public
 * @param {Number} skip
 */
QP.skip = function (skip) {
  this.params.skip = (_.isInteger(skip) && skip > 0) ? skip : 0
  return this
}


/**
 * 每次取值个数
 * @public
 * @param {Number} limit
 */
QP.limit = function (limit) {
  this.params.limit = _.isInteger(limit) ? Math.abs(limit) : void 0
  return this
}


/**
 * where
 * @public
 * 字段
 * @param {String} field
 * 表达式
 * @param {String} expression
 * 条件
 * @param {Primitive} condition = [and|or]
 * and | or 与上一个结果是并集还是交集
 * @param {String} relation
 * eg.
 * query
 * .where('name', 'eq', 'smohan')
 * .where('age', 'lte', 20)
 * .where('job', 'like', '前端工程师', 'or')
 * .where('tags', 'exists')
 */
QP.where = function (field, expression = 'exists', condition = '', relation = 'and') {
  if (!_.isString(field) || _.isEmpty(field)) {
    return this
  }
  if (!_.isNull(condition) && !_.isUndefined(condition) && !_.isPrimitive(condition)) {
    throw new TypeError('Query: 参数condition必须是一个基本类型值')
  }
  expression = expression.toLocaleLowerCase()
  relation = relation.toLocaleLowerCase()
  expression = ~EXPRESSIONS.indexOf(expression) ? expression : 'exists'
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


/**
 * 排序
 * @public
 * @param {String | Object} field
 * @param {String | void} type
 * eg.
 * single
 * 可以保证优先级
 * query.sort('create_time', 'asc')
 *
 * multiple
 * 优先级无法保证
 * query.sort({
 *    create_time: 'desc',
 *    id: 'desc',
 *    name: 'asc'
 * })
 */
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



/**
 * 获取一个匹配结果集的数量
 * @public
 * @returns {Number}
 * eg.
 * let query = new Query(data)
 *
 * query
 * .where('name', 'eq', 'smohan')
 * .count()
 */
QP.count = function () {
  _query.call(this)
  return this.target.length
}


/**
 * 获取一个匹配结果集的集合
 * @public
 * @returns {Array}
 * eg.
 * let query = new Query(data)
 *
 * query.where('name', 'eq', 'smohan')
 * .skip(5)
 * .limit(10)
 * .find()
 */
QP.find = function () {
  _query.call(this)
  let result = this.target
  // sort
  let sorts = this.params.sort.length
  let { skip, limit } = this.params

  if (sorts) {
    _parseSort.call(this, result)
  }

  // 通过skip和limit计算起止截取位置
  let size = result.length

  if (size === 0) {
    this.target = []
    return
  }

  let start = skip
  let end
  if (start === void 0) {
    start = 0
  }

  // 这地方应该是size而不是size-1， 因为起始值一旦超过总数，就应该返回空
  start = Math.min(start, size)

  if (limit === void 0) {
    end = size
  } else {
    end = start + limit
  }

  end = Math.min(end, size)

  result = result.slice(start, end)

  // 将当前target指向查询结果，
  // 下次查询如果不经过reset方法，将会在该结果集中继续查询

  return result
}


/**
 * 重置target和查询条件
 * 就是数据恢复到初始化状态
 * 可以从头开始操作源数据
 * @public
 * let query = new Query(data)
 *
 * let target = query.where('name', 'eq', 'smohan')
 * .skip(5)
 * .limit(10)
 * .find()
 *
 * query
 * .reset()
 * .where('name','like', 'smohan')
 * ...
 */
QP.reset = function () {
  this.target = clone(this.source)

  // params
  this.params = Object.create(null)
  this.params.query = []
  // sort 涉及到规则的先后顺序，因此使用数组存储
  this.params.sort = []
  // {field, value, expression, relation}
  // unlock
  this.queried = false
  return this
}


/**
 * destroy
 * @public
 */
QP.destroy = function () {
  this.target = null
  this.params = null
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
    let res
    if (exp === 'exists') {
      res = _.objKeyIsExists(field, data)
    } else {
      let value = _.getObjectValue(field, data)
      res = matchWhere(value, exp, cond)
    }
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
 * @param {Primitive} condition
 * @returns {Boolean}
 */
function matchWhere (value, expression, condition) {
  let res = true
  switch (expression) {
    case 'like':
      let keyword = new RegExp(_.escapeKeyword(condition), 'i')
      res = !!((value || '').toString().match(keyword))
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
 * @private
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
      let valueA = _.getObjectValue(field, a)
      let valueB = _.getObjectValue(field, b)
      if (valueA > valueB) {
        return type === 'desc' ? -1 : 1
      } else if (valueA < valueB) {
        return type === 'asc' ? -1 : 1
      }
    }
  })
}


/**
 * 处理并返回结果集
 * where -> sort -> pagination
 * @private
 */
function _query () {
  let { target } = this

  // 一条SQL语句查询完后将结果集保存在target中，避免重复查询
  if (this.queried) {
    return
  }

  let result = []
  // match where
  let i = -1
  let len = target.length
  let item
  while (++i < len) {
    item = target[i]
    let res = _parseWhere.call(this, item)
    if (res) {
      result.push(item)
    }
  }
  // queried
  this.queried = true
  this.target = result
}


export default Query
