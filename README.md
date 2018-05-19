# Query

> 类SQL前端数据查询类库


## 如何使用
```javascript
// umd
<script src="./build/query.js"></script>
var data = [] // 数据
var query = new Query(data)
```

## 实例方法
### range  `[Parameter Collections]` 

###### Description
> [参数收集器] 从数据中选取一个从开始索引(start)到一个结束索引(end)之间的部分的浅拷贝出来作为目标对象，参数同Array.prototype.slice。多次调用以最后一次收集到的参数为准。
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
### to/format  `[Parameter Collections]` 
###### Description
> [参数收集器] 通过内置钩子函数(hooks)对字段进行格式化。
###### Syntax
```javascript
/**
 * @param {String} field 待处理字段
 * @param {String} type 钩子函数名称
 * @param {Object} options 可用配置项
 */
query.to(field, type, options) / query.format(field, type, options)
```
###### Example
```javascript
// 'createTime': '2017-09-08T15:26:03.896Z',
// $date: '2017-09-08'
query.to('createTime', 'date', {args: ['yy-MM-dd'], new: 'date'})
```

#### where

#### group

#### skip

#### limit

#### sort

#### count

#### find

#### reset

#### destroy

### 静态方法/属性

#### hooks

#### version