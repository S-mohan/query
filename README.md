# Query

> 类SQL前端数据查询类库

## [Example](https://s-mohan.github.io/demo/query/)

## 如何使用
```javascript
// 支持 umd
<script src="./build/query.js"></script>
var data = [] // 数据
var query = new Query(data)
```

## 实例方法

### range
###### Description
>`[Parameter Collections]` 从数据中选取一个从开始索引(start)到一个结束索引(end)之间的部分的浅拷贝出来作为目标对象，参数同Array.prototype.slice。多次调用以最后一次收集到的参数为准。

###### Syntax
```javascript
/**
 * @param {Number} start
 * @param {Number} end 
 */
query.range(start, end)
```
###### Example
```javascript
query.range(0, 10)
```

### to/format 
###### Description
> `[Parameter Collections]` 通过内置钩子函数(hooks)对字段进行格式化。

###### [Document](https://github.com/S-mohan/query/blob/master/docs/format.md)
###### [内置钩子函数(format hooks)](https://github.com/S-mohan/query/blob/master/docs/hooks.md)
###### Syntax
```javascript
/**
 * @param {String} field 待格式化字段
 * @param {String} type 钩子函数名称
 * @param {Object} options 可用配置项
 */
query.to(field, type, options) / query.format(field, type, options)
```
###### Example
```javascript
// 'createTime': '2017-09-08T15:26:03.896Z',
query.to('createTime', 'date', {args: ['yy-MM-dd'], new: 'date'})
// $date: '2017-09-08'
```

### where
###### Description
> `[Parameter Collections]` 条件查询语句

###### [Document](https://github.com/S-mohan/query/blob/master/docs/where.md)
###### Syntax
```javascript
/**
 * @param {String} field 字段
 * @param {String} expression 表达式
 * @param {String | Function} condition 条件
 * @param {String} relation {and(default) | or} 与上次where结果的关系
 */
query.where(field, expression, condition, relation)
```
###### Example
```javascript
query
  .where('author', 'eq', 'smohan')
  .where([['title', 'like', 'javascript'], ['tags', 'like', 'javascript', 'or'] ])
  .where('count.comments', 'gt', 0)
// author === 'smohan' && (title like 'javascript' || tags like 'javascript') && 'count.comments > 0'     
```

### group
###### Description
> `[Parameter Collections]` 根据字段对结果集分组，返回新的结果集。一个字段只能分组一次。

###### Syntax
```javascript
/**
 * @param {String} field 待分组的字段
 */
query.group(field)
```
###### Example
```javascript
query.group('author')
/**
 * result
 * [
 *   'smohan': {count: 22, list:[...]},
 *   '流云诸葛': {count: 1, list: [...]},
 *   ...   
 * ]
 */     
```
### skip
###### Description
> `[Parameter Collections]` 用于分页时指定开始查询的起始行数。

###### Syntax
```javascript
/**
 * @param {Number} skip 指定起始行数
 */
query.skip(skip)
```
###### Example
```javascript
// 从第0行开始查询
query.skip(0)     
```
### limit
###### Description
> `[Parameter Collections]` 用于分页时指定查询的数量。

###### Syntax
```javascript
/**
 * @param {Number} limit 指定查询的数量
 */
query.limit(limit)
```
###### Example
```javascript
// 查询10条结果
query.limit(10)
// 从第5条开始查询10条结果
query.skip(5).limit(10)     
```

### sort
###### Description
> `[Parameter Collections]` 对查询结果进行排序，输出排序后的结果。

###### Syntax
```javascript
/**
 * @param {String | Object} field 待排序的字段
 * @param {String | void} type 排序类型 [asc|desc]
 */
query.sort(field, type)
```
###### Example
```javascript
// 按order的降序排序,如果order一样，则再按照创建时间的降序排序
query
  .sort('order', 'desc')
  .sort('createTime', 'desc')

// 同时指定多个排序方式
query.sort({
  create_time: 'desc',
  id: 'desc',
  name: 'asc'
})
```
### count
###### Description
> `[Export results]` 返回经过查询后的结果的总数，如果需要分页，建议在分页前调用该方法。

###### Syntax
```javascript
/**
 * @returns {Number}
 */
query.count()
```
###### Example
```javascript
query.count()
```
### find
###### Description
> `[Export results]` 返回经过查询后的结果集。

###### Syntax
```javascript
/**
 * @returns {Array}
 */
query.find()
```
###### Example
```javascript
query.find()
```
### reset
###### Description
> 对数据集和查询条件进行重置。一旦调用`find()`/`count()`方法后，目标集合将会被改变，此时如果需要对源数据进行重新查询，需要调用该方法。

###### Syntax
```javascript
query.reset()
```
###### Example
```javascript
query.reset()
//.where()
//...
```

### destroy
###### Description
> 销毁实例

###### Syntax
```javascript
query.destroy()
```

## 静态方法/属性
### hooks
###### Description
> `[Static Method]` 添加自定义格式化钩子函数

###### Syntax
```javascript
/**
 * @param {String} name 钩子名称
 * @param {function} handler 钩子方法
 */
Query.hooks(name, handler)
```
###### Example
```javascript
// 添加一个重置标题的钩子函数
Query.hooks('myTitle', function(value) {
  return '我是格式化后的标题:' + value
})

// use
query.to('title', 'myTitle', {new: true})
// result: 
// $title: '我是格式化后的标题:title'
```
### version
###### Description
> `[Static Attribute]` 版本号

###### Syntax
```javascript
Query.version
```