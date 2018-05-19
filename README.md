# Query

> 类SQL前端数据查询类库


### 如何使用
```javascript
// umd
<script src="./build/query.js"></script>
var data = [] // 数据
var query = new Query(data)
```

### 实例方法
#### range  `[Parameter Collections]` 

###### Description
> 从数据中选取一个从开始索引(start)到一个结束索引(end)之间的部分的浅拷贝出来作为目标对象，参数同Array.prototype.slice。该方法只是一个参数收集器，多次调用以最后一次收集到的参数为准。
###### Syntax
```javascript
/**
 * @param {Number} start
 * @param {Number} end 
 */
query.rande(start, end)
```
###### Example
```javascript
query.range(0, 10)
```
#### to/format  `[Parameter Collections]` 


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