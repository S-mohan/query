import _ from './utils'
import hooks from './hooks'

// 查询表达式
const EXPRESSIONS = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'in', 'nin', 'exists', 'custom']

// 查询关系
const RELATION = ['and', 'or']

// 排序
const SORTS = ['asc', 'desc']

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
    // todo
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
  new: false
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

  if (_.hasKey(type, FORMATS_HOOKS)) {
    // let newField = options.new
    // if (newField) {
    //   newField = this.options.newFieldNamePrefix
    //   newField += (_.isString(newField) && newField.trim()) ? newField.trim() : field
    // } else {
    //   newField = false
    // }
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
      handler: FORMATS_HOOKS[type],
      new: options.new
    }
  }

  return this
}


/**
 * @public
 * @param {Number} start
 * @param {Number} end
 */
QP.range = function (start, end) {
  // todo
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
  if (!_.isFullPrimitive(condition) && !_.isFunction(condition)) {
    throw new TypeError('Query: condition 必须是个基本类型值或者函数')
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
 * 分组
 * @public
 * @param {String} field 
 */
QP.group = function (field) {
  // todo
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
    // field exists
    if (exp === 'exists') {
      res = _.objKeyIsExists(field, data)
    } else {
      let value = _.getObjectValue(field, data)
      // custom rule
      // 条件必须是个回调函数
      if (exp === 'custom' && _.isFunction(cond)) {
        /* eslint-disable no-useless-call */
        res = cond.call(null, value)
      } else {
        res = matchWhere(value, exp, cond)
      }
    }
    // 上一个的结果跟其的并集或者交集
    result = (rel === 'or') ? (result || res) : (result && res)
  }

  return result
}


/**
 * 解析where条件的各种情况
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
  let { target, params, queried, options } = this
  let { group } = params
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

  // match where
  let i = -1
  let len = target.length
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
  }
  return data
}

export default Query
