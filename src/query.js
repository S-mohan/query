import _ from './utils'
import hooks from './hooks'

// 查询表达式
const EXPRESSIONS = ['eq', '=', 'neq', '<>', 'gt', '>', 'gte', '>=', 'lt', '<', 'lte', '<=', 'like', 'in', 'nin', 'exists']

// 排序
const SORTS = ['asc', 'desc']

const RELATIONS = ['and', 'or']

// 内置格式化钩子函数
const BUILT_IN_HOOKS = Object.keys(hooks)

// 格式化钩子函数字典(私有)
const FORMATS_HOOKS = Object.create(null)

// 内置钩子函数初始化
BUILT_IN_HOOKS.forEach(hook => {
  FORMATS_HOOKS[hook] = function (value) {
    return _.apply(hooks[hook], value, ...(_.toArray(arguments)))
  }
})


/**
 * 对象拷贝
 * @param {Object} obj
 * @returns {Object}
 */
const clone = obj => JSON.parse(JSON.stringify(obj))


// 默认可配置项
const QUERY_DEFAULTS = {
  // 索引
  index: [],
  // 用于多个group后 key值得分割符
  // eg. smohan$smohan@163.com: []
  groupKeySeparator: '$',
  // 基于老字段生成的新字段前缀
  newFieldNamePrefix: '$'
}


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
    return new Query(data, options)
  }
  if (!_.isArray(data)) {
    log('data must be an array')
    data = []
  }
  // source data
  this.source = data
  // options
  this.options = Object.assign(Object.create(null), QUERY_DEFAULTS, options)
  this.reset()
}


// version
Query.version = '__VERSION__'


/**
 * register hooks
 * @param {String} name
 * @param {function} handler
 */
Query.hooks = function (name, handler) {
  if (!!~BUILT_IN_HOOKS.indexOf(name) === false && _.isFunction(handler)) {
    FORMATS_HOOKS[name] = function (value) {
      return _.apply(handler, value, ...(_.toArray(arguments)))
    }
  }
}


// prototype
const QP = Query.prototype


// 格式化默认配置
const FORMATS_DEFAULTS = {
  // 传递给钩子函数的剩余参数
  // 参数如果是个数组，将会展开每一项依次作为参数传递
  // eg.
  // args: [1, [1, 2], true] => func(value, 1, [1, 2], true)
  // args: 'smohan' => func(value, 'smohan')
  args: null,
  // 是否生成新字段
  // 该值如果是字符串，将会作为新字段的名称
  // new: true => $name
  // new: 'newName' => $newName
  new: false,

  // 私有格式化钩子
  handler: null
}


/**
 * 字段格式化
 * @public
 * @param {String} field
 * @param {String} type
 * @param {Object} options
 */
QP.to = QP.format = function (field, type, options) {
  options = Object.assign(Object.create(null), FORMATS_DEFAULTS, options)
  let handler
  // 如果自己提供了钩子函数
  if (options.handler && _.isFunction(options.handler)) {
    handler = options.handler
  } else if (_.hasKey(type, FORMATS_HOOKS)) {
    handler = FORMATS_HOOKS[type]
  }
  if (handler) {
    let args = []
    if (!_.isUndefined(options.args)) {
      if (_.isArray(options.args)) {
        options.args.forEach(arg => args.push(arg))
      } else {
        args.push(options.args)
      }
    }
    this.params.format[field] = {
      args,
      handler,
      new: options.new
    }
  }
  return this
}


/**
 * 在一个区间内取值
 * @public
 * @param {Number} start
 * @param {Number} end
 */
QP.range = function (start, end) {
  // todo
  if (_.isInteger(start) && start >= 0) {
    this.params.range[0] = start
  }

  if (_.isInteger(end) && end >= 0) {
    this.params.range[1] = end
  }

  return this
}


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
 * @param {String} field
 * @param {String} expression
 * @param {String | Function} condition
 * @param {String} relation {and(default) | or}
 * @example
 *
 * 1. 普通
 * author === 'smohan'
 * .where('author', 'eq', 'smohan')
 *
 * 2. or
 * author === 'smohan' || 'count.comments > 0'
 * .where('author', 'eq', 'smohan')
 * .where('count.comments', 'gt', 0, 'or')
 *
 * 3. 条件分组, 使用数组把多个条件分组，相当于把一组表达式用括号括起来作为一个整体
 * author === 'smohan' && (title like 'javascript' || tags like 'javascript') && 'count.comments > 0'
 * .where('author', 'eq', 'smohan')
 * .where([['title', 'like', 'javascript'], ['tags', 'like', 'javascript', 'or'] ])
 * .where('count.comments', 'gt', 0)
 *
 * 4. 函数表达式
 * .where('author', 'eq', function (value) {
 *    return value === 'smohan' || value === '水墨寒'
 * })
 * .where('count.comments', 'eq', function (value) {
 *   return value > 3 && value < 10
 * }, 'or')
 *
 * ...
 */
QP.where = function (field, expression, condition, relation) {
  // 如果是数组，其他参数将会被忽略
  if (_.isArray(arguments[0])) {
    // [[field, expression, condition, relation], [field, expression, condition, relation], ...]
    let len = arguments[0].length
    let i = -1
    let whereGroups = []
    while (++i < len) {
      let where = arguments[0][i]
      if (!_.isArray(where)) {
        continue
      }
      let query = _adapterWhere.call(this, where[0], where[1], where[2], where[3])
      if (query) {
        whereGroups.push(query)
      }
    }
    if (whereGroups.length) {
      this.params.query.push(whereGroups)
    }
  } else {
    let query = _adapterWhere.call(this, field, expression, condition, relation)
    if (query) {
      this.params.query.push(query)
    }
  }
  return this
}


/**
 * 排序
 * @public
 * @param {String | Object} field
 * @param {String | void} type
 * @example
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
 * @example
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
 * @example
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
 * 分组
 * @public
 * @param {String} field
 */
QP.group = function (field) {
  if (!!~this.params.group.indexOf(field) === false) {
    this.params.group.push(field)
  }
  return this
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
  const { source } = this
  this.target = clone(source)
  // params
  this.params = Object.create(null)
  // 查询条件
  this.params.query = []
  // sort涉及到规则的先后顺序，因此使用数组存储
  this.params.sort = []
  // 需要输出的字段
  this.params.field = Object.create(null)
  // group 字段
  this.params.group = []
  // 格式化 字段
  this.params.format = Object.create(null)
  // range
  this.params.range = []
  // unlock
  this.queried = false
  this.indexes = Object.create(null)

  // 创建索引
  // todo 还没想好索引怎么处理
  // if (options.index && options.index.length) {
  //   let i = -1
  //   let len = this.target.length

  //   while (++i < len) {
  //     let item = this.target[i]
  //     // 仅对第一级字段做索引，深层次不做
  //     for (let k in item) {
  //       if (!!~options.index.indexOf(k) === false) {
  //         continue
  //       }
  //       if (!this.indexes[k]) {
  //         this.indexes[k] = Object.create(null)
  //       }
  //       this.indexes[k][item[k]] = i
  //     }
  //   }
  // }

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
 * where参数适配器
 * 返回一个可用的where语句
 * @private
 * @param {String} field
 * @param {String} expression
 * @param {String | Function | RegExp} condition
 * @param {String} relation
 * @returns {Object | undefined}
 */
function _adapterWhere (field, expression, condition, relation) {
  if (!_.isString(field) || _.isEmpty(field) || !!~EXPRESSIONS.indexOf(expression) === false) {
    return
  }

  // 如果condition是个正则表达式，则将它包装成函数
  if (condition && _.isRegexp(condition)) {
    let reg = condition
    condition = function (value) {
      return !!reg.test(value)
    }
  }

  // 如果condition是个函数的话，自动将expression转换成等号表达式
  if (_.isFunction(condition)) {
    expression = 'eq'
  }

  relation = ~RELATIONS.indexOf(relation) ? relation : 'and'
  const query = {
    _f: field,
    _c: condition,
    _e: expression,
    _r: relation
  }
  const queries = JSON.stringify(this.params.query)
  if (!~queries.indexOf(JSON.stringify(query))) {
    return query
  }
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
  let where
  let i = 0
  for (; i < len; i++) {
    where = queries[i]
    let whereGroup
    // 将每一条where语句组装成一个where group
    if (!_.isArray(where)) {
      whereGroup = [where]
    } else {
      whereGroup = where
    }
    let res = getWhereGroupResult(whereGroup, data)
    let rel = whereGroup[0]._r
    // 上一个group的结果跟当前结果的逻辑关系
    result = (rel === 'or') ? (result || res) : (result && res)
  }

  return result
}


/**
 * 获取每一个whereGroup的结果
 * @private
 * @param {Array} whereGroup
 * @param {Object} data
 * @returns {Boolean}
 */
function getWhereGroupResult (whereGroup, data) {
  let result = true
  let i = -1
  let len = whereGroup.length
  while (++i < len) {
    let where = whereGroup[i]
    let { _f: field, _c: cond, _e: exp, _r: rel } = where
    let res
    // field exists
    if (exp === 'exists') {
      res = _.objKeyIsExists(field, data)
    } else {
      let value = _.getObjectValue(field, data)
      if (_.isFunction(cond)) {
        /* eslint-disable no-useless-call */
        res = cond.call(null, value)
      } else {
        res = matchWhere(value, exp, cond)
      }
    }
    // 上一个where的结果跟当前结果的逻辑关系
    result = (rel === 'or') ? (result || res) : (result && res)
  }
  return result
}


/**
 * 解析where条件的各种情况
 * @private
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
      if (_.isPrimitive(condition)) {
        condition = [condition]
      }
      if (_.isArray(condition)) {
        res = !!~condition.indexOf(value)
      } else {
        res = false
      }
      break
    case 'nin':
      if (_.isPrimitive(condition)) {
        condition = [condition]
      }
      if (_.isArray(condition)) {
        res = (!!~condition.indexOf(value)) === false
      }
      break
    case 'neq':
    case '<>':
      res = (value !== condition)
      break
    case 'lt':
    case '<':
      res = (value < condition)
      break
    case 'lte':
    case '<=':
      res = (value <= condition)
      break
    case 'gt':
    case '>':
      res = (value > condition)
      break
    case 'gte':
    case '>=':
      res = (value >= condition)
      break
    case 'eq':
    case '=':
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
  let { target, params, queried, options } = this
  let { group, range } = params
  // 一条SQL语句查询完后将结果集保存在target中，
  // 如不经过reset方法，下次查询将会在当前基础上查询
  // 主要是为了一条where语句既可以查询count，又可以
  // 经过分页后查询list

  if (queried) {
    return
  }

  let result = []
  let groups = Object.create(null)
  // 是否需要分组
  const groupLen = group && group.length

  // range
  let rangeStart = range[0]
  let rangeEnd = range[1]
  let i = -1
  let len = target.length

  if (!_.isUndefined(rangeStart) || !_.isUndefined(rangeEnd)) {
    if (rangeStart > rangeEnd) {
      [rangeStart, rangeEnd] = [rangeEnd, rangeStart]
    }
    if (rangeStart > len - 1) {
      rangeStart = len - 1
    }
    if (rangeEnd > len - 1) {
      rangeEnd = len - 1
    }
    target = target.slice(rangeStart, rangeEnd)
    len = target.length
  }

  // match where

  let item
  while (++i < len) {
    item = _format.call(this, target[i])
    let res = _parseWhere.call(this, item)
    if (res) {
      // group by
      if (groupLen) {
        let values = []
        for (let j = 0; j < groupLen; j++) {
          let field = group[j]
          let value = _.getObjectValue(field, item)
          if (value !== void 0) {
            values.push(value)
          }
        }
        let groupKey = values.join(options.groupKeySeparator)
        if (!groups[groupKey]) {
          groups[groupKey] = []
        }
        groups[groupKey].push(item)
      } else {
        result.push(item)
      }
    }
  }

  if (groupLen) {
    result.length = 0
    for (let key in groups) {
      let list = groups[key]
      result.push({
        _id: key,
        list,
        count: list.length
      })
    }
  }

  // queried
  this.queried = true
  this.target = result
}


/**
 * 对指定字段格式化
 * @private
 * @param {Object} data
 * @returns {Object}
 */
function _format (data) {
  let { params, options } = this
  if (params.format) {
    try {
      for (let field in params.format) {
        let format = params.format[field]
        let value = _.getObjectValue(field, data)
        let newValue = format.handler(value, ...format.args)
        let parts = field.split('.')
        let parentKey = (parts.slice(0, parts.length - 1)).join('.')
        let curKey = parts[parts.length - 1]
        let parentObj = data
        if (parentKey) {
          let parent = _.getObjectValue(parentKey, data)
          if (_.isPlainObject(parent) || _.isArray(parent)) {
            parentObj = parent
          }
        }
        if (format.new) {
          let newKey = options.newFieldNamePrefix + (_.isString(format.new) ? format.new : curKey)
          parentObj[newKey] = newValue
        } else {
          parentObj[curKey] = newValue
        }
      }
    } catch (error) {
      log(error)
    }
  }
  return data
}


function log (error) {
  console.log('[QUERY ERROR]:', error)
}


export default Query
