## format/to
> 使用格式化钩子函数对字段进行进行格式化

### 内置钩子函数
[内置钩子函数](https://github.com/S-mohan/query/blob/master/docs/hooks.md)

### use
```javascript
query.to(field, type, options)
```
##### arguments
- `field` : {String} 需要格式化的字段
- `type`  : {String} 指定格式化方式（内置的钩子函数或者自定义的钩子函数名称）
- `options`: {Object} 可用的配置项
  - `args`: {Array} 传递给钩子函数的除了`value`之外的剩余参数， 如: `[arg1, arg2, [arg3]...]`
  - `new`: {Boolean | String} 是否生成新的字段， 默认`false`
     - `false`: 不生成新字段，直接使用格式化后的值重置原字段
     - `true`: 生成新字段，保留原字段。新字段被标识为`$原字段名`，如 `title` => `$title`
     - `string`: 生成新字段，保留原字段。使用指定的名称来生成一个新字段，新字段会被自动添加`$`前缀，如 `customTitle` => `$customTitle`
  - `handler`: {Function | null} 局部钩子函数，该钩子函数仅对当前使用有效，缺省值为 `null`

##### example

```javascript
var sourceData = [
  {
    title: 'title',
    createAt: '2017-09-20T13:14:06.312Z',
    views: '322'
  }
]

var query = new Query(sourceData)

// 1. 使用内置钩子函数

// 1.1 生成新字段
query
.to('createAt', 'date', {args: ['yy-MM'], new: 'myDate'})
.find() 

// [
//   {
//     title: 'title',
//     createAt: '2017-09-20T13:14:06.312Z',
//     views: '322',
//     '$myDate': '2017-09'
//   }
// ]

// 1.2 不生成新字段
query
.to('createAt', 'number', {new: false})
.find()

// [
//   {
//     title: 'title',
//     createAt: '2017-09-20T13:14:06.312Z',
//     views: 322 // 字符串被转换为数字
//   }
// ]

// 2. 使用自定义钩子函数

// 2.1 注册全局钩子函数
Query.hooks('formatTitle', value => {
  return '格式化后的' + value
})

query
.to('title', 'formatTitle', {new: true})
.find()

// [
//   {
//     title: 'test',
//     createAt: '2017-09-20T13:14:06.312Z',
//     views: '322',
//     '$title': '格式化后的title'
//   }
// ]

// 2.2 使用局部钩子函数
query
.to('title', null, {new: true, handler(value) {
  return '使用局部钩子函数格式化的' + value
}})
.find()

// [
//   {
//     title: 'test',
//     createAt: '2017-09-20T13:14:06.312Z',
//     views: '322',
//     '$title': '使用局部钩子函数格式化的title'
//   }
// ]

```  
